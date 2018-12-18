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
  var effectLevel = imageEditingForm.querySelector('.effect-level');
  var pin = effectLevel.querySelector('.effect-level__pin');
  var line = effectLevel.querySelector('.effect-level__line');
  var lineDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelInput = effectLevel.querySelector('.effect-level__value');
  var effectLevelValue = effectLevelInput.value;
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
  *Добавляем стили объекту preview
  *@param {DOMobject} object объект на котором будет изменен стиль, если соответствует условию.
  */
  function addFiltersImg(object) {
    var preview = document.querySelector('.img-upload__preview');
    if (object === effectsList.querySelector('#effect-chrome')) {
      preview.setAttribute('style', 'filter:' + 'grayscale(' + determinesRatio(1, 3, effectLevelValue) + ')');
    }
    if (object === effectsList.querySelector('#effect-none')) {
      preview.setAttribute('style', 'filter:' + 'none');
    }
    if (object === effectsList.querySelector('#effect-sepia')) {
      preview.setAttribute('style', 'filter:' + 'sepia(' + determinesRatio(0, 1, effectLevelValue) + ')');
    }
    if (object === effectsList.querySelector('#effect-marvin')) {
      preview.setAttribute('style', 'filter:' + 'invert(' + determinesRatio(0, 100, effectLevelValue) + '%)');
    }
    if (object === effectsList.querySelector('#effect-phobos')) {
      preview.setAttribute('style', 'filter:' + 'blur(' + determinesRatio(0, 10, effectLevelValue) + 'px)');
    }
    if (object === effectsList.querySelector('#effect-heat')) {
      preview.setAttribute('style', 'filter:' + 'brightness(' + determinesRatio(1, 3, effectLevelValue) + ')');
    }
  }
  /**
  *Добавляет эффекты к загружаемому изображению
  *@param {HTMLobject} clickEvt объект события
  */
  function onClickEffects(clickEvt) {
    var target = clickEvt.target;
    addFiltersImg(target);
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
  *Перемещаем ползунок. При перемещении изменяется уровень эффекта
  *@param {HTMLobject} evt элемент на котором сработало событие
  */
  function omMousedownPin(evt) {
    evt.preventDefault();
    var arrayEffects = effectsList.querySelectorAll('input[name="effect"]');
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    for (var i = 0; i < arrayEffects.length; i++) {
      if (arrayEffects[i].checked) {
        var checkedEffect = arrayEffects[i];
      }
    }
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      pin.style.left = (pin.offsetLeft - shift.x) + 'px';
      lineDepth.style.width = pin.style.left;
      if (pin.offsetLeft - shift.x > line.offsetWidth) {
        pin.style.left = line.offsetWidth + 'px';
        lineDepth.style.width = line.offsetWidth + 'px';
      }
      if (pin.offsetLeft - shift.x < 0) {
        pin.style.left = 0 + 'px';
        lineDepth.style.width = 0 + 'px';
      }
      effectLevelValue = Math.round((+pin.style.left.slice(0, -2) * 100) / line.offsetWidth);
      effectLevelInput.setAttribute('value', effectLevelValue);
      addFiltersImg(checkedEffect);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
    pin.removeEventListener('mousedown', omMousedownPin);
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
    pin.addEventListener('mousedown', omMousedownPin);
  }
  imgUploadInput.addEventListener('change', onChangeimageEditingForm);

}

fillingPictures();
openDownloadForm();
