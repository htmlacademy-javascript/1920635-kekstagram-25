import { sendData } from './api.js';
import { openModal } from './open-modal.js';
import { showAlert, showSuccess } from './util.js';
import { hashtagValidate, resetValidate } from './validation-form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_SCALE = 100;
const MIN_SCALE = 25;
let scaleNumber;
let effectClass;
let lastClass;

const imageUploadOpen = document.querySelector('#upload-file');
const imageUploadClose = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadButton = document.querySelector('.img-upload__submit');
const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const changeEffectButtons = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const effectValueSlider = document.querySelector('.img-upload__effect-level');

// Уменьшить размер загружаемой фотографии
const scaleSmaller = () => {
  if (scaleNumber <= MAX_SCALE && scaleNumber > MIN_SCALE) {
    image.classList.remove(`scale-${scaleNumber}`);
    scaleNumber -= 25;
    scaleValue.value = `${String(scaleNumber)}%`;
    image.classList.add(`scale-${scaleNumber}`);
  }
};

// Увеличить размер загружаемой фотографии
const scaleBigger = () => {
  image.classList.remove(`scale-${scaleNumber}`);
  if (scaleNumber < MAX_SCALE && scaleNumber >= MIN_SCALE) {
    scaleNumber += 25;
    scaleValue.value = `${String(scaleNumber)}%`;
    image.classList.add(`scale-${scaleNumber}`);
  }
};
// Изменить размер загружаемой фотографии
scaleSmallerButton.addEventListener('click', scaleSmaller);
scaleBiggerButton.addEventListener('click', scaleBigger);
scaleValue.value = `${String(100)}%`;

// Добавление слайдера
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1
});

// Изменение эффектов в зависимости от значения слайдера
slider.noUiSlider.on('update', () => {
  effectLevel.value = slider.noUiSlider.get();
  switch (lastClass) {
    case 'effects__preview--chrome':
      image.setAttribute('style', `filter: grayscale(${effectLevel.value}`);
      break;
    case 'effects__preview--sepia':
      image.setAttribute('style', `filter: sepia(${effectLevel.value}`);
      break;
    case 'effects__preview--marvin':
      image.setAttribute('style', `filter: invert(${effectLevel.value}%`);
      break;
    case 'effects__preview--phobos':
      image.setAttribute('style', `filter: blur(${effectLevel.value}px`);
      break;
    case 'effects__preview--heat':
      image.setAttribute('style', `filter: brightness(${effectLevel.value}`);
      break;
  }
});

// Смена эффекта
changeEffectButtons.forEach((button) => {
  button.addEventListener('change', () => {
    slider.classList.remove('hidden');
    effectValueSlider.classList.remove('hidden');
    image.classList = '';
    image.classList.add(`scale-${scaleNumber}`);
    image.classList.add(`effects__preview--${button.value}`);
    effectClass = image.classList.value.split(' ');
    lastClass = effectClass.pop();
    switch (lastClass) {
      case 'effects__preview--none':
        slider.classList.add('hidden');
        effectValueSlider.classList.add('hidden');
        image.setAttribute('style', 'filter: none');
        break;
      case 'effects__preview--chrome':
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      case 'effects__preview--sepia':
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      case 'effects__preview--marvin':
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1
        });
        break;
      case 'effects__preview--phobos':
        slider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
      case 'effects__preview--heat':
        slider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
    }
  });
});

// Загрузить фотографию
imageUploadOpen.addEventListener('change', () => {
  slider.classList.add('hidden');
  effectValueSlider.classList.add('hidden');
  const file = imageUploadOpen.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    image.src = URL.createObjectURL(file);
  }
  scaleNumber = 100;
  image.classList.add(`scale-${scaleNumber}`);
  scaleValue.value = `${String(scaleNumber)}%`;
  imageContainer.className = 'img-upload__preview';
  openModal(uploadOverlay, imageUploadClose);
});

const clearInput = ()=> {
  image.src = '';
  image.classList = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  imageUploadOpen.value = '';
  image.classList.add('effects__preview--none');
  image.setAttribute('style', 'filter: none');
  resetValidate();
};

// Проверка загрузки фото
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__form',
  errorClass: 'img-upload__form--invalid',
  successClass: 'img-upload__form--valid',
}, false);

const blockSubmitButton = () => {
  imageUploadButton.disabled = true;
  imageUploadButton.textContent = 'Загружаем...';
};

const unblockSubmitButton = () => {
  imageUploadButton.disabled = false;
  imageUploadButton.textContent = 'Сохранить';
};

// Отправка фото на сервер
const setUserFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid && hashtagValidate) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccess();
          unblockSubmitButton();
          clearInput();
        },
        () => {
          onSuccess();
          showAlert();
          unblockSubmitButton();
          clearInput();
        },
        new FormData(evt.target),
      );
    }
  });
};
export { setUserFormSubmit };
