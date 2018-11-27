'use strict';

/**
*Данная функция возвращает рандомное число в промежутке чисел от min до max.
*@param {number} min минимально значене
*@param {number} max максимальное значение
*@return {number} rand рандомное число в пределе от минимального до максимального значения
*/
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
/**
*Данная функция выводит рандомное описание, которое берется из массива description
*@return {number} description рандомное описание из массива description
*/
function descriptionPhoto() {
  var description = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Едим пицу', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.', 'Не обижайте всех словами......', 'Вот это тачка!']
  description = description[randomInteger(0, description.length-1)]
  return description
}
/**
*Данная функция возвращает массив, который состоит из рандомных комментариев.
*@return {array} commentsPhoto массив с комментариями
*/
var commentsPhoto = function() {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Витюшка одобряет!'];
  var commentsPhoto = [];
  var numberComments = randomInteger(1, comments.length-1);
  for (var i = 0; i <= numberComments; i++) {
    commentsPhoto[i] = comments[randomInteger(0, comments.length-1)];
  }
  return commentsPhoto;
}

/**
*Фунция создает массив из n объектов
*@param {number} n колличество объектов
*/
var creatingArrayPhotos = function (n){
  var photos = [];
  for (var i = 0; i<n; i++) {
    photos[i] = {
      url: 'photos/'+ (i+1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: commentsPhoto(),
      description: descriptionPhoto(),
    }
  }
  return photos;
};

var photos = creatingArrayPhotos(25);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
console.log (bigPicture);

var picture = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
for (var i = 0; i <= photos.length; i++) {
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
