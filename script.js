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

const settingsIcon = document.querySelector('.settings-icon');
const buttons = document.querySelectorAll('.btn');
const newGameBtn = document.querySelector('.new-game-btn');
const rollDiceBtn = document.querySelector('.roll-dice-btn');
const holdBtn = document.querySelector('.hold-btn');

const winnerImg0 = document.querySelector('.winner-img-0');
const winnerImg1 = document.querySelector('.winner-img-1');

const settingsIconLines = document.querySelectorAll('.settings-icon-line');

// On this width, sections change their layout from right and left to top and bottom respectively --> 750px
const mediaQueryList = window.matchMedia('(max-width: 46.875em)');

let winningScore = 5;
let settingsClosed, scores, currentScore, playerActive, playing, executing;

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

// ROTATE 360deg
const rotate = element => element.classList.add('rotating');

// REMOVE CLASS 'rotating'
const removeRotate = element => element.classList.remove('rotating');

// SLIDE FROM TOP
const slideFromTop = element => element.classList.add('slide-from-top');

// REMOVE CLASS 'slide-from-top's
const removeSlideFromTop = element =>
  element.classList.remove('slide-from-top');

// SLIDE FROM BOTTOM
const slideFromBottom = element => element.classList.add('slide-from-bottom');

// REMOVE CLASS 'slide-from-bottom'
const removeSlideFromBottom = element =>
  element.classList.remove('slide-from-bottom');

// SLIDE FROM LEFT
const slideFromLeft = element => element.classList.add('slide-from-left');

// REMOVE CLASS 'slide-from-left'
const removeSlideFromLeft = element =>
  element.classList.remove('slide-from-left');

// SLIDE FROM RIGHT
const slideFromRight = element => element.classList.add('slide-from-right');

// REMOVE CLASS 'slide-from-right'
const removeSlideFromRight = element =>
  element.classList.remove('slide-from-right');

// SLIDE TO TOP
const slideToTop = element => element.classList.add('slide-to-top');

// REMOVE CLASS 'slide-to-top'
const removeSlideToTop = element => element.classList.remove('slide-to-top');

// SLIDE TO BOTTOM
const slideToBottom = element => element.classList.add('slide-to-bottom');

// REMOVE CLASS 'slide-to-bottom'
const removeSlideToBottom = element =>
  element.classList.remove('slide-to-bottom');

// SLIDE TO LEFT
const slideToLeft = element => element.classList.add('slide-to-left');

// REMOVE CLASS 'slide-to-left'
const removeSlideToLeft = element => element.classList.remove('slide-to-left');

// SLIDE TO RIGHT
const slideToRight = element => element.classList.add('slide-to-right');

// REMOVE CLASS 'slide-to-right'
const removeSlideToRight = element =>
  element.classList.remove('slide-to-right');

// QUICK SLIDING (animation --> 1s; transition --> 0s)
const quickSliding = element => element.classList.add('quick-sliding');

// RESUME SLIDING DURATION --> REMOVE CLASS 'quick-sliding'(animation --> 2.5s; transition --> 0.5s)
const removeQuickSliding = element => element.classList.remove('quick-sliding');

