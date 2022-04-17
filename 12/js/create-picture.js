import { showBigPicture } from './big-picture.js';
import { postArray } from './data.js';


const similarPictureElement = document.querySelector('.pictures');
const createPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getPictures = postArray();

const renderSimilarPicture=()=> {
  const createPictureFragment = document.createDocumentFragment();
  getPictures.forEach((post) => {
    const { url, likes, comments } = post;
    const pictureElement = createPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      showBigPicture(post);
    });
    createPictureFragment.appendChild(pictureElement);
  });
  similarPictureElement.appendChild(createPictureFragment);
};

const clearSimilarPicture = () => {
  similarPictureElement.innerHTML = '';
};


export { getPictures, renderSimilarPicture, clearSimilarPicture };
