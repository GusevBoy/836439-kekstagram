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
      *Данный метод делает видимым блок bigPicture и изменяет значения лайков и колличество комментариев
      *@param {number} number  номер фотографии
      */
      fullSizeImage: function (number) {
        var photosItem = photosArray[number];
        var bigPicture = document.querySelector('#big-picture').content.querySelector('.big-picture');
        var element = bigPicture.cloneNode(true);
        var bigPictureImg = element.querySelector('.big-picture__img').querySelector('img');
        var bigPictureCancel = element.querySelector('.big-picture__cancel');
        /**
        *Данный обработчик при нажатии на крестик удаляет элемент с большим изображением и удаляет слушатель
        */
        function onBigPictureCancelClick() {
          bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
          element.remove();
        }
        /**
        *Данный обработчик при нажатии на кнопку Esc удаляет элемент с большим изображением и удаляет слушатель
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
*добавляет к элементу(element) класс  hidden, тем самым элемент не отображается.
*@param {HTMLElement} element можно вставить любой существующий элемент в DOM
*/
function сloseElement(element) {
  element.classList.add('hidden');
}

/**
*открывает форму при нажатии нажатии на кнопку Загрузить
*/
function openDownloadForm() {
  var dowloadButton = document.querySelector('.img-upload__control');
  var closeButton = document.querySelector('.img-upload__cancel');
  var imageEditingForm = document.querySelector('.img-upload__overlay ');
  var imageLoadingField = document.querySelector('#upload-file');
  var imgUploaadInput = document.querySelector('.img-upload__input ');
  /**
  *при нажатии на кнопку .img-upload__cancel скрывает форму
  */
  function onCloseButton() {
    closeButton.removeEventListener('click', onCloseButton);
    changeScaleImg(0);
    сloseElement(imageEditingForm);
    imgUploaadInput.value = '';
  }
  /**
  *при нажатии на кнопку Esc скрывает форму
  *@param {HTMLobject} evt элемент на котором сработало событие
  */
  function onCloseFormEsc(evt) {
    if (evt.keyCode === keyCodeEsc) {
      imageLoadingField.removeEventListener('keydown', onCloseFormEsc);
      сloseElement(imageEditingForm);
      imgUploaadInput.value = '';
    }
  }
  /**
  *при нажатии на кнопку Загрузить на форму и на крестик в форме вешаются обработчики событий
  */
  function onClickDowloadButton() {
    closeButton.addEventListener('click', onCloseButton);
    imageLoadingField.addEventListener('keydown', onCloseFormEsc);

  }
  /**
  *при срабатывание события делаем блок с формой видимым и применяем проверку хэштэгов и наложение эфектов
  */
  function onChangeimageEditingForm() {
    imageEditingForm.classList.remove('hidden');
    addEffectToImage();
    checkingHashTags();
    changeScaleImg(1);
  }
  dowloadButton.addEventListener('click', onClickDowloadButton);
  imageLoadingField.addEventListener('change', onChangeimageEditingForm);

}
/**
* В данной функции накладываем эфекты и на картинку
*/
function addEffectToImage() {
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
  heatEffect.removeAttribute('checked');
  noneEffect.setAttribute('checked', '');
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
*проверяет правильность хэштэгов, которые передаются в форме imgUploadForm.
*/
function checkingHashTags() {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var hashtags = imgUploadForm.elements.hashtags;
  var arrayHashtags = [];
  var inputHashtags = document.querySelector('.text__hashtags');
  function onSubmitForm() {
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
  inputHashtags.addEventListener('input', onSubmitForm);
}
/**
*С помощью флага Вешает и Удалеет слушателей на кноках .scale__control--smaller и .scale__control--bigger'
*C помощью обработчика onClicksButtons изменяет масштам картинки
*@param {number} flag  если поставить 1 до на кнопки будут прослушиваться, если 0 то слушатели удаляться
*/
function changeScaleImg(flag) {
  var control = document.querySelector('.img-upload__scale');
  var minButton = control.querySelector('.scale__control--smaller');
  var maxButton = control.querySelector('.scale__control--bigger');
  var controlValue = control.querySelector('.scale__control--value');
  var imgScale = document.querySelector('.effect-image-preview');
  /**
  * При нажатии на кнопки изменяет значение атрибута value у объекта .scale__control--value
  * Так же добавляет атрибут style со значением 'style', 'transform: scale(value) объекту .effect-image-preview
  *@param {HTMLobject} clickEvt элемент на котором сработало событие
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


  function buttonsAddListener() {
    minButton.addEventListener('click', onClicksButtons);
    maxButton.addEventListener('click', onClicksButtons);
  }

  function buttonsRemoveListener() {
    minButton.removeEventListener('click', onClicksButtons);
    maxButton.removeEventListener('click', onClicksButtons);
  }

  if (flag === 1) {
    buttonsAddListener();
  }

  if (flag === 2) {
    buttonsRemoveListener();
  }
}
fillingPictures();
openDownloadForm();