// FUNCTION WITH ALL FUNCTIONS USED ON PAGE START
const pageStart = function () {
  // PLAYER'S SECTIONS SLIDE IN ON PAGE START
  const sectionStartSlide = function () {
    if (mediaQueryList.matches) {
      slideFromLeft(player0);
      slideFromRight(player1);

      setTimeout(function () {
        removeSlideFromLeft(player0);
        removeSlideFromRight(player1);
      }, 3000);
    } else {
      slideFromTop(player0);
      slideFromBottom(player1);

      setTimeout(function () {
        removeSlideFromTop(player0);
        removeSlideFromBottom(player1);
      }, 3000);
    }
  };

  // DICE ROTATE AND CHANGE NUMBERS ON PAGE START, THEN FADE OUT
  const diceStartRollHide = function () {
    diceEl.classList.add('rotating-start');
    // Number 1
    diceEl.src = 'img/dice-1.svg';
    // Numbers 2 - 6
    const dices = [2, 3, 4, 5, 6];
    let dicePositionNumber = 0;

    const intervalID = setInterval(function () {
      if (dicePositionNumber < dices.length) {
        diceEl.src = `img/dice-${dices[dicePositionNumber]}.svg`;
        dicePositionNumber++;
      } else {
        // Hide dice after rotating css animation is done (2.5s), but here only 2s (this timing is visually better)
        fadeOut(diceEl);
        diceEl.classList.remove('rotating-start');
        clearInterval(intervalID);
      }
    }, 2000 / dices.length);
  };

  // HIDE BTNS ON PAGE START, THEN FADE IN
  const showBtnsOnRefresh = function () {
    fadeOut(settingsIcon);
    removeElement(settingsIcon);
    buttons.forEach(btn => {
      fadeOut(btn);
      removeElement(btn);
    });

    // First add element, but still with opacity 0. Set 'playing = false' to make btns inactive while invisible
    setTimeout(function () {
      playing = false;
      addElement(settingsIcon);
      buttons.forEach(btn => {
        addElement(btn);
      });
    }, 2000);
    // Then transition to opacity 1. Set 'playing = true'
    setTimeout(function () {
      playing = true;
      fadeIn(settingsIcon);
      buttons.forEach(btn => {
        fadeIn(btn);
      });
    }, 2500);
  };

  sectionStartSlide();
  diceStartRollHide();
  showBtnsOnRefresh();
};

// STARTING CONDITIONS, REFRESHED CONDITIONS
const init = function () {
  settingsClosed = true;
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
pageStart();
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
    init();

    fadeOut(diceEl);
    fadeOut(winnerImg0);
    fadeOut(winnerImg1);
    setTimeout(function () {
      removeElement(winnerImg0);
      removeElement(winnerImg1);
    }, 500);

    // Btns 'fadeIn' has to be here and not in 'init()', because it is used in 'showBtnsOnRefresh()' with delay and these 2 functions are both executed at site start. It would cause bug
    buttons.forEach(btn => {
      fadeIn(btn);
    });
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

// SETTINGS BTN FUNCTIONALITY
settingsIcon.addEventListener('click', function () {
  if (settingsClosed) {
    quickSliding(player0);
    quickSliding(player1);
    slideOutSettings();
    settingsClosed = false;
  } else {
    slideInSettings();
    settingsClosed = true;

    setTimeout(function () {
      removeQuickSliding(player0);
      removeQuickSliding(player1);
    }, 1000);
  }
});

// SLIDE OUT FOR SETTINGS FUNCTION
const slideOutSettings = function () {
  buttons.forEach(btn => {
    fadeOut(btn);

    setTimeout(function () {
      buttons.forEach(btn => {
        removeElement(btn);
      });
    }, 500);
  });

  fadeOut(settingsIcon);

  setTimeout(function () {
    settingsIconLines.forEach(line => line.classList.add('closed'));
  }, 500);

  setTimeout(function () {
    fadeIn(settingsIcon);
  }, 1000);

  if (mediaQueryList.matches) {
    slideToTop(player0);
    slideToBottom(player1);

    setTimeout(function () {
      removeSlideFromTop(player0);
      removeSlideFromBottom(player1);
    }, 1000);
  } else {
    slideToLeft(player0);
    slideToRight(player1);

    setTimeout(function () {
      removeSlideFromLeft(player0);
      removeSlideFromRight(player1);
    }, 1000);
  }
};

// SLIDE IN FOR SETTINGS FUNCTION
const slideInSettings = function () {
  buttons.forEach(btn => {
    addElement(btn);

    setTimeout(function () {
      buttons.forEach(btn => {
        fadeIn(btn);
      });
    }, 1000);
  });

  fadeOut(settingsIcon);

  setTimeout(function () {
    settingsIconLines.forEach(line => line.classList.remove('closed'));
  }, 500);

  setTimeout(function () {
    fadeIn(settingsIcon);
  }, 1000);

  if (mediaQueryList.matches) {
    removeSlideToTop(player0);
    removeSlideToBottom(player1);
    slideFromTop(player0);
    slideFromBottom(player1);

    setTimeout(function () {
      removeSlideFromTop(player0);
      removeSlideFromBottom(player1);
    }, 1000);
  } else {
    removeSlideToLeft(player0);
    removeSlideToRight(player1);
    slideFromLeft(player0);
    slideFromRight(player1);

    setTimeout(function () {
      removeSlideFromLeft(player0);
      removeSlideFromRight(player1);
    }, 1000);
  }
};
