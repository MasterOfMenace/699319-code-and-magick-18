'use strict';

window.render = (function () {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  function showElement(el) {
    document.querySelector(el).classList.remove('hidden');
  }

  function createWizard(data) {
    var wizard = template.cloneNode(true);
    wizard.querySelector('.setup-similar-label').textContent = data.name;
    wizard.querySelector('.wizard-coat').style = 'fill: ' + data.colorCoat;
    wizard.querySelector('.wizard-eyes').style = 'fill: ' + data.colorEyes;
    return wizard;
  }

  function renderWizard(data) {
    var WIZARDS_COUNT = data.length > 4 ? 4 : data.length;
    var fragment = document.createDocumentFragment();
    setupSimilarList.innerHTML = '';
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(createWizard(data[i]));
    }
    setupSimilarList.appendChild(fragment);
    showElement('.setup-similar');
  }

  return {
    renderWizard: renderWizard,
  };
})();
