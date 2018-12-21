'use strict';

(function () {
  window.sortPictures = function () {
    var filterButtons = document.querySelector('.img-filters__form');
    var pictures = document.querySelector('.pictures');
    var picturesArray = document.querySelectorAll('.picture');
    var picturesArrayClone = Array.from(picturesArray);

        function myRandom() {
          if (Math.random() > 0.5) {
            return 1;
          } else {
            return -1;
          }
        }

        // очищаем поле от изображений.
        function clearPictures() {
          for (var i = 0; i < picturesArray.length; i++) {
            picturesArray[i].remove();
          }
        }

        function onClickPopular() {
          clearPictures();
          for (var i = 0; i < picturesArrayClone.length; i++) {
            pictures.appendChild(picturesArrayClone[i]);
          }
        }

        function onClickNew() {
          clearPictures();
          picturesArray = picturesArray.sort(function (right, left) {
            return myRandom();
          });
          for (var j = 0; j < 10; j++) {
            pictures.appendChild(picturesArray[j]);
          }
        }

        function onClickDiscussed() {
          clearPictures();
          picturesArray = picturesArray.sort(function (right, left) {
            return left.querySelector('.picture__comments').textContent - right.querySelector('.picture__comments').textContent;
          });
          for (var i = 0; i < picturesArray.length; i++) {
            pictures.appendChild(picturesArray[i]);
          }
        }

    function onClickfilterButtons(clickEvt) {
      function makeButtonActive(target) {
        document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
      }
      var target = clickEvt.target;
      if (target.id === 'filter-popular' && target.classList.contains('img-filters__button--active') === false) {
        onClickPopular();
        makeButtonActive(target);
      }
      if (target.id === 'filter-new' && target.classList.contains('img-filters__button--active') === false) {
        onClickNew();
        makeButtonActive(target);
      }
      if (target.id === 'filter-discussed') {
        makeButtonActive(target);
        onClickDiscussed();
      }
    }
    filterButtons.addEventListener('click', onClickfilterButtons);
  };
})();
