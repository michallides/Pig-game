'use strict';

const player = document.querySelector('.player');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const score1 = document.querySelector('.score-1');
const score2 = document.querySelector('.score-2');
const currentScore1 = document.querySelector('.current-score-1');
const currentScore2 = document.querySelector('.current-score-2');
const currentActive = document.querySelector('.current-active');
const newGame = document.querySelector('.new-game-btn');
const rollDice = document.querySelector('.roll-dice-btn');
const hold = document.querySelector('.hold-btn');
const dice = document.querySelector('.dice');
let currentScore = Number(currentActive.textContent);

rollDice.addEventListener('click', function () {
  let number = Math.trunc(Math.random() * 6) + 1;
  dice.src = `img/dice-${number}.svg`;

  if (number === 1) {
    currentScore = 0;
    currentActive.textContent = currentScore;

    if (
      currentScore1.classList.contains('current-active') &&
      player1.classList.contains('player-active')
    ) {
      currentScore1.classList.remove('current-active');
      currentScore2.classList.add('current-active');
      player1.classList.remove('player-active');
      player2.classList.add('player-active');
    }
  } else {
    currentScore += number;
    currentActive.textContent = currentScore;
  }
});
