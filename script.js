'use strict';

// -------------------------------------------------------------------------------------//
// GLOBAL VARIABLES //
// -------------------------------------------------------------------------------------//

const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const currentScore0 = document.querySelector('#current-score-0');
const currentScore1 = document.querySelector('#current-score-1');
const currentBox0 = document.querySelector('.current-box-0');
const currentBox1 = document.querySelector('.current-box-1');

const menu = document.querySelector('.menu');
const buttons = document.querySelectorAll('.btn');
const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');

const winnerImg0 = document.querySelector('.winner-img-0');
const winnerImg1 = document.querySelector('.winner-img-1');

let winningScore = 5;
let scores, currentScore, playerActive, playing, executing;

// -------------------------------------------------------------------------------------//
// FUNCTIONS //
// -------------------------------------------------------------------------------------//

// TRANSITION TO 'Opacity: 0'
const fadeOut = element => element.classList.add('hidden');

// TRANSITION TO 'Opacity: 1'
const fadeIn = element => element.classList.remove('hidden');

// DISPLAY: NONE
const removeElement = element => element.classList.add('removed');

// DISPLAY
const addElement = element => element.classList.remove('removed');

// ROTATING
const rotate = element => element.classList.add('rotating');

// REMOVE CLASS 'rotating'
const removeRotate = element => element.classList.remove('rotating');

// START ANIMATION
const animate = element => element.classList.add('animated');

// REMOVE CLASS 'animated'
const removeAnimate = element => element.classList.remove('animated');

// ANIMATIONS ON REFRESH --> players SLIDE IN, dice ROLL
const animation = function () {
  animate(player0);
  animate(player1);
  animate(diceEl);

  setTimeout(function () {
    removeAnimate(player0);
    removeAnimate(player1);
    removeAnimate(diceEl);
  }, 3000);
};

// DICE CHANGING NUMBERS ON SITE REFRESH  (1-6, 1 is in html, so here 2-6)
const diceStartShowHide = function () {
  diceEl.src = 'img/dice-1.svg';
  const dices = [2, 3, 4, 5, 6];
  let dicePositionNumber = 0;

  const intervalID = setInterval(function () {
    if (dicePositionNumber < dices.length) {
      diceEl.src = `img/dice-${dices[dicePositionNumber]}.svg`;
      dicePositionNumber++;
    } else {
      // Hide dice after rotating css animation is done (2.5s), but here only 2s (this timing is visually better)
      fadeOut(diceEl);
      clearInterval(intervalID);
    }
  }, 2000 / dices.length);
};

// HIDE BTNS ON SITE REFRESH, THEN FADE IN
const showBtnsOnRefresh = function () {
  fadeOut(menu);
  removeElement(menu);
  buttons.forEach(btn => {
    fadeOut(btn);
    removeElement(btn);
  });

  // First add element, but still with opacity 0. Set 'playing = false' to make btns inactive while invisible
  setTimeout(function () {
    playing = false;
    addElement(menu);
    buttons.forEach(btn => {
      addElement(btn);
    });
  }, 2000);
  // Then transition to opacity 1. Set 'playing = true'
  setTimeout(function () {
    playing = true;
    fadeIn(menu);
    buttons.forEach(btn => {
      fadeIn(btn);
    });
  }, 2500);
};

// STARTING CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;
  executing = false;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');

  fadeIn(score0);
  fadeIn(score1);
  fadeIn(currentBox0);
  fadeIn(currentBox1);

  newGameBtn.classList.remove('highlighted');

  // Fade out
  fadeOut(winnerImg0);
  fadeOut(winnerImg1);
  setTimeout(function () {
    // Then remove
    removeElement(winnerImg0);
    removeElement(winnerImg1);
  }, 500);
};

// SWITCH PLAYER
const switchPlayer = function () {
  document.querySelector(`#current-score-${playerActive}`).textContent = 0;
  currentScore = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

// -------------------------------------------------------------------------------------//
// FUNCTIONALITIES //
// -------------------------------------------------------------------------------------//

// INITIAL
animation();
diceStartShowHide();
showBtnsOnRefresh();
init();

// ROLL DICE BTN FUNCTIONALITY
rollDiceBtn.addEventListener('click', function () {
  if (playing && !executing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    fadeIn(diceEl);
    rotate(diceEl);
    diceEl.src = 'img/dice-0.svg';

    setTimeout(function () {
      removeRotate(diceEl);
      diceEl.src = `img/dice-${diceNum}.svg`;
    }, 700);

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current-score-${playerActive}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD BTN FUNCTIONALITY
holdBtn.addEventListener('click', function () {
  if (playing && !executing) {
    let scoreActive = document.querySelector(`#score-${playerActive}`);
    let winnerImg = document.querySelector(`.winner-img-${playerActive}`);

    scores[playerActive] += currentScore;
    scoreActive.textContent = scores[playerActive];

    if (scores[playerActive] >= winningScore) {
      playing = false;
      fadeOut(diceEl);
      fadeOut(holdBtn);
      fadeOut(rollDiceBtn);
      fadeOut(scoreActive);

      newGameBtn.classList.add('highlighted');

      document
        .querySelector(`.player-${playerActive}`)
        .classList.add('player-winner');

      fadeOut(document.querySelector(`.current-box-${playerActive}`));

      // First add img, but still with opacity 0
      addElement(winnerImg);
      // Then transition to opacity 1
      // No time, because 'hidden' has transition-duratinon in CSS
      setTimeout(function () {
        fadeIn(winnerImg);
      });
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME BTN FUNCTIONALITY
newGameBtn.addEventListener('click', function () {
  if (!executing) {
    fadeOut(diceEl);
    init();
  }
});

// ROTATING BTN ICONS FUNCTIONALITY --> this has to be on the bottom, because after 'executing = true', above functions would not work (they have if !executing).
buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    if (!executing) {
      executing = true;
      rotate(btn);

      setTimeout(function () {
        removeRotate(btn);
        executing = false;
      }, 700);
    }
  });
});

// MENU FUNCTIONALITY
// menu.addEventListener('click', function () {
//   player0;
// });
