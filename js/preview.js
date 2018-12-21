'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var picture = document.querySelector('#picture').content.querySelector('.picture');

  function fillPictures(array) {
    for (var i = 0; i < array.length; i++) {
      var photo = array[i];
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

  function onSuccess(wizards) {

    function onClickPhoto(evt) {
      window.openingBigPicture(evt, wizards);
    }

    fillPictures(wizards);
    pictures.addEventListener('click', onClickPhoto);
    window.sortPictures();
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; padding: 20px 0; border:solid indigo 2px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load(onSuccess, onError);

})();
