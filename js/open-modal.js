let currentModal;
let currentCloseButton;

const body = document.querySelector('body');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const isEscapeKey = (evt) => evt.key === 'Escape';

// Закрытие модального окна
const closeModal = () => {
  currentModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  currentCloseButton.removeEventListener('click', closeModal);
};

// Открытие модального окна
function openModal(modal, closeButton) {
  currentModal = modal;
  currentCloseButton = closeButton;
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', closeModal);
}

// Проверка нажатие клавиши ESC
function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Блокировка ESC на время заполнения тегов и комментариев
hashtag.addEventListener('keydown', (evt)=> {
  evt.stopPropagation();
});
description.addEventListener('keydown', (evt)=> {
  evt.stopPropagation();
});

export { openModal, closeModal, isEscapeKey };
