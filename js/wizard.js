'use strict';

window.wizard = (function () {
  var USER_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var USER_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var USER_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.wizard-coat');
  var wizardCoatInput = document.querySelector('input[name=coat-color]');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name=eyes-color]');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballInput = fireball.querySelector('input[type=hidden]');
  // var coatColor;
  // var eyesColor;
  // var fireballColor;

  var wizard = {
    onCoatColorChange: function () {},
    onEyesColorChange: function () {},
  };

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
    // coatColor = newColor;
    // updateWizards();
    wizard.onCoatColorChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = changeColor(USER_EYES_COLORS, wizardEyes);
    wizardEyes.style.fill = newColor;
    wizardEyesInput.value = newColor;
    // eyesColor = newColor;
    // updateWizards();
    wizard.onEyesColorChange(newColor);
  });

  fireball.addEventListener('click', function () {
    var newColor = changeColor(USER_FIREBALL_COLORS, fireball);
    fireball.style.backgroundColor = newColor;
    fireballInput.value = newColor;
    // fireballColor = newColor;
  });

  return wizard;
})();
