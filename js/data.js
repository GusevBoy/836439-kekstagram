'use strict';

(function () {
  window.keyCodeEsc = 27;
  window.photos = creatingArrayPhotos(25);
  window.pictures = document.querySelector('.pictures');
  var main = document.querySelector('main');


  /**
  *опряделяет процентное соотношение относително промежутка между минимальным значением и максимальным;
  *@param {number} min минимально значене
  *@param {number} max максимальное значение
  *@param {number} percent   процент
  *@return {number} ratio соотношение
  */
  window.determinesRatio = function (min, max, percent) {
    if (min < max && percent >= 0) {
      var ratio = (max - min) * (percent / 100) + min;
      return ratio;
    } else {
      ratio = 0;
      return ratio;
    }
  };

  /**
  *возвращает рандомное число в промежутке чисел от min до max.
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
  *Фунция создает массив из n объектов
  *@param {number} n колличество объектов
  *@return {array} photos массив из n объектов
  */
  function creatingArrayPhotos(n) {
    /**
    *выводит рандомное описание, которое берется из массива description
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
    *возвращает массив, который состоит из рандомных комментариев.
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
    var photosArray = [];
    for (var i = 0; i < n; i++) {
      photosArray[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: randomInteger(15, 200),
        comments: commentsPhoto(),
        description: descriptionPhoto(),

        /**
        *Создает блок bigPicture, изменяет значения лайков и колличество комментариев
        *@param {number} number  номер фотографии
        */
        fullSizeImage: function (number) {
          var photosItem = photosArray[number];
          var bigPicture = document.querySelector('#big-picture').content.querySelector('.big-picture');
          var element = bigPicture.cloneNode(true);
          var bigPictureImg = element.querySelector('.big-picture__img').querySelector('img');
          var bigPictureCancel = element.querySelector('.big-picture__cancel');
          /**
          *Удаляем элемент с большим изображением, удаляем обработчики
          */
          function onBigPictureCancelClick() {
            bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
            element.remove();
          }
          /**
          *При нажатии Esc удаляем элемент с большим изображением и удаляем обработчики
          *@param {HTMLobject} evt элемент на котором сработало событие
          */
          function onBigPictureKeyDownEsc(evt) {
            if (evt.keyCode === window.keyCodeEsc) {
              document.removeEventListener('keydown', onBigPictureKeyDownEsc);
              element.remove();
            }
          }
          bigPictureImg.setAttribute('src', photosItem.url);
          bigPictureImg.setAttribute('alt', photosItem.description);
          main.appendChild(element);
          bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
          document.addEventListener('keydown', onBigPictureKeyDownEsc);
        }
      };
    }
    return photosArray;
  }
})();
