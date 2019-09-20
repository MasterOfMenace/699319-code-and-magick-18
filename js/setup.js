'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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
  for (var i = 0; i < array.length; i++) {
    setupSimilarList.appendChild(createWizard(array[i]));
  }
}

function showElement(el) {
  document.querySelector(el).classList.remove('hidden');
}

var wizards = createArrayOfWizards(4);

showElement('.setup');

var setupSimilarList = document.querySelector('.setup-similar-list');

showElement('.setup-similar');

var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

renderWizards(wizards);
