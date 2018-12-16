'use strict';
var keyCodeEsc = 27;
var photos = creatingArrayPhotos(25);
var main = document.querySelector('main');
var pictures = document.querySelector('.pictures');

/**
*опряделяет процентное соотношение относително промежутка между минимальным значением и максимальным;
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
          if (evt.keyCode === keyCodeEsc) {
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

/**
*заполняет картинкавми блок pictures
*/
function fillingPictures() {
  /**
  *При нажатии на маленькое изображение откроется полноценая картинка
  *@param {HTMLobject} evt элемент на котором сработало событие
  */
  function onClickPhoto(evt) {
    var target = (evt.target);
    if (target.getAttribute('class') === ('picture__img')) {
      var id = target.getAttribute('value');
      if (id !== 'undefined' && id !== null) {
        photos[id].fullSizeImage(id);
      }
    }
  }

  pictures.addEventListener('click', onClickPhoto);
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var element = picture.cloneNode(true);
    var elementImg = element.querySelector('.picture__img');
    var elementLike = element.querySelector('.picture__likes');
    var elementComment = element.querySelector('.picture__comments');
    elementImg.setAttribute('src', photo.url);
    elementImg.setAttribute('alt', photo.description);
    elementImg.setAttribute('value', i);
    elementLike.textContent = photo.likes;
    elementComment.textContent = (photo.comments).length;
    pictures.appendChild(element);
  }
}

/**
*Открываем форму при нажатии нажатии на кнопку Загрузить
*/
function openDownloadForm() {
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var control = document.querySelector('.img-upload__scale');
  var imgUploadInput = document.querySelector('#upload-file');
  var closeButton = imageEditingForm.querySelector('.img-upload__cancel');
  var imgScale = imageEditingForm.querySelector('.effect-image-preview');
  var minButton = control.querySelector('.scale__control--smaller');
  var maxButton = control.querySelector('.scale__control--bigger');
  var controlValue = control.querySelector('.scale__control--value');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var hashtags = imgUploadForm.elements.hashtags;
  var inputHashtags = document.querySelector('.text__hashtags');
  var effectsList = imageEditingForm.querySelector('.effects__list');
  /**
  * Изменяет значение атрибута value у объекта .scale__control--value
  * Так же добавляет атрибут style со значением 'style', 'transform: scale(value) объекту .effect-image-preview
  *@param {HTMLobject} clickEvt объект события
  */
  function onClicksButtons(clickEvt) {
    var step = 25;
    var valuePercent = controlValue.getAttribute('value');
    var value = +(valuePercent.slice(0, -1));
    var target = clickEvt.target;
    if (target === minButton) {
      if ((value - step) >= 25) {
        value = value - step;
      }
    }
    if (target === maxButton) {
      if ((value + step) <= 100) {
        value = value + step;
      }
    }
    controlValue.setAttribute('value', value + '%');
    imgScale.setAttribute('style', 'transform: scale(' + determinesRatio(0, value, 1) + ')');
  }
  /**
  *Добавляет эффекты к загружаемому изображению
  *@param {HTMLobject} clickEvt объект события
  */
  function onClickEffects(clickEvt) {
    var preview = document.querySelector('.img-upload__preview');
    var effectLevel = imageEditingForm.querySelector('.effect-level__value');
    var effectLevelValue = effectLevel.getAttribute('value');
    var target = clickEvt.target;
    if (target === effectsList.querySelector('#effect-chrome')) {
      preview.setAttribute('style', 'filter:' + 'grayscale(' + determinesRatio(1, 3, effectLevelValue) + ')');
    }
    if (target === effectsList.querySelector('#effect-none')) {
      preview.setAttribute('style', 'filter:' + 'none');
    }
    if (target === effectsList.querySelector('#effect-sepia')) {
      preview.setAttribute('style', 'filter:' + 'sepia(' + determinesRatio(0, 1, effectLevelValue) + ')');
    }
    if (target === effectsList.querySelector('#effect-marvin')) {
      preview.setAttribute('style', 'filter:' + 'invert(' + determinesRatio(0, 100, effectLevelValue) + '%)');
    }
    if (target === effectsList.querySelector('#effect-phobos')) {
      preview.setAttribute('style', 'filter:' + 'blur(' + determinesRatio(0, 10, effectLevelValue) + 'px)');
    }
    if (target === effectsList.querySelector('#effect-heat')) {
      preview.setAttribute('style', 'filter:' + 'brightness(' + determinesRatio(1, 3, effectLevelValue) + ')');
    }
  }
  /**
  *проверяет правильность хэштэгов, которые передаются в форме imgUploadForm.
  */
  function onInputHashtags() {
    var arrayHashtags = [];
    arrayHashtags = hashtags.value.split(' ');
    arrayHashtags.sort();
    inputHashtags.setCustomValidity('');
    for (var i = 0; i < arrayHashtags.length; i++) {
      if (arrayHashtags[i] === '') {
        arrayHashtags.splice(i, 1);
        i = i - 1;
      }
      if (arrayHashtags[i] !== undefined) {
        if (arrayHashtags[i].length > 20) {
          inputHashtags.setCustomValidity('ХэшТэг должен быть меньше 20 символов');
          event.preventDefault();
          return;
        }
        if (arrayHashtags[i].charAt(0) !== '#') {
          inputHashtags.setCustomValidity('ХэшТэг начинается с решетки');
          event.preventDefault();
        } else {
          inputHashtags.setCustomValidity('');
        }
        if (i !== arrayHashtags.length) {
          if (arrayHashtags[i].toLowerCase() === arrayHashtags[i + 1]) {
            inputHashtags.setCustomValidity('ХэшТэги не должны повторяться');
            event.preventDefault();
            return;
          }
        }
      }

      if (arrayHashtags.length > 5) {
        inputHashtags.setCustomValidity('Вы ввели больше пяти ХэшТэгов');
        event.preventDefault();
        return;
      }
    }
  }
  /**
  *добавляет к элементу(element) класс  hidden, тем самым элемент не отображается.
  *@param {HTMLElement} element можно вставить любой существующий элемент в DOM
  */
  function сloseElement(element) {
    element.classList.add('hidden');
  }
  /**
  *Удаляет обработчики, сбрасывает значение поля выбора файла #upload-file
  *Скрывает форму
  */
  function removeListenerForm() {
    imgUploadInput.removeEventListener('keydown', onCloseFormEsc);
    closeButton.removeEventListener('click', onCloseButton);
    minButton.removeEventListener('click', onClicksButtons);
    maxButton.removeEventListener('click', onClicksButtons);
    inputHashtags.removeEventListener('input', onInputHashtags);
    effectsList.removeEventListener('click', onClickEffects);
    сloseElement(imageEditingForm);
    imgUploadInput.value = '';
  }

  function onCloseButton() {
    removeListenerForm();
  }

  function onCloseFormEsc(evt) {
    if (evt.keyCode === keyCodeEsc) {
      removeListenerForm();
    }
  }

  /**
  *Показываем форму, регистрируем обработчики события
  */
  function onChangeimageEditingForm() {
    imageEditingForm.classList.remove('hidden');
    closeButton.addEventListener('click', onCloseButton);
    imgUploadInput.addEventListener('keydown', onCloseFormEsc);
    minButton.addEventListener('click', onClicksButtons);
    maxButton.addEventListener('click', onClicksButtons);
    inputHashtags.addEventListener('input', onInputHashtags);
    effectsList.addEventListener('click', onClickEffects);
  }
  imgUploadInput.addEventListener('change', onChangeimageEditingForm);

}


fillingPictures();
openDownloadForm();
