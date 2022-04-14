import { openModal } from './open-modal.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureUrl = bigPicture.querySelector('.big-picture__img');
const bigPictureLikesCounter = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDiscription = bigPicture.querySelector('.social__caption');
const commentItem = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let startComments = 0;

const createComment = (comment) => {
  const commentElement = commentItem.cloneNode(true);
  const commentImage = commentElement.querySelector('.social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const download = (comments) => {
  let endComments = startComments + 5 ;
  if(endComments >= comments.length){
    endComments = comments.length;
    commentsLoader.remove();
  }
  for (let i = startComments; i < endComments; i++) {
    commentsList.appendChild(createComment(comments[i]));
  }
  startComments += 5;
};

const showBigPicture = ({ url, likes, comments, description }) => {
  commentsLoader.addEventListener('click', () => download(comments));
  bigPictureUrl.src = url;
  bigPictureLikesCounter.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  bigPictureDiscription.textContent = description;
  commentsList.textContent = '';
  commentsList.innerHTML = '';
  openModal(bigPicture, closeButton);
  download(comments);
};
export { showBigPicture };
//asldkaplsdkapsldka;sldka;sldka;lskda;slkdl;askd;askdlap;sld
