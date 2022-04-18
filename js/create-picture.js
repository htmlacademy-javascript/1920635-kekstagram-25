import { showBigPicture } from './big-picture.js';
import { getRandomArrayElement } from './util.js';

const similarPictureElement = document.querySelector('.pictures');
const createPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageFilters = document.querySelector('.img-filters');
const filterDiscussed = document.getElementById('filter-discussed');
const filterRandom = document.getElementById('filter-random');
const filterDefault = document.getElementById('filter-default');
let randomArray = [];
let filter = [];

const renderSimilarPicture = (post) => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
  imageFilters.classList.remove('img-filters--inactive');
  const createPictureFragment = document.createDocumentFragment();
  post
    .forEach(({ url, likes, comments, description }) => {
      const pictureElement = createPictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.addEventListener('click', () => {
        showBigPicture({ url, likes, comments, description });
      });
      createPictureFragment.appendChild(pictureElement);
    });
  similarPictureElement.appendChild(createPictureFragment);
};

const randomPost = (post, count) => {
  filterRandom.addEventListener('click', () => {
    for (let i = 0; i < 25; i++) {
      randomArray.push(getRandomArrayElement(post));
    }
    filter = Array.from(new Set(randomArray));
    renderSimilarPicture(filter.slice(0, count));
    randomArray = [];
  });
};
const defaultPost = (post) => {
  filterDefault.addEventListener('click', () => {
    renderSimilarPicture(post);
  });
};
const compareCommentsCount = (postA, postB) => {
  const commentsA = postA.comments.length;
  const commentsB = postB.comments.length;
  return commentsB - commentsA;
};

const commentsCountPost = (post) => {
  filterDiscussed.addEventListener('click', () => {
    const countPost = post.slice().sort(compareCommentsCount);
    renderSimilarPicture(countPost);
  });
};


export { renderSimilarPicture, commentsCountPost, randomPost, defaultPost };
