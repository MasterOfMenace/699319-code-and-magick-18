'use strict';

(function () {
  var USER_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var USER_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var USER_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var EVT_KEY_CODES = {
    ESC: 27,
    ENTER: 13,
  };

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var setup = document.querySelector('.setup');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupCloseButton = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballInput = fireball.querySelector('input[type=hidden]');

  var form = document.querySelector('.setup-wizard-form');

  function getRandomElement(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  function createWizard(data) {
    var wizard = template.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = data.name;
    wizard.querySelector('.wizard-coat').style = 'fill: ' + data.colorCoat;
    wizard.querySelector('.wizard-eyes').style = 'fill: ' + data.colorEyes;
    return wizard;
  }

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

  function changeColor(arr, elem) {
    var dataColor = +elem.dataset.color ? +elem.dataset.color : 0;
    var newColor;

    dataColor = dataColor === arr.length - 1 ? 0 : dataColor + 1;
    newColor = arr[dataColor];
    elem.dataset.color = dataColor;
    return newColor;
  }

  function loadSuccessHandler(data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(createWizard(getRandomElement(data)));
    }
    setupSimilarList.appendChild(fragment);
    showElement('.setup-similar');
  }

  function loadErrorHandler(message) {
    showElement('.setup-similar');
    setupSimilarList.textContent = 'К сожалению, мы не можем сейчас показать похожих персонажей ' + message;
    setupSimilarList.style.color = 'white';
    setupSimilarList.style.textAlign = 'center';
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

  function showElement(el) {
    document.querySelector(el).classList.remove('hidden');
  }

  wizardCoat.addEventListener('click', function () {
    var newColor = changeColor(USER_COAT_COLORS, wizardCoat);
    wizardCoat.style.fill = newColor;
    wizardCoatInput.value = newColor;
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = changeColor(USER_EYES_COLORS, wizardEyes);
    wizardEyes.style.fill = newColor;
    wizardEyesInput.value = newColor;
  });

  fireball.addEventListener('click', function () {
    var newColor = changeColor(USER_FIREBALL_COLORS, fireball);
    fireball.style.backgroundColor = newColor;
    fireballInput.value = newColor;
  });

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

  window.backend.load(loadSuccessHandler, loadErrorHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), saveSuccessHandler, saveErrorHandler);
  });
})();


