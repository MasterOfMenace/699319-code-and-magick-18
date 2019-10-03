'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 110;
  var CLOUD_Y = 10;

  // отступ между облаком и тенью
  var CLOUD_GAP = 10;
  // отступ внутри облака между элементами
  var GAP = 20;
  // отступ для текста, равен его высоте
  var TEXT_GAP = 16;
  var BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var STAT_Y = CLOUD_HEIGHT - GAP;
  var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function findMax(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return Math.floor(max);
  }

  function renderBar(ctx, times, i, maxTime, color) {
    ctx.fillStyle = color;
    ctx.fillRect(CLOUD_X + GAP + i * (BAR_WIDTH + BAR_GAP), STAT_Y - TEXT_GAP - (BAR_HEIGHT * Math.floor(times[i])) / maxTime, BAR_WIDTH, (BAR_HEIGHT * Math.floor(times[i])) / maxTime);
  }

  function calculateRandomSaturation(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function renderColumn(ctx, names, times, i, maxTime) {
    ctx.fillText(names[i], CLOUD_X + GAP + i * (BAR_WIDTH + BAR_GAP), STAT_Y);
    if (names[i] === 'Вы') {
      renderBar(ctx, times, i, maxTime, PLAYER_BAR_COLOR);
    } else {
      var barColor = 'hsl(240, ' + calculateRandomSaturation(0, 100) + '%, ' + '50%)';
      renderBar(ctx, times, i, maxTime, barColor);
    }
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + i * (BAR_WIDTH + BAR_GAP), STAT_Y - TEXT_GAP - (BAR_HEIGHT * Math.floor(times[i])) / maxTime - TEXT_GAP);
  }

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = '#000000';
    ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
    ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + 2 * GAP);

    var maxTime = findMax(times);

    for (var i = 0; i < names.length; i++) {
      renderColumn(ctx, names, times, i, maxTime);
    }
  };
})();
