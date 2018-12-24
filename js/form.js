// Файл form.js
'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');
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
  *@param {HTMLObject} clickEvt объект события
  */
  function onClicksButtonsScale(clickEvt) {
    var STEP = 25;
    var valuePercent = controlValue.getAttribute('value');
    var VALUE_SCALE = +(valuePercent.slice(0, -1));
    var target = clickEvt.target;
    if (target === minButton) {
      if ((VALUE_SCALE - STEP) >= 25) {
        VALUE_SCALE = VALUE_SCALE - STEP;
      }
    }
    if (target === maxButton) {
      if ((VALUE_SCALE + STEP) <= 100) {
        VALUE_SCALE = VALUE_SCALE + STEP;
      }
    }
    controlValue.setAttribute('value', VALUE_SCALE + '%');
    imgScale.setAttribute('style', 'transform: scale(' + window.determinesRatio(0, VALUE_SCALE, 1) + ')');
  }
  /**
  *Добавляем стили объекту preview
  *@param {DOMObject} object объект на котором будет изменен стиль, если соответствует условию.
  */
  function addFiltersImg(object) {
    var preview = document.querySelector('.img-upload__preview');
    if (object === effectsList.querySelector('#effect-chrome')) {
      preview.setAttribute('style', 'filter:' + 'grayscale(' + window.determinesRatio(1, 3, effectLevelValue) + ')');
      effectLevel.classList.remove('hidden');
    }
    if (object === effectsList.querySelector('#effect-none')) {
      preview.setAttribute('style', 'filter:' + 'none');
      effectLevel.classList.add('hidden');
    }
    if (object === effectsList.querySelector('#effect-sepia')) {
      preview.setAttribute('style', 'filter:' + 'sepia(' + window.determinesRatio(0, 1, effectLevelValue) + ')');
      effectLevel.classList.remove('hidden');
    }
    if (object === effectsList.querySelector('#effect-marvin')) {
      preview.setAttribute('style', 'filter:' + 'invert(' + window.determinesRatio(0, 100, effectLevelValue) + '%)');
      effectLevel.classList.remove('hidden');
    }
    if (object === effectsList.querySelector('#effect-phobos')) {
      preview.setAttribute('style', 'filter:' + 'blur(' + window.determinesRatio(0, 10, effectLevelValue) + 'px)');
      effectLevel.classList.remove('hidden');
    }
    if (object === effectsList.querySelector('#effect-heat')) {
      preview.setAttribute('style', 'filter:' + 'brightness(' + window.determinesRatio(1, 3, effectLevelValue) + ')');
      effectLevel.classList.remove('hidden');
    }
  }
  /**
  *Добавляет эффекты к загружаемому изображению
  *@param {HTMLObject} clickEvt объект события
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
          inputHashtags.setAttribute('style', 'border: 5px solid red');
          return;
        }
        if (arrayHashtags[i].charAt(0) !== '#') {
          inputHashtags.setCustomValidity('ХэшТэг начинается с решетки');
          event.preventDefault();
          inputHashtags.setAttribute('style', 'border: 5px solid red');
          return;
        } else {
          inputHashtags.setCustomValidity('');
        }
        if (i !== arrayHashtags.length) {
          if (arrayHashtags[i].toLowerCase() === arrayHashtags[i + 1]) {
            inputHashtags.setCustomValidity('ХэшТэги не должны повторяться');
            event.preventDefault();
            inputHashtags.setAttribute('style', 'border: 5px solid red');
            return;
          }
        }
        if (arrayHashtags[i] === '#' && arrayHashtags[i].length === 1) {
          inputHashtags.setCustomValidity('ХэшТэг не может состоять из одной решетки');
          event.preventDefault();
          return;
        }
      }

      if (arrayHashtags.length > 5) {
        inputHashtags.setCustomValidity('Вы ввели больше пяти ХэшТэгов');
        event.preventDefault();
        inputHashtags.setAttribute('style', 'border: 5px solid red');
        return;
      }
    }
    inputHashtags.setAttribute('style', 'none');
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
  *@param {HTMLObject} evt элемент на котором сработало событие.
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
    document.removeEventListener('keydown', onCloseFormEsc);
    closeButton.removeEventListener('click', onCloseButton);
    minButton.removeEventListener('click', onClicksButtonsScale);
    maxButton.removeEventListener('click', onClicksButtonsScale);
    inputHashtags.removeEventListener('input', onInputHashtags);
    effectsList.removeEventListener('click', onClickEffects);
    pin.removeEventListener('mousedown', omMousedownPin);
    document.querySelector('.img-upload__wrapper').removeEventListener('click', onCloseOverlay);
    сloseElement(imageEditingForm);
    imgUploadInput.value = '';
    inputHashtags.setAttribute('style', 'none');
  }

  function onCloseButton() {
    removeListenerForm();
  }

  function onCloseFormEsc(evt) {
    if (evt.keyСode === window.KEY_CODE_ESC || evt.key === 'Escape') {
      if (evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description')) {
        return;
      } else {
        form.reset();
        removeListenerForm();
      }
    }
  }

  function onCloseOverlay(evt) {
    if (evt.target.classList.contains('img-upload__overlay')) {
      removeListenerForm();
    } else {
      return;
    }
  }

  /**
  *Показываем форму, регистрируем обработчики события
  */
  function onChangeimageEditingForm() {
    imageEditingForm.classList.remove('hidden');
    closeButton.addEventListener('click', onCloseButton);
    document.addEventListener('keydown', onCloseFormEsc);
    minButton.addEventListener('click', onClicksButtonsScale);
    maxButton.addEventListener('click', onClicksButtonsScale);
    inputHashtags.addEventListener('input', onInputHashtags);
    effectsList.addEventListener('click', onClickEffects);
    pin.addEventListener('mousedown', omMousedownPin);
    document.querySelector('.img-upload__wrapper').addEventListener('click', onCloseOverlay);

    function onSubmitForm(evt) {
      evt.preventDefault();
      window.upload(new FormData(form), showSuccessMessage, showErrorMessage);
      imageEditingForm.classList.add('hidden');
      imgUploadInput.value = '';
      form.reset();
      form.removeEventListener('submit', onSubmitForm);
      document.querySelector('.img-filters').classList.remove('hidden');
    }
    form.addEventListener('submit', onSubmitForm);
  }

  function showMessage(templateSelector) {
    function closeMessagePopup() {
      var messageDomElement = document.querySelector('.' + templateSelector);
      document.querySelector('main').removeChild(messageDomElement);
      document.removeEventListener('click', onClickAnywhere);
      document.removeEventListener('keydown', onEscClose);
      button.removeEventListener('keydown', onEnterClose);
    }

    // Закрывает сообщение по клику на любой области страницы
    function onClickAnywhere() {
      closeMessagePopup();
    }

    // Закрывает сообщение по Esc
    function onEscClose(evt) {
      if (evt.keyCode === window.keyCodeEsc) {
        closeMessagePopup();
      }
    }

    // Закрывает сообщение по Enter
    function onEnterClose(evt) {
      if (evt.keyCode === window.KEY_CODE_ENTER) {
        closeMessagePopup();
      }
    }

    var templateBlock = document.querySelector('#' + templateSelector).content;
    var messageElement = templateBlock.cloneNode(true);
    document.querySelector('main').appendChild(messageElement);
    document.addEventListener('click', onClickAnywhere);
    document.addEventListener('keydown', onEscClose);
    var buttonClassName = '.' + templateSelector + '__button';
    var button = document.querySelector(buttonClassName);
    button.addEventListener('click', onClickAnywhere);
  }

  function showSuccessMessage() {
    showMessage('success');
  }

  function showErrorMessage() {
    showMessage('error');
  }
  imgUploadInput.addEventListener('change', onChangeimageEditingForm);
})();
