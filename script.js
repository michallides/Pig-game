'use strict';

const player0 = document.querySelector('#player-0');
const player1 = document.querySelector('#player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const currentScore0 = document.querySelector('#current-score-0');
const currentScore1 = document.querySelector('#current-score-1');

const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');
const diceEl = document.querySelector('.dice');

// Starting conditions
diceEl.classList.add('hidden');
let playing = true;
score0.textContent = 0;
score1.textContent = 0;
let scores = [0, 0];
let playerActive = 0;
let currentScore = 0;

const switchPlayer = function () {
  document.querySelector(`#current-score-${playerActive}`).textContent = 0;
  currentScore = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
};

// ROLL DICE BUTTON
rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // Dice appears with random number
    let diceNum = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${diceNum}.svg`;

    // If number on dice is not 1
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current-score-${playerActive}`).textContent =
        currentScore;
    } else {
      // If number on dice is 1, lose current score and switch to another player
      switchPlayer();
    }
  }
});

// HOLD BUTTON
holdBtn.addEventListener('click', function () {});
