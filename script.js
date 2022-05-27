'use strict';

// GLOBAL VARIABLES
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const currentScore0 = document.querySelector('#current-score-0');
const currentScore1 = document.querySelector('#current-score-1');
const currentBox0 = document.querySelector('.current-box-0');
const currentBox1 = document.querySelector('.current-box-1');

const buttons = document.querySelectorAll('.btn');
const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');

const winnerImg0 = document.querySelector('.winner-img-0');
const winnerImg1 = document.querySelector('.winner-img-1');

let winningScore = 5;
let scores, currentScore, playerActive, playing, executing;

// Hide dice after rotating css animation is done (2s)
setTimeout(function () {
  diceEl.classList.add('hidden');
}, 2000);

// STARTING CONDITIONS FUNCTION
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

  score0.classList.remove('hidden');
  score1.classList.remove('hidden');
  currentBox0.classList.remove('hidden');
  currentBox1.classList.remove('hidden');

  newGameBtn.classList.remove('highlighted');
  rollDiceBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');

  winnerImg0.classList.add('hidden');
  winnerImg1.classList.add('hidden');
  setTimeout(function () {
    winnerImg0.classList.add('removed');
    winnerImg1.classList.add('removed');
  }, 500);
};

init();

// SWITCH PLAYER FUNCTION
const switchPlayer = function () {
  document.querySelector(`#current-score-${playerActive}`).textContent = 0;
  currentScore = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

// ROLL DICE BTN FUNCTIONALITY
rollDiceBtn.addEventListener('click', function () {
  if (playing && !executing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.classList.add('rotating');
    diceEl.src = 'img/dice-0.svg';

    setTimeout(function () {
      diceEl.classList.remove('rotating');
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
      diceEl.classList.add('hidden');
      holdBtn.classList.add('hidden');
      rollDiceBtn.classList.add('hidden');

      scoreActive.classList.add('hidden');

      newGameBtn.classList.add('highlighted');

      document
        .querySelector(`.player-${playerActive}`)
        .classList.add('player-winner');

      document
        .querySelector(`.current-box-${playerActive}`)
        .classList.add('hidden');

      winnerImg.classList.remove('removed');

      // No time, because 'hidden' has transition-duratinon in CSS
      setTimeout(function () {
        winnerImg.classList.remove('hidden');
      });
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME BTN FUNCTIONALITY
newGameBtn.addEventListener('click', function () {
  if (!executing) {
    diceEl.classList.add('hidden');
    init();
  }
});

// ROTATING BTN ICONS FUNCTIONALITY --> this has to be on the bottom, because after 'executing = true', above functions would not work (they have if !executing).
buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    if (!executing) {
      executing = true;
      btn.classList.add('rotating');

      setTimeout(function () {
        btn.classList.remove('rotating');
        executing = false;
      }, 700);
    }
  });
});
