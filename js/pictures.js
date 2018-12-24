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
    // var buttonLoaderComments = photosItem.querySelector('.social__comments-loader');

    // добавляет комментарии.
    /**
    *добавляет комментарий
    *@param {DOMObject} block  объект, которому добавляем комментарии
    */
    function changeInfo(block) {
      var description = block.querySelector('.social__caption');
      var commentsArray = photosItem.comments;
      var commentsList = block.querySelector('.social__comments');
      var comment = commentsList.querySelector('.social__comment');
      var buttonLoader = element.querySelector('.social__comments-loader');

      function addComment(i) {
        var commentElement = block.querySelector('.social__comment').cloneNode(true);
        commentsList.appendChild(commentElement);
        commentElement.setAttribute('style', '');
        commentElement.querySelector('.social__text').textContent = commentsArray[i].message;
        commentElement.querySelector('.social__picture').setAttribute('src', commentsArray[i].avatar);
      }
      var NUMBERS_COMMENTS = 5;
      if (NUMBERS_COMMENTS < commentsArray.length) {
        for (var i = 0; i < 5; i++) {
          addComment(i);
        }
      } else {
        for (var k = 0; k < commentsArray.length; k++) {
          addComment(k);
          buttonLoader.setAttribute('class', 'hidden');
        }
      }

      comment.setAttribute('style', 'display: none');
      description.textContent = photosItem.description;
      element.querySelector('.comments-count').textContent = element.querySelectorAll('.social__comment').length - 1;
      element.querySelector('.max-comments-count').textContent = commentsArray.length;


      function onClickLoader() {
        var commentCount = element.querySelectorAll('.social__comment').length - 1;
        if (commentCount + 5 < commentsArray.length) {
          for (var j = commentCount; j < commentCount + 5; j++) {
            addComment(j);
            element.querySelector('.comments-count').textContent = commentCount + 5;
          }
        } else {
          for (var q = commentCount; q < commentsArray.length; q++) {
            addComment(q);
            element.querySelector('.comments-count').textContent = commentsArray.length;
            buttonLoader.setAttribute('class', 'hidden');
          }
        }
      }
      buttonLoader.addEventListener('click', onClickLoader);
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
    *@param {HTMLObject} evt элемент на котором сработало событие
    */
    function onBigPictureKeyDownEsc(evt) {
      if (evt.keyCode === window.KEY_CODE_ESC) {
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
  *@param {HTMLObject} evt элемент на котором сработало событие
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
