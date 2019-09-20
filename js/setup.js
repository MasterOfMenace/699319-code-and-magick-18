'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var wizards = [
  {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  },
  {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  },
  {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  },
  {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  }
];

function getRandomElement(array) {
  var index = Math.floor(Math.random() * array.length); /* Math.random() * (max - min + 1) + min) */
  return array[index];
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

var setupSimilarList = document.querySelector('.setup-similar-list');
document.querySelector('.setup-similar').classList.remove('hidden');

var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

renderWizards(wizards);
