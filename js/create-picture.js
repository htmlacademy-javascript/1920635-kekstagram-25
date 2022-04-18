import { showBigPicture } from './big-picture.js';

const similarPictureElement = document.querySelector('.pictures');
const createPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderSimilarPicture=(post)=> {
  const createPictureFragment = document.createDocumentFragment();
  post.forEach(({ url, likes, comments, description}) => {
    const pictureElement = createPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      showBigPicture({ url, likes, comments,description });
    });
    createPictureFragment.appendChild(pictureElement);
  });
  similarPictureElement.appendChild(createPictureFragment);
};

const clearSimilarPicture = () => {
  similarPictureElement.innerHTML = '';
};


export {renderSimilarPicture, clearSimilarPicture };
