'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  /**
  *При нажатии на маленькое изображение откроется полноценая картинка
  *@param {HTMLobject} evt элемент на котором сработало событие
  */
  function onClickPhoto(evt) {
    var target = (evt.target);
    if (target.getAttribute('class') === ('picture__img')) {
      var id = target.getAttribute('value');
      if (id !== 'undefined' && id !== null) {
        window.photos[id].fullSizeImage(id);
      }
    }
  }
  pictures.addEventListener('click', onClickPhoto);
})();
