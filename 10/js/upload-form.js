import { openModal } from './open-modal.js';
const imageUploadOpen = document.querySelector('#upload-file');
const imageUploadClose = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

imageUploadOpen.addEventListener('change', () => {
  openModal(uploadOverlay, imageUploadClose);
});

