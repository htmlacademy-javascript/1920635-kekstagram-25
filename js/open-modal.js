const body = document.querySelector('body');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
let currentModal;
let currentCloseButton;

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const closeModal = () => {
  currentModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  currentCloseButton.removeEventListener('click', closeModal);
};

function openModal(modal, closeButton) {
  currentModal = modal;
  currentCloseButton = closeButton;
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', closeModal);
}


function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}
hashtag.addEventListener('keydown', (evt)=> {
  evt.stopPropagation();
});
description.addEventListener('keydown', (evt)=> {
  evt.stopPropagation();
});
export { openModal, isEnterKey };
