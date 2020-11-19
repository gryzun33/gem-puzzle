import { changeOrder } from './changeorder';
import { addBestScore } from './addbestscore';
import { createBg } from './createbg';
import { changeIconSound } from './changeiconsound';
import { showDigits } from './showdigits';
import soundTink from '../../sounds/tink.wav';

const notes = document.createElement('div');
notes.classList.add('notes');
notes.innerHTML = `
<p>Инструкция для проверяющих: </p>
<p>1. Если вы хотите сохранить текущую игру, нажмите "Pause", а затем "Save Game"</p>
<p>2. Если вы хотите вернуться к сохраненной игре, нажмите "Saved Game"</p>
<p>3. Добавить цифры можно кликнув на <i class="material-icons">filter_1</i></p>
<br>`;
document.body.append(notes);

const wrapper = document.createElement('div');
const navWrapper = document.createElement('div');
const menu = document.createElement('ul');
const currentGame = document.createElement('div');
const container = document.createElement('div');
const puzzleBox = document.createElement('div');
const menuItemsNames = ['New game', 'Saved game', 'Best scores', 'Settings'];
const time = document.createElement('div');
const moves = document.createElement('div');
const pause = document.createElement('div');
const blackout = document.createElement('div');
const iconSound = document.createElement('div');
const digit = document.createElement('div');
const sound = document.createElement('audio');
sound.setAttribute('src', soundTink);
pause.classList.add('pause');
navWrapper.classList.add('nav-wrapper');
time.classList.add('timer');
moves.classList.add('moves');
blackout.classList.add('blackout');
iconSound.classList.add('icon-sound');
digit.classList.add('digit');

const settingsField = document.createElement('div');
settingsField.classList.add('settings-hide');
settingsField.innerHTML = `
  <div class="field-size">
    <div>Field size</div>
    <br>
    <form>
      <select id="select" size="1">
        <option value="3х3">3х3</option>
        <option value="4x4">4х4</option>
        <option value="5x5">5х5</option>
        <option value="6x6">6х6</option>
        <option value="7x7">7х7</option>
        <option value="8x8">8х8</option>
      </select>
    </form>
  </div>  
  <div id="start">Start new game</div> 
  <div id="back1">Back and continue</div>`;

const pauseField = document.createElement('div');
pauseField.classList.add('pausefiled', 'pause-hide');
pauseField.innerHTML = `<div id="saveGameBtn">Save Game</div>
<div id="back2">Back and Continue</div>`;

const gameOver = document.createElement('div');
gameOver.classList.add('congrat-hide');

const bestField = document.createElement('div');
bestField.classList.add('records-hide');
bestField.innerHTML = `<div id="records"></div>
<div id="back3">Back and Continue</div>`;

moves.classList.add('moves');
wrapper.classList.add('wrapper');
menu.classList.add('menu');
currentGame.classList.add('current');
puzzleBox.classList.add('puzzle-box');
blackout.classList.add('blackout-show');
container.classList.add('container');
container.append(blackout);
container.append(puzzleBox);
container.append(settingsField);
container.append(pauseField);
container.append(gameOver);
container.append(bestField);

const cellCount = {
  '3х3': { number: 9, width: 33.333 },
  '4x4': { number: 16, width: 25 },
  '5x5': { number: 25, width: 20 },
  '6x6': { number: 36, width: 16.666 },
  '7x7': { number: 49, width: 14.285 },
  '8x8': { number: 64, width: 12.5 },
};

let scores = [];
// let totalTime;
// let score;
let count = cellCount['4x4'].number;
let widthCell = cellCount['4x4'].width;
let currentCellCount = '4x4';
let movesCount = 0;

time.innerHTML = 'Time 00 : 00';
moves.innerHTML = `Moves ${movesCount}`;
pause.innerHTML = 'Pause';
iconSound.innerHTML = '<i class="material-icons">volume_off</i>';
digit.innerHTML = '<i class="material-icons">filter_1</i>';

currentGame.append(time);
currentGame.append(moves);
currentGame.append(pause);
currentGame.append(digit);
currentGame.append(iconSound);

menuItemsNames.forEach((elem) => {
  const item = document.createElement('li');
  item.classList.add('menu-item');
  item.textContent = elem;
  menu.append(item);
});

const newGameBtn = menu.querySelector('li:nth-child(1)');
const savedGameBtn = menu.querySelector('li:nth-child(2)');
const bestScoresBtn = menu.querySelector('li:nth-child(3)');
const settingsBtn = menu.querySelector('li:nth-child(4)');

navWrapper.append(menu);
navWrapper.append(currentGame);
wrapper.append(navWrapper);
wrapper.append(container);
document.body.append(wrapper);
document.body.append(sound);

