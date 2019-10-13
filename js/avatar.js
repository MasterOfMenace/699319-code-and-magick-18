'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('input[type=file]');
  var userAvatar = document.querySelector('.setup-user-pic');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userAvatar.src = reader.result;
        setupOpenIcon.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
