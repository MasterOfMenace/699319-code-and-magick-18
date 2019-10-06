'use strict';

window.backend = (function () {
  var XHR_SUCCESS_STATUS = 200;
  var XHR_TIMEOUT = 10000;

  function loadHandler(xhr, onLoad, onError) {
    if (xhr.status === XHR_SUCCESS_STATUS) {
      onLoad(xhr.response);
    } else {
      onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
    }
  }

  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      loadHandler(xhr, onLoad, onError);
    }
    );

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.send();

  }

  function save(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      loadHandler(xhr, onLoad, onError);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  return {
    load: load,
    save: save,
  };
})();
