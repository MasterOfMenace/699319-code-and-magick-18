'use strict';

(function () {
  var EVT_KEY_CODES = {
    ESC: 27,
    ENTER: 13,
  };

  var setup = document.querySelector('.setup');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupCloseButton = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');

  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', setupEscPressHandler);
  }

  function closeSetup() {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    document.removeEventListener('keydown', setupEscPressHandler);
  }

  function setupEscPressHandler(evt) {
    if (evt.keyCode === EVT_KEY_CODES.ESC) {
      closeSetup();
    }
  }

  function saveSuccessHandler() {
    setup.classList.add('hidden');
  }

  function saveErrorHandler(message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; box-sizing: border-box; margin: 0 auto; width: 100%; padding: 20px; position: absolute; top: 50%; background-color: red; color: white; text-align: center;';
    node.innerHTML = 'К сожалению, мы не можем отправить данные на сервер, <br>попробуйте сделать это позже<br>' + message;
    form.insertAdjacentElement('afterbegin', node);
  }

  setupOpenIcon.addEventListener('click', openSetup);

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === EVT_KEY_CODES.ENTER) {
      openSetup();
    }
  });

  setupCloseButton.addEventListener('click', closeSetup);

  setupCloseButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === EVT_KEY_CODES.ENTER) {
      closeSetup();
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', setupEscPressHandler);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', setupEscPressHandler);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), saveSuccessHandler, saveErrorHandler);
  });
})();


