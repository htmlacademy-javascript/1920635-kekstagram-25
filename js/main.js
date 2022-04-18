import {closeModal} from './open-modal.js';
import {setUserFormSubmit} from './upload-form.js';
import {renderSimilarPicture} from './create-picture.js';
import {getData} from './api.js';

getData((post) => {
  renderSimilarPicture(post);
});

setUserFormSubmit(closeModal);
