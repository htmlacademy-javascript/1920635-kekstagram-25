import { openModal } from './open-modal.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureUrl = bigPicture.querySelector('.big-picture__img');
const bigPictureLikesCounter = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureDiscription =  bigPicture.querySelector('.social__caption');
const pictureCommentsCounter = document.querySelector('.social__comment-count');
const commentItem = commentsList.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const createComment = (comment) => {
  const commentElement = commentItem.cloneNode(true);
  const commentImage = commentElement.querySelector('.social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const showBigPicture = ({ url, likes, comments, description })=>{
  bigPictureUrl.src = url;
  bigPictureLikesCounter.textContent = likes;
  bigPictureCommentsCount.textContent = comments.length;
  bigPictureDiscription.textContent = description;
  commentsList.textContent = '';
  pictureCommentsCounter.classList.add('.hidden');
  commentsLoader.classList.add('hidden');
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    commentsList.appendChild(createComment(comment));
  });
  openModal(bigPicture, closeButton);
};


export { showBigPicture};
