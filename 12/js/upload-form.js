import { openModal } from './open-modal.js';
const imageUploadOpen = document.querySelector('#upload-file');
const imageUploadClose = document.querySelector('#upload-cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageContainer = document.querySelector('.img-upload__preview');
const image = imageContainer.querySelector('img');
let scaleNumber;

//Добавляем индикаторы

const scaleSmaller = () => {
  if (scaleNumber <= 100 && scaleNumber > 25) {
    image.classList.remove(`scale-${scaleNumber}`);
    scaleNumber -= 25;
    scaleValue.value = `${String(scaleNumber)}%`;
    image.classList.add(`scale-${scaleNumber}`);
  }
};
const scaleBigger = () => {
  image.classList.remove(`scale-${scaleNumber}`);
  if (scaleNumber < 100 && scaleNumber >= 25) {
    scaleNumber += 25;
    scaleValue.value = `${String(scaleNumber)}%`;
    image.classList.add(`scale-${scaleNumber}`);
  }
};

scaleSmallerButton.addEventListener('click', scaleSmaller);
scaleBiggerButton.addEventListener('click', scaleBigger);
scaleValue.value = `${String(100)}%`;
// Эффекты
const changeEffectButtons = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
let effectClass;
let lastClass;
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1
});

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

changeEffectButtons.forEach((button) => {
  button.addEventListener('change', () => {
    slider.removeAttribute('disabled');
    image.classList = '';
    image.classList.add(`scale-${scaleNumber}`);
    image.classList.add(`effects__preview--${button.value}`);
    effectClass = image.classList.value.split(' ');
    lastClass = effectClass.pop();
    switch (lastClass) {
      case 'effects__preview--none':
        slider.setAttribute('disabled', true);
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

imageUploadOpen.addEventListener('change', () => {
  image.classList.remove(`scale-${scaleNumber}`);
  scaleNumber = 100;
  image.classList.add(`scale-${scaleNumber}`);
  image.classList.add('effects__preview--none');
  slider.setAttribute('disabled', true);
  scaleValue.value = `${String(scaleNumber)}%`;
  imageContainer.className = 'img-upload__preview';
  openModal(uploadOverlay, imageUploadClose);
});
