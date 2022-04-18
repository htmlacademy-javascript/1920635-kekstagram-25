import { isEscapeKey } from './open-modal.js';

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const closeTemplateSuccess = successTemplate.querySelector('.success__button');
const closeTemplateError = errorTemplate.querySelector('.error__button');
const ALERT_SHOW_TIME = 5000;

const showAlert = () => {
  document.body.append('beforeend',errorTemplate);
  closeTemplateError.addEventListener('click', ()=>{
    errorTemplate.remove();
  });
  document.addEventListener('click', (evt)=>{
    const target = evt.target;
    if(!target.closest('.error__inner') ){
      errorTemplate.remove();
    }
  });
  document.addEventListener('keydown', (evt)=>{
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorTemplate.remove();
    }
  });
  setTimeout(() => {
    errorTemplate.remove();
  }, ALERT_SHOW_TIME);
};

const showSuccess = () => {
  document.body.append('beforeend',successTemplate);
  closeTemplateSuccess.addEventListener('click', ()=>{
    successTemplate.remove();
  });
  document.addEventListener('click', (evt)=>{
    const target = evt.target;
    if(!target.closest('.success__inner') ){
      successTemplate.remove();
    }
  });
  document.addEventListener('keydown', (evt)=>{
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successTemplate.remove();
    }
  });
  setTimeout(() => {
    successTemplate.remove();
  }, ALERT_SHOW_TIME);
};

export{getRandomArrayElement,getRandomPositiveInteger, showAlert, showSuccess};
