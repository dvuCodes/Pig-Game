'use strict';

//select elements
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const current0E1 = document.getElementById('current--0');
const current1E1 = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting vairables
score0El.textcontent = 0;
score1El.textcontent = 0;
diceEl.classList.add('hidden');
let playing = true;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//switch player function
let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle('player--active');
  player1E1.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check rolled
    if (dice !== 1) {
      currentScore += dice;
      // current0E1.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch players. If active player is 0 then change to 1 else change to 0
      switchPlayer();
    }
  }
});

//hold to store current score
btnHold.addEventListener('click', function () {
  //Stores current player score and resets score to 0
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] <= 20) {
      switchPlayer();
    } else {
      // document.querySelector('.modal').classList.remove('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
      diceEl.classList.add('hidden');
      console.log('Current Player Wins!');
    }
  }
});

btnNew.addEventListener('click', function () {
  //reset game condition
  playing = true;

  //remove player-winner class
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  //make player 1 active again
  player0E1.classList.add('player--active');
  activePlayer = 0;

  //reset starting variables
  scores = [0, 0];
  current0E1.textContent = 0;
  current1E1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
});
