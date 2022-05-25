'use strict';

// GLOBAL VARIABLES
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const currentScore0 = document.querySelector('#current-score-0');
const currentScore1 = document.querySelector('#current-score-1');
const currentBox0 = document.querySelector('.current-box-0');
const currentBox1 = document.querySelector('.current-box-1');

const winnerImg0 = document.querySelector('.winner-img-0');
const winnerImg1 = document.querySelector('.winner-img-1');
const diceEl = document.querySelector('.dice');
const buttons = document.querySelectorAll('.btn');
const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');

let scores, currentScore, playerActive, playing, rolling;

// STARTING CONDITIONS FUNCTION
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;
  rolling = false;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  newGameBtn.classList.remove('highlighted');
  winnerImg0.classList.add('hidden');
  winnerImg1.classList.add('hidden');
  winnerImg0.classList.remove('fade-in');
  winnerImg1.classList.remove('fade-in');
  currentBox0.classList.remove('hidden');
  currentBox1.classList.remove('hidden');
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
  if (playing && !rolling) {
    rolling = true;
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.classList.add('rotating');
    diceEl.src = `img/dice-0.svg`;

    setTimeout(function () {
      diceEl.classList.remove('rotating');
      diceEl.src = `img/dice-${diceNum}.svg`;
      rolling = false;
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
  if (playing) {
    scores[playerActive] += currentScore;
    document.querySelector(`#score-${playerActive}`).textContent =
      scores[playerActive];

    if (scores[playerActive] >= 5) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player-${playerActive}`)
        .classList.add('player-winner');

      document
        .querySelector(`.current-box-${playerActive}`)
        .classList.add('hidden');

      document
        .querySelector(`.winner-img-${playerActive}`)
        .classList.remove('hidden');

      document
        .querySelector(`.winner-img-${playerActive}`)
        .classList.add('fade-in');

      newGameBtn.classList.add('highlighted');
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME BTN FUNCTIONALITY
newGameBtn.addEventListener('click', init);

// ROTATING BTN ICONS FUNCTIONALITY
buttons.forEach(btn =>
  btn.addEventListener('click', function () {
    this.classList.add('rotating');
    setTimeout(function () {
      btn.classList.remove('rotating');
    }, 700);
  })
);
