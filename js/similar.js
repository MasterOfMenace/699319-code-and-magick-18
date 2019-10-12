'use strict';

(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var interval = 500;
  var timeout;

  function debounce(callback) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(callback, interval);
  }

  window.wizard.onEyesColorChange = function (color) {
    eyesColor = color;
    debounce(updateWizards);
  };

  window.wizard.onCoatColorChange = function (color) {
    coatColor = color;
    debounce(updateWizards);
  };

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function updateWizards() {
    window.render.renderWizard(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function showElement(el) {
    document.querySelector(el).classList.remove('hidden');
  }

  function loadSuccessHandler(data) {
    wizards = data;
    updateWizards();
  }

  function loadErrorHandler(message) {
    showElement('.setup-similar');
    setupSimilarList.textContent = 'К сожалению, мы не можем сейчас показать похожих персонажей ' + message;
    setupSimilarList.style.color = 'white';
    setupSimilarList.style.textAlign = 'center';
  }

  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();