let randomArray;
let currentNumber;
let currentChip;
let currentOrder;
let chips;
let empty;
let orderMemory;
let puzzle;
let topMemory;
let leftMemory;
let bottomMemory;
let rightMemory;
let imgNumberInRow;
let imgNumberOfRow;
let bgImageNumber;
let bgSize;
let widthBgCell;
const bgPosition = [];

let lastWindowWidth = window.innerWidth;
let newWindowWidth;
let timerId;
let min = 0;
let sec = 0;
let currMin;
let currSec;
let enabled = true;
let gameCurrent = false;

const saveGameBtn = document.getElementById('saveGameBtn');
const select = document.getElementById('select');
const records = document.getElementById('records');
const start = document.getElementById('start');
const back1 = document.getElementById('back1');
const back2 = document.getElementById('back2');
const back3 = document.getElementById('back3');

changeIconSound();

function createNewGame(n) {
  clearInterval(timerId);
  gameCurrent = true;
  currentCellCount = `${Math.sqrt(n)}x${Math.sqrt(n)}`;
  blackout.classList.add('blackout-hide');
  blackout.classList.remove('blackout-show');
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  bestField.classList.remove('records-show');
  bestField.classList.add('records-hide');
  gameOver.classList.remove('congrat-show');
  gameOver.classList.add('congrat-hide');
  puzzleBox.innerHTML = '';
  time.innerHTML = 'Time 00 : 00';
  movesCount = 0;
  min = 0;
  sec = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  createBg(bgSize, widthBgCell, count, widthCell,
    imgNumberInRow, imgNumberOfRow, bgPosition);
  bgImageNumber = Math.ceil(Math.random() * 150);
  bgSize = getComputedStyle(container).width;
  randomArray = [];
  while (randomArray.length < n) {
    currentNumber = Math.floor((Math.random() * n));
    if (!randomArray.includes(currentNumber)) {
      randomArray.push(currentNumber);
    }
  }

  currentOrder = 1;
  for (let i = 0; i < randomArray.length; i += 1) {
    currentChip = document.createElement('div');
    if (randomArray[i] !== 0) {
      currentChip.classList.add('chip');
      currentChip.textContent = randomArray[i];
      currentChip.style.order = currentOrder;
      currentOrder += 1;
    } else {
      currentChip.classList.add('empty');
      currentChip.style.order = currentOrder;
      currentOrder += 1;
    }

    currentChip.style.width = `${widthCell}%`;
    currentChip.style.height = `${widthCell}%`;
    currentChip.style.top = `${Math.floor((i / Math.sqrt(n))) * widthCell}%`;
    currentChip.style.left = `${(i % Math.sqrt(n)) * widthCell}%`;
    currentChip.style.bottom = `${parseFloat(currentChip.style.top) + widthCell}%`;
    currentChip.style.right = `${parseFloat(currentChip.style.left) + widthCell}%`;
    if (randomArray[i] !== 0) {
      currentChip.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`;
      currentChip.style.backgroundSize = `${bgSize} ${bgSize}`;
      currentChip.style.backgroundPosition = bgPosition[randomArray[i] - 1];
    }
    puzzleBox.append(currentChip);
  }

  chips = puzzleBox.querySelectorAll('.chip');
  empty = puzzleBox.querySelector('.empty');
  checkForSolve(chips, empty);
  showDigits(chips);
}

function runTimer() {
  timerId = setInterval(() => {
    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
    currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
    time.innerHTML = `Time ${currMin} : ${currSec}`;
  }, 1000);
}

function checkForSolve(cards, empt) {
  let counter = 0;
  for (let i = 0; i < cards.length - 1; i += 1) {
    for (let j = i + 1; j < cards.length; j += 1) {
      if (+cards[i].innerHTML > +cards[j].innerHTML) {
        counter += 1;
      }
    }
  }
  const rowEmpty = Math.ceil((+empt.style.order) / Math.sqrt(count));

  if (Math.sqrt(count) % 2 === 0) {
    counter += rowEmpty;
    if (counter % 2 === 0) {
      runTimer();
      chipsHandler();
    } else {
      createNewGame(count);
    }
  } else if (counter % 2 === 0) {
    runTimer();
    chipsHandler();
  } else {
    createNewGame(count);
  }
}

function chipsHandler() {
  chips.forEach((chip) => {
    chip.addEventListener('mousedown', (e) => {
      if (enabled) {
        orderMemory = chip.style.order;
        topMemory = chip.style.top;
        bottomMemory = chip.style.bottom;
        leftMemory = chip.style.left;
        rightMemory = chip.style.right;
        const startX = e.pageX;
        const startY = e.pageY;
        const shiftX = e.pageX - chip.getBoundingClientRect().left;
        const shiftY = e.pageY - chip.getBoundingClientRect().top;
        if ((chip.style.top === empty.style.bottom && chip.style.left === empty.style.left)
        || (chip.style.bottom === empty.style.top && chip.style.left === empty.style.left)
        || (chip.style.left === empty.style.right && chip.style.top === empty.style.top)
        || (chip.style.right === empty.style.left && chip.style.top === empty.style.top)) {
          if (iconSound.innerHTML === '<i class="material-icons">volume_up</i>') {
            sound.currentTime = 0;
            sound.play();
          }
          enabled = false;
          chip.style.zIndex = 100;
          moveAt(e.pageX, e.pageY);
          document.addEventListener('mousemove', onMouseMove);
        }
        function moveAt(pageX, pageY) {
          chip.style.left = `${pageX - shiftX - puzzleBox.getBoundingClientRect().left}px`;
          chip.style.top = `${pageY - shiftY - puzzleBox.getBoundingClientRect().top}px`;
        }

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        chip.onmouseup = (ev) => {
          document.removeEventListener('mousemove', onMouseMove);
          chip.onmouseup = null;
          if ((ev.pageX - startX) === 0 && (ev.pageY - startY) === 0) {
            if (topMemory === empty.style.bottom && leftMemory === empty.style.left) {
              movesCount += 1;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-top');
              empty.classList.add('to-bottom');
              setTimeout(() => {
                changeOrder(chip, orderMemory, topMemory, bottomMemory, leftMemory,
                  rightMemory);
                enabled = true;
                chip.classList.remove('to-top');
                empty.classList.remove('to-bottom');
                isEnd(chips);
              }, 300);
            }
            if (bottomMemory === empty.style.top && leftMemory === empty.style.left) {
              movesCount += 1;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-bottom');
              empty.classList.add('to-top');
              setTimeout(() => {
                changeOrder(chip, orderMemory, topMemory, bottomMemory, leftMemory,
                  rightMemory);
                enabled = true;
                chip.classList.remove('to-bottom');
                empty.classList.remove('to-top');
                isEnd(chips);
              }, 300);
            }
            if (leftMemory === empty.style.right && topMemory === empty.style.top) {
              movesCount += 1;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-left');
              empty.classList.add('to-right');
              setTimeout(() => {
                changeOrder(chip, orderMemory, topMemory, bottomMemory, leftMemory,
                  rightMemory);
                enabled = true;
                chip.classList.remove('to-left');
                empty.classList.remove('to-right');
                isEnd(chips);
              }, 300);
            }
            if (rightMemory === empty.style.left && topMemory === empty.style.top) {
              movesCount += 1;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-right');
              empty.classList.add('to-left');
              setTimeout(() => {
                changeOrder(chip, orderMemory, topMemory, bottomMemory, leftMemory,
                  rightMemory);
                enabled = true;
                chip.classList.remove('to-right');
                empty.classList.remove('to-left');
                isEnd(chips);
              }, 300);
            }
          } else if ((topMemory === empty.style.bottom && leftMemory === empty.style.left)
           || (bottomMemory === empty.style.top && leftMemory === empty.style.left)
           || (leftMemory === empty.style.right && topMemory === empty.style.top)
           || (rightMemory === empty.style.left && topMemory === empty.style.top)) {
            movesCount += 1;
            moves.innerHTML = `Moves ${movesCount}`;
            changeOrder(chip, orderMemory, topMemory, bottomMemory, leftMemory,
              rightMemory);
            enabled = true;
            isEnd(chips);
          }
        };
      }
    });
  });
}

function saveGame() {
  puzzle = {
    'puzzle-box': puzzleBox.innerHTML,
    'puzzle-min': min,
    'puzzle-sec': sec,
    'puzzle-currentMoves': movesCount,
  };
  localStorage.setItem('savedPuzzle', JSON.stringify(puzzle));
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  blackout.classList.remove('blackout-hide');
  blackout.classList.add('blackout-show');
  movesCount = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  min = 0;
  sec = 0;
  currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
  currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
  time.innerHTML = `Time ${currMin} : ${currSec}`;
}

function isEnd(cards) {
  for (let i = 0; i < cards.length; i += 1) {
    if (+cards[i].style.order !== +cards[i].innerHTML) {
      return;
    }
  }
  clearInterval(timerId);
  gameOver.innerHTML = `You solved gem-puzzle in ${currMin} : ${currSec} and ${movesCount} moves!!!`;
  gameOver.classList.add('congrat-show');
  gameOver.classList.remove('congrat-hide');
  gameOver.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`;
  gameOver.style.backgroundSize = `${bgSize} ${bgSize}`;
  gameCurrent = false;
  addBestScore(sec, min, currMin, currSec, movesCount, scores);
}

newGameBtn.addEventListener('click', () => {
  createNewGame(count);
});

pause.addEventListener('click', () => {
  pauseField.classList.add('pause-show');
  pauseField.classList.remove('pause-hide');
  clearInterval(timerId);
});

saveGameBtn.addEventListener('click', () => {
  clearInterval(timerId);
  saveGame();
});

savedGameBtn.addEventListener('click', () => {
  if (localStorage.getItem('savedPuzzle')) {
    puzzle = JSON.parse(localStorage.getItem('savedPuzzle'));
    puzzleBox.innerHTML = puzzle['puzzle-box'];
    movesCount = puzzle['puzzle-currentMoves'];
    moves.innerHTML = `Moves ${movesCount}`;
    min = puzzle['puzzle-min'];
    sec = puzzle['puzzle-sec'];
    blackout.classList.add('blackout-hide');
    blackout.classList.remove('blackout-show');
    settingsField.classList.remove('settings-show');
    settingsField.classList.add('settings-hide');
    pauseField.classList.remove('pause-show');
    pauseField.classList.add('pause-hide');
    bestField.classList.remove('records-show');
    bestField.classList.add('records-hide');
    gameOver.classList.remove('congrat-show');
    gameOver.classList.add('congrat-hide');
    chips = puzzleBox.querySelectorAll('.chip');
    empty = puzzleBox.querySelector('.empty');
    clearInterval(timerId);
    runTimer();
    chipsHandler();
  }
});

back1.addEventListener('click', () => {
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  if (gameCurrent) {
    runTimer();
  }
});

back2.addEventListener('click', () => {
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  if (gameCurrent) {
    runTimer();
  }
});

back3.addEventListener('click', () => {
  bestField.classList.remove('records-show');
  bestField.classList.add('records-hide');
  if (gameCurrent) {
    runTimer();
  }
});

start.addEventListener('click', () => {
  createNewGame(count);
});

settingsBtn.addEventListener('click', () => {
  settingsField.classList.add('settings-show');
  settingsField.classList.remove('settings-hide');
  gameOver.classList.remove('congrat-show');
  gameOver.classList.add('congrat-hide');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  bestField.classList.add('records-hide');
  bestField.classList.remove('records-show');
  select.value = currentCellCount;
  clearInterval(timerId);
});

select.addEventListener('change', () => {
  count = cellCount[select.value].number;
  currentCellCount = select.value;
  widthCell = cellCount[currentCellCount].width;
});

bestScoresBtn.addEventListener('click', () => {
  clearInterval(timerId);
  bestField.classList.add('records-show');
  bestField.classList.remove('records-hide');
  gameOver.classList.add('congrat-hide');
  gameOver.classList.remove('congrat-show');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  if (localStorage.getItem('bestScores')) {
    records.innerHTML = '';
    scores = JSON.parse(localStorage.getItem('bestScores'));
    for (let i = 0; i < scores.length; i += 1) {
      const record = document.createElement('div');
      record.innerHTML = `${i + 1}. time: ${scores[i]['score-time']}   moves: ${scores[i]['score-moves']}`;
      records.append(record);
    }
  } else {
    records.innerHTML = 'No best scores';
  }
});

window.addEventListener('resize', () => {
  newWindowWidth = window.innerWidth;
  if (lastWindowWidth > 500 && newWindowWidth > 500) {
    return;
  }
  if (lastWindowWidth <= 500 && newWindowWidth <= 500) {
    return;
  }
  const elements = puzzleBox.querySelectorAll('div');
  bgSize = getComputedStyle(container).width;
  widthBgCell = (widthCell / 100) * parseInt(bgSize, 10);
  for (let i = 0; i < count; i += 1) {
    imgNumberInRow = i % Math.sqrt(count);
    imgNumberOfRow = Math.floor(i / Math.sqrt(count));
    bgPosition[i] = `-${imgNumberInRow * widthBgCell}px -${imgNumberOfRow * widthBgCell}px`;
  }
  for (let i = 0; i < count; i += 1) {
    if (parseInt(elements[i].innerText, 10) !== 0) {
      elements[i].style.backgroundSize = `${bgSize} ${bgSize}`;
      elements[i].style.backgroundPosition = bgPosition[parseInt(elements[i].innerText, 10) - 1];
    }
  }
  lastWindowWidth = newWindowWidth;
});
