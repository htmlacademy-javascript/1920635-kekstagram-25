let hashtagValidate = true;

const form = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'hashtags',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'hashtags',
  errorTextTag: 'span',
  errorTextClass: 'hashtag_error'
}, false);

// Проверка на количество хэш-тегов
const checkHashtagCount = (value) => value.split(' ').length <= 5;

pristine.addValidator(
  hashtagInput,
  checkHashtagCount,
  'Хэш-тегов должно быть не больше 5');

// Хэш-тег должен начинаться с # и не включать в себя спецсимволы
const checkHashtegElement = (element) => {
  if (element.length > 0) {
    if (element[0] !== '#') {
      return false;
    }
    for (let i = 1; i < element.length; i++) {
      return /^[a-zA-Z0-9]+$/.test(element[i]);
    }
  } return true;
};

const checkHashtagName = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.every(checkHashtegElement);
};
pristine.addValidator(
  hashtagInput,
  checkHashtagName,
  'Хэш-тег должен начинаться с # и не включать в себя спецсимволы');

// Хэш-тег должен иметь до 20 символов
const checkHashtegElementLength = (element) => {
  for (let i = 0; i < element.length; i++) {
    return element.length <= 20;
  }
};
const checkHashtagLength = (value) => {
  if (value !== '') {
    const hashtagArray = value.split(' ');
    return hashtagArray.every(checkHashtegElementLength);
  }
  return true;
};
pristine.addValidator(
  hashtagInput,
  checkHashtagLength,
  'Хэш-тег должен иметь от 1 до 20 символов');

// Такой хэш-тег уже есть
const checkSame = (value) => {
  const lowerCaseHashtag = value.toLowerCase();
  const hashtagArray = lowerCaseHashtag.split(' ');
  for (let i = 0; i < hashtagArray.length - 1; i++) {
    for (let j = i + 1; j < hashtagArray.length; j++) {
      if (hashtagArray[i] === hashtagArray[j]) {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(
  hashtagInput,
  checkSame,
  'Такой хэш-тег уже есть');

// Валидация
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  hashtagValidate = pristine.validate();
});

// Сброс валидации
const resetValidate = () => {
  pristine.reset();
};
form.addEventListener('change', resetValidate);

export { hashtagValidate, resetValidate };

