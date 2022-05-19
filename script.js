'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const currentScore0 = document.querySelector('#current-score-0');
const currentScore1 = document.querySelector('#current-score-1');
const currentBox = document.querySelector('.current-box');

const winnerImg0 = document.querySelector('.winner-img-0');
const winnerImg1 = document.querySelector('.winner-img-1');
const diceEl = document.querySelector('.dice');
const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');

let scores, currentScore, playerActive, playing;

// STARTING CONDITIONS FUNCTION
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  winnerImg0.classList.add('hidden');
  winnerImg1.classList.add('hidden');
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('player-winner');
  player1.classList.remove('player-winner');
  currentBox.classList.remove('hidden');
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
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${diceNum}.svg`;

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

    if (scores[playerActive] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player-${playerActive}`)
        .classList.add('player-winner');

      document
        .querySelector(`.winner-img-${playerActive}`)
        .classList.remove('hidden');

      document
        .querySelector(`.current-box-${playerActive}`)
        .classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME BTN FUNCTIONALITY
newGameBtn.addEventListener('click', init);
