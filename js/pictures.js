'use strict';

var photos = creatingArrayPhotos(25);
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureComentsCountValue = bigPicture.querySelector('.comments-count');
// var bigPictureComents = bigPicture.querySelector('.social__comments');
// var bigPictureComentsItem = bigPicture.querySelector('.social__comment');
var bigPictureComentsCount = bigPicture.querySelector('.social__comment-count');
var bigPictureComentsLoader = bigPicture.querySelector('.comments-loader');
var imageLoadingField = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay ');
var closeButton = document.querySelector('.img-upload__cancel');

/**
*Данная функция опряделяет процентное соотношение относително промежутка между минимальным значением и максимальным;
*@param {number} min минимально значене
*@param {number} max максимальное значение
*@param {number} percent   процент
*@return {number} ratio соотношение
*/
function determinesRatio(min, max, percent) {
  if (min < max && percent >= 0) {
    var ratio = (max - min) * (percent / 100) + min;
    return ratio;
  } else {
    ratio = 0;
    return ratio;
  }
}

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
function commentsPhoto() {
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
}

/**
*Фунция создает массив из n объектов
*@param {number} n колличество объектов
*@return {array} photos массив из n объектов
*/
function creatingArrayPhotos(n) {
  var photosArray = [];
  for (var i = 0; i < n; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomInteger(15, 200),
      comments: commentsPhoto(),
      description: descriptionPhoto(),

      /**
      *Данный метод делает видимым блок bigPicture и изменяет значения лайков и колличество комментариев
      *@param {number} number  номер фотографии
      */
      fullSizeImage: function (number) {
        var photosItem = photosArray[number];
        bigPicture.classList.remove('hidden');
        bigPictureImg.setAttribute('src', photosItem.url);
        bigPictureLikesCount.textContent = photosItem.likes;
        bigPictureComentsCountValue.textContent = photosItem.comments.length;
        bigPictureComentsLoader.classList.add('visually-hidden');
        bigPictureComentsCount.classList.add('visually-hidden');
      }
    };
  }
  return photosArray;
}

/**
*Данная функция заполняет картинкавми блок pictures
*/
function fillingPictures() {
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var element = picture.cloneNode(true);
    var elementImg = element.querySelector('.picture__img');
    var elementLike = element.querySelector('.picture__likes');
    var elementComment = element.querySelector('.picture__comments');
    elementImg.setAttribute('src', photo.url);
    elementImg.setAttribute('value', i);
    elementLike.textContent = photo.likes;
    elementComment.textContent = (photo.comments).length;
    pictures.appendChild(element);
  }
}
/**
*Данная функция клонирует комментарии в блоке bigPicture
*/
// function addingComments(i) {
//   var photosItem = photos[i];
//   for (var i = 0; i < photosItem.comments.length; i++) {
//     var ComentsItem = bigPictureComentsItem.cloneNode(true);
//     var ComentsText = ComentsItem.querySelector('.social__text');
//     var coment = photosItem.comments[i];
//     var commentImg = ComentsItem.querySelector('.social__picture');
//     ComentsText.textContent = coment;
//     commentImg.setAttribute('src', ('img/avatar-' + randomInteger(1, 6) + '.svg'));
//     bigPictureComents.appendChild(ComentsItem);
//   }
// }
/**
*Данная функция добавляет к элементу(element) класс  hidden, тем самым элемент не отображается.
*@param {string} element можно вставить любой существующий элемент в DOM
*/
function сloseElement(element) {
  element.classList.add('hidden');
}
/**
* В данной функции накладываем эфекты и на картинку
*/
function imageOverlay() {
  var line = document.querySelector('.effect-level__line');
  var pin = line.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__value');
  var chromeEffect = document.querySelector('#effect-chrome');
  var noneEffect = document.querySelector('#effect-none');
  var sepiaEffect = document.querySelector('#effect-sepia');
  var marvinEffect = document.querySelector('#effect-marvin');
  var fobosEffect = document.querySelector('#effect-phobos');
  var heatEffect = document.querySelector('#effect-heat');
  var preview = document.querySelector('.img-upload__preview');
  var effectLevelValue = effectLevel.getAttribute('value');

  //  Если произайдет сдвиг ползунка, то измениться css свойство  left, данное значение будет перезаписано в value
  pin.addEventListener('mouseup', function () {
  });
  chromeEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'grayscale(' + determinesRatio(1, 3, effectLevelValue) + ')');
  });
  noneEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'none');
  });
  sepiaEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'sepia(' + determinesRatio(0, 1, effectLevelValue) + ')');
  });
  marvinEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'invert(' + determinesRatio(0, 100, effectLevelValue) + '%)');
  });
  fobosEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'blur(' + determinesRatio(0, 3, effectLevelValue) + 'px)');
  });
  heatEffect.addEventListener('change', function () {
    preview.setAttribute('style', 'filter:' + 'brightness(' + determinesRatio(1, 3, effectLevelValue) + ')');
  });
}
/**
*Данная функция закрывает форму добавления и редактирования при нажатии на крестик или нажатии клавиши ESC
*/
function closeDownloadForm() {
  closeButton.addEventListener('click', function () {
    сloseElement(imageEditingForm);
  });
  imageLoadingField.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      сloseElement(imageEditingForm);
    }
  });
}

/**
*Данная функция открывает форму при нажатии нажатии на кнопку Загрузить
*/
function openDownloadForm() {
// В задании сказано, что необходимо сбросить значение поля выбора файла #upload-file
  imageLoadingField.addEventListener('change', function () {
    imageEditingForm.classList.remove('hidden');
    imageOverlay();
  });
}


function openBigPicture() {
  var pictures = document.querySelector('.pictures');
  pictures.onclick = function (event) {
    var target = (event.target);
    var id = target.getAttribute('value');
    photos[id].fullSizeImage(id);
  };
}

function closeBigPicture() {
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', function () {
    сloseElement(bigPicture);
  });
  // event.addEventListener('keydown', function(evt) {
  //   if (evt.keyCode === 27) {
  //     сloseElement(bigPicture);
  //   }
  // });
}

fillingPictures();

openDownloadForm();
closeDownloadForm();
openBigPicture();
closeBigPicture();
