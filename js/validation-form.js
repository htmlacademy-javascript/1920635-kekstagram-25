const hashtegInput = document.querySelector('.text__hashtags');
const buttonUpload = document.querySelector('.img-upload__submit');
const hashteg = hashtegInput.cloneNode(true);

const pristine = new Pristine(hashtegInput, {
  classTo: 'text__hashtags',
  errorClass: 'error__inner',
  successClass: 'success__inner',
  errorTextParent: '',
  errorTextTag: '',
  errorTextClass: ''
}, false);

pristine.addValidator(
  hashtegInput,
  (value) => {
    if (value[0] === '#' && value.length > 1) {
      return true;
    }
  },
  'Хэш-тег должен начинатся с символа # (решётка) и состоять не только из него');

pristine.addValidator(
  hashtegInput,
  (value) => {
    const hashtegText = value.slice(1);
    if (/^[a-zA-Z0-9]+$/.test(hashtegText)) {
      return true;
    }
    return false;
  },
  'Хэш-тег начинается с символа # (решётка)');

pristine.addValidator(
  hashteg,
  () => {
    const lowerCaseHashteg = hashteg.value.toLowerCase();
    if (lowerCaseHashteg === hashteg) {
      return false;
    }
    return true;
  },
  'Такой хэш-тег уже есть');

// pristine.addValidator(
//   hashteg,
//   (value) => {
//     const lowerCaseHashteg = hashteg.value.toLowerCase();
//     for(const i = 0; i <= value.length; i++){
//     if (hashtegInput.value[i] === ' '){
//       hashtegInput.value[i+1] === '#';
//       return true;
//     }
//     return false},
//  'Новый хеш-тег должен начинаться с символа #');

buttonUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
