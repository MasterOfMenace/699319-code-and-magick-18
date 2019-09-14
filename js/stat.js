// В новом файле js/stat.js определите функцию renderStatistics, которая будет являться методом объекта window, со следующими параметрами:
// ctx — канвас на котором рисуется игра.
// names — массив, с именами игроков прошедших уровень. Имя самого игрока — Вы. Массив имён формируется случайным образом.
// times — массив, по длине совпадающий с массивом names. Массив содержит время прохождения уровня соответствующего игрока из массива names. Время прохождения уровня задано в миллисекундах.
// Эта функция будет вызываться каждый раз когда игрок проходит уровень. Чтобы успешно пройти уровень, надо выстрелить фаерболом (клавиша Shift) в забор.
// При вызове этой функции на канвас ctx должны быть выведены следующие элементы:
// Белое облако с координатами [100, 10] высотой 270px и шириной 420px. Облако может быть как правильным многоугольником, нарисованным методом fillRect, так и неправильным нарисованным с помощью методов beginPath, moveTo, closePath, fill и других.
// Под облаком должна располагаться тень: многоугольник такой же формы, залитый цветом rgba(0, 0, 0, 0.7) (полупрозрачный чёрный), смещённый относительно белого на 10px вниз и вправо.
// На облаке должен быть отрисован текст сообщения ’Ура вы победили!\nСписок результатов:’ с помощью метода fillText. Текст должен быть набран шрифтом PT Mono размером 16px.

// После сообщения о победе должна располагаться гистограмма времён участников. Параметры гистограммы следующие:
// Высота гистограммы 150px.
// Ширина колонки 40px.
// Расстояние между колонками 50px.
// Цвет колонки игрока Вы rgba(255, 0, 0, 1).
// Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.

'use strict';

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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + 2 * GAP);

  // maxTime = BAR_HEIGHT
  // barHeight = (BAR_HEIGHT * times[i]) / maxTime

  var maxTime = findMax(times);

  for (var i = 0; i < names.length; i++) {
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
};
