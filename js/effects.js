'use strict';

(function () {
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
  * Изменяет значение атрибута value у объекта .scale__control--value
  * Так же добавляет атрибут style со значением 'style', 'transform: scale(value) объекту .effect-image-preview
  *@param {HTMLobject} clickEvt объект события
  */
  function onClicksButtonsScale(clickEvt) {
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
})();
