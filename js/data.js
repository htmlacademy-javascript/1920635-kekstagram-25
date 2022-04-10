import { getRandomArrayElement, getRandomPositiveInteger } from './util.js';

const DESCRIPTION = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAME = ['Артем', 'Иван', 'Николай', 'Евгений', 'Роман'];
const postCount = 25;
const commentCount = 3;

const createComment = () => ({
  id: getRandomPositiveInteger(1, 1000),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

const getComments = () => Array.from({ length: commentCount }, createComment);

const createPost = () => ({
  id: getRandomPositiveInteger(1, 25),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInteger(15, 200),
  comments: getComments()
});

const postArray = () => Array.from({ length: postCount }, createPost);

export { postArray };
