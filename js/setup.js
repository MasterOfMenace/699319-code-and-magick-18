'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var wizards = createArrayOfWizards(4);

var setupSimilarList = document.querySelector('.setup-similar-list');

var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomElement(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}

function createRandomWizard() {
  var wizard = {};
  wizard.name = getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES);
  wizard.coatColor = getRandomElement(COAT_COLORS);
  wizard.eyesColor = getRandomElement(EYES_COLORS);
  return wizard;
}

function createArrayOfWizards(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push(createRandomWizard());
  }
  return array;
}

function createWizard(data) {
  var wizard = template.cloneNode(true);
  wizard.querySelector('.setup-similar-label').textContent = data.name;
  wizard.querySelector('.wizard-coat').style = 'fill: ' + data.coatColor;
  wizard.querySelector('.wizard-eyes').style = 'fill: ' + data.eyesColor;
  return wizard;
}

function renderWizards(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    var wizard = createWizard(array[i]);
    fragment.appendChild(wizard);
  }

  setupSimilarList.appendChild(fragment);
}

function showElement(el) {
  document.querySelector(el).classList.remove('hidden');
}

showElement('.setup-similar');

renderWizards(wizards);

// код задания 4 раздела

var USER_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var USER_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var USER_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

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


function openSetup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', setupEscPressHandler);
}

function closeSetup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', setupEscPressHandler);
}

function setupEscPressHandler(evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
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
  if (evt.keyCode === ENTER_KEY_CODE) {
    openSetup();
  }
});

setupCloseButton.addEventListener('click', closeSetup);

setupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeSetup();
  }
});

userNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', setupEscPressHandler);
});

userNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', setupEscPressHandler);
});


