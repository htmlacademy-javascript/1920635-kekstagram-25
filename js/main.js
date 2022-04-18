import {closeModal} from './open-modal.js';
import {setUserFormSubmit} from './upload-form.js';
import {commentsCountPost, defaultPost, randomPost, renderSimilarPicture} from './create-picture.js';
import {getData} from './api.js';
const randomPostCount = 10;


getData((post) => {
  renderSimilarPicture(post);
  randomPost(post, randomPostCount);
  defaultPost(post);
  commentsCountPost(post);
});

setUserFormSubmit(closeModal);
