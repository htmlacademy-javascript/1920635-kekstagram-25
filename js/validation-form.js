сonst form = document.querySelector('.img-upload__form');
const hashtegInput = form.querySelector('.text__hashtags');
const buttonUpload = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'text__hashtags',
  errorClass: 'error__inner',
  successClass: 'success__inner'
}, false);

const createHashTeg = (value) => {
  for (let i = 0; i < value.length; i++) {
    if(!value[i] === ' '){
    if (value[i] === '#' && /^[a-zA-Z0-9]+$/.test(value[i + 1])) {
      const hashteg = document.createElement('li');
      hashteg.classList.add('text__hashtags')
      return hashteg;
    }
  }
  }
}

pristine.addValidator(
  hashtegInput,
  (value) => {
    return value[0] === '#' && value.length > 1;
  },
  'Хэш-тег должен начинатся с символа # и иметь минимум один символ');

pristine.addValidator(
  hashtegInput,
  (value) => {
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '#') {
        return /^[a-zA-Z0-9]+$/.test(value[i + 1]);
      }
    }
  },
  'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы ');

pristine.addValidator(
  hashteg,
  (value) => {
    for (let i = 0; i < hashteg.value.length; i++) {
    createHashTeg(hashteg.value[i]);
    const lowerCaseHashteg = hashteg.value.toLowerCase();
    if (lowerCaseHashteg === hashteg) {
      return false;
    }
  }
  },
  'Такой хэш-тег уже есть');

pristine.addValidator(
  hashteg,
   (value) => {
    for (const i = 0; i <= value.length; i++) {
      if (hashtegInput.value[i] === ' ') {
        return hashtegInput.value[i + 1] === '#';
      }
      'Новый хеш-тег должен начинаться с символа #';
    }
  });

buttonUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
