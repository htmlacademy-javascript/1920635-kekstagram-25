import {postArray} from './data.js';

const similarPictureElement = document.querySelector('.pictures');
const createPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const getPictures = postArray();

const createPictureFragment = document.createDocumentFragment();

getPictures.forEach(({url, likes, comments}) => {
  const pictureElement = createPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  createPictureFragment.appendChild(pictureElement);
});
similarPictureElement.appendChild(createPictureFragment);
export{getPictures};
