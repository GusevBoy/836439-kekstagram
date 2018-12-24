'use strict';

(function () {
  window.KEY_CODE_ESC = 27;
  window.KEY_CODE_ENTER = 13;
  window.pictures = document.querySelector('.pictures');

  /**
  *опряделяет процентное соотношение относително промежутка между минимальным значением и максимальным;
  *@param {number} min минимально значене
  *@param {number} max максимальное значение
  *@param {number} percent   процент
  *@return {number} ratio соотношение.
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
})();
