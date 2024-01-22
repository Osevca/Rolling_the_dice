'use strict';

// vyber prkvu
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const maxScoreinput = document.getElementById('maxScore');


let scores, currentScore, activePlayer, playing, maxScore;

// vychozi nastaveni
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  maxScore = document.getElementById('maxScore').value || 100;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //document.getElementById('maxScore').setAttribute('disabled', true);
  
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// hod kostkou
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generovani cisla kostek
    const dice = Math.trunc(Math.random() * 6) + 1;

    // zobrazeni kostek
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // kontrola hodu pri hodnote 1
    if (dice !== 1) {
      // pricteni kostek ke skore
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // pernuti hrace
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // pridani aktualniho skore k aktualnimu hraci
    scores[activePlayer] += currentScore;    

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // kontrola skore
    if (scores[activePlayer] >= maxScore) {
      // ukonceni hry
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // pernuti hrace
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

//pridani listeneru pro zmenu max skore
maxScoreinput.addEventListener('change', function () {
  //aktualizace max skore
  maxScore = parseInt(maxScoreinput.value);
  //restart hry
  init();
})
