'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  for (var i = 0; i < window.photos.length; i++) {
    var photo = window.photos[i];
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
})();
