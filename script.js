'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentOne = document.getElementById('current--0');
const currentTwo = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// Switch players function
const switchPlayers = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling Dice Function
const diceRoll = function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //   Check Roll
    if (dice !== 1) {
      // Add dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(activePlayer);
    } else {
      // Switch players
      switchPlayers();
      if (dice !== 1) {
        diceEl.classList.add('hidden');
      }
    }
  }
};
// Hold button function
const buttonHold = function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // player wins
    if (scores[activePlayer] > 99) {
      document.getElementById(`current--${activePlayer}`).textContent =
        'You Win';
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      // Hold points
    } else {
      switchPlayers();
    }
  }
};

const buttonReset = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentOne.textContent = 0;
  currentTwo.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

// Roll & Hold
buttonReset();
btnRoll.addEventListener('click', diceRoll);
btnHold.addEventListener('click', buttonHold);
btnNew.addEventListener('click', buttonReset);
