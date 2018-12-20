'use strict';

(function () {
  /**
  *Создает блок bigPicture, изменяет значения лайков и колличество комментариев
  *@param {number} number  номер фотографии
  *@param {array} array массив объектов
  */
  function fullSizeImage(number, array) {
    var photosItem = array[number];
    var bigPicture = document.querySelector('#big-picture').content.querySelector('.big-picture');
    var element = bigPicture.cloneNode(true);
    var bigPictureImg = element.querySelector('.big-picture__img').querySelector('img');
    var bigPictureCancel = element.querySelector('.big-picture__cancel');
    var likesCount = element.querySelector('.likes-count');

    // добавляет комментарии
    function changeInfo(block) {
      var description = block.querySelector('.social__caption');
      var commentsArray = photosItem.comments;
      var comentsList = block.querySelector('.social__comments');
      var comment = comentsList.querySelector('.social__comment');
      var comentsCount = block.querySelector('.social__comment-count');
      comment.querySelector('.social__text').textContent = commentsArray[0].message;
      comment.querySelector('.social__picture').setAttribute('src', commentsArray[0].avatar);
      for (var i = 1; i < commentsArray.length; i++) {
        var commentElement = block.querySelector('.social__comment').cloneNode(true);
        comentsList.appendChild(commentElement);
        commentElement.querySelector('.social__text').textContent = commentsArray[i].message;
        commentElement.querySelector('.social__picture').setAttribute('src', commentsArray[i].avatar);
      }
      description.textContent = photosItem.description;
      comentsCount.textContent = (commentsArray.length + ' из ' + commentsArray.length + ' комментариев');
    }
    changeInfo(element);
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
    document.querySelector('main').appendChild(element);
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onBigPictureKeyDownEsc);
    likesCount.textContent = photosItem.likes;
  }

  /**
  *При нажатии на маленькое изображение откроется полноценая картинка
  *@param {HTMLobject} evt элемент на котором сработало событие
  *@param {Array} array массив объектов
  */
  window.openingBigPicture = function (evt, array) {
    var target = (evt.target);
    if (target.getAttribute('class') === ('picture__img')) {
      var id = target.getAttribute('value');
      if (id !== 'undefined' && id !== null) {
        fullSizeImage(id, array);
      }
    }
  };

})();
