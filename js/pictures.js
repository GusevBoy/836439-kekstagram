'use strict';

/**
*Данная функция возвращает рандомное число в промежутке чисел от min до max.
*@param {number} min минимально значене
*@param {number} max максимальное значение
*@return {number} rand рандомное число в пределе от минимального до максимального значения
*/
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

/**
*Данная функция выводит рандомное описание, которое берется из массива description
*@return {number} value, рандомное описание из массива description
*/
function descriptionPhoto() {
  var value = [];
  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...', 'Едим пицу',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.',
    'Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  value = description[randomInteger(0, description.length - 1)];
  return value;
}

/**
*Данная функция возвращает массив, который состоит из рандомных комментариев.
*@return {array} commentsPhoto массив с комментариями
*/
var commentsPhoto = function () {
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    'Витюшка одобряет!'
  ];
  var commentsArray = [];
  var numberComments = randomInteger(1, comments.length - 1);
  for (var i = 0; i <= numberComments; i++) {
    commentsArray[i] = comments[randomInteger(0, comments.length - 1)];
  }
  return commentsArray;
};

/**
*Фунция создает массив из n объектов
*@param {number} n колличество объектов
*@return {array} photos массив из n объектов
*/
var creatingArrayPhotos = function (n) {
  var photos = [];
  for (var i = 0; i < n; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: commentsPhoto(),
      description: descriptionPhoto(),
    };
  }
  return photos;
};

var photos = creatingArrayPhotos(25);
var photosItem = photos[3];

var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureComentsCountValue = bigPicture.querySelector('.comments-count');
var bigPictureComents = bigPicture.querySelector('.social__comments');
var bigPictureComentsItem = bigPicture.querySelector('.social__comment');
var bigPictureComentsCount = bigPicture.querySelector('.social__comment-count');
var bigPictureComentsLoader = bigPicture.querySelector('.comments-loader');

/**
*Данная функция заполняет картинкавми блок pictures
*/
var fillingPictures = function () {
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var element = picture.cloneNode(true);
    var elementImg = element.querySelector('.picture__img');
    var elementLike = element.querySelector('.picture__likes');
    var elementComment = element.querySelector('.picture__comments');
    elementImg.setAttribute('src', photo.url);
    elementLike.textContent = photo.likes;
    elementComment.textContent = (photo.comments).length;
    pictures.appendChild(element);
  }
}
/**
*Данная функция клонирует комментарии в блоке bigPicture
*/
var addingComments = function () {
  for (var i = 0; i < photosItem.comments.length; i++) {
    var ComentsItem = bigPictureComentsItem.cloneNode(true);
    var ComentsText = ComentsItem.querySelector('.social__text');
    var coment = photosItem.comments[i];
    var commentImg = ComentsItem.querySelector('.social__picture');
    ComentsText.textContent = coment;
    commentImg.setAttribute('src', ('img/avatar-' + randomInteger(1, 6) + '.svg'));
    bigPictureComents.appendChild(ComentsItem);
  }
}

/**
*Данная функция делает видимым блок bigPicture и изменяет значения лайков и колличество комментариев
*/
var visuallyBigPicture = function () {
  bigPicture.classList.remove('hidden');
  bigPictureImg.setAttribute('src', photosItem.url);
  bigPictureLikesCount.textContent = photosItem.likes;
  bigPictureComentsCountValue.textContent = photosItem.comments.length;
  bigPictureComentsLoader.classList.add('visually-hidden');
  bigPictureComentsCount.classList.add('visually-hidden');
}

fillingPictures ();
visuallyBigPicture ();
addingComments ();
