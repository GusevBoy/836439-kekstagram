'use strict';

/**
 * Устранение дребезга.
 */
(function () {
  window.ModuleDebounce = {};
  var DEBOUNCE_INTERVAL = 500; // ms
  window.ModuleDebounce.debounce = function (callBack) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        callBack.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
