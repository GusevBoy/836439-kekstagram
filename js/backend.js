'use strict';

(function () {
  window.BackendModule = {};
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;
  var SERVER_ANSWER_WAIT = 10000; // 10 секунд

  /**
   * Конфигурирует xhr
   * @param {Object} xhr  - XmlHTTPRequest
   * @param {function} onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса.
   * @param {function} onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
   */
  function configureXhr(xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = SERVER_ANSWER_WAIT;
  }
  /**
  * загружает данные с сервера
  * @param {function} onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса.
  * @param {function} onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
  */
  window.BackendModule.loadPictures = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    configureXhr(xhr, onLoad, onError);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  /**
  * отправляет данные на сервер.
  * @param {Object} data — объект FormData, который содержит данные формы, которые будут отправлены на сервер
  * @param {function} onLoad — функция обратного вызова, которая срабатывает при успешном выполнении запроса
  * @param {function} onError — функция обратного вызова, которая срабатывает при неуспешном выполнении запроса.
  */
  window.BackendModule.uploadPictures = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    configureXhr(xhr, onLoad, onError);
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };
})();
