import {closeModal} from './open-modal.js';
import {setUserFormSubmit} from './upload-form.js';
import {getcommentsCountPost, getdefaultPost, getRandomPosts, renderSimilarPicture} from './create-picture.js';
import {getData} from './api.js';

const RANDOM_POST_COUNT = 10;

getData((post) => {
  renderSimilarPicture(post);
  getRandomPosts(post, RANDOM_POST_COUNT);
  getdefaultPost(post);
  getcommentsCountPost(post);
});

setUserFormSubmit(closeModal);
