/*
 * Create a list that holds all of your cards
 */
let movesCounter = 0;
let lockedCardsCounter = 0;
let openCards = [];
let hours = 0;
let seconds = 0;
let minutes = 0;
let timerRef;
let starRate = 5;
const cardsNames = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

initGame();
timer();

function initGame() {
  const shuffledArray = shuffle(cardsNames);
  let cardItem = shuffledArray.map(card => {
    return ` <li class="card"> <i class="fa ${card}"></i>  </li>`;
  });
  let allCards = document.querySelector(".deck");
  allCards.innerHTML = cardItem.join("");
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let cardIndex, clickedElement;
document.addEventListener("DOMContentLoaded", function() {
    addEventListenerToCards()

  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", function() {
    startFreshGame();
  });

  // Get the <span> element that closes the modal
  const closeModelButton = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  closeModelButton.onclick = function() {
    hideModel();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
     hideModel();
    }
  };

   document.getElementsByClassName('play-again-button')[0].addEventListener("click", function(){
    startFreshGame();
    hideModel();
    })
});

function addEventListenerToCards(){
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function() {
      incrementMovesCounter();
      toggleCardSymbol(this);
      addToOpenCards(this);
    });
  });
}
function tick() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  document.querySelector(".timer").textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
  timer();
}
function startFreshGame(){
  initGame();
  resetLockedCards();
  resetMoveCounter();
  resetTimer();
  addEventListenerToCards();
}

function hideModel(){
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
function timer() {
  timerRef = setTimeout(tick, 1000);
}

function stopTimer() {
  clearTimeout(timerRef);
}

function resetTimer() {
  seconds = minutes = hours = 0;
  document.querySelector(".timer").textContent = "00:00:00";
}
function toggleCardSymbol(card) {
  card.classList.toggle("show");
  card.classList.toggle("open");
}

function enableClick(cards) {
  // this function enables the cards to be clicked again
  cards.forEach(card => card.removeAttribute("style"));
}

function addToOpenCards(card) {
  openCards.push(card);
  card.style.pointerEvents = "none";
  if (openCards.length == 2) {
    // if matched
    if (compareCards(openCards[0], openCards[1])) {
      //     console.log(openCards[0], openCards[1]);
      lockCards(openCards[0], openCards[1]);
      openCards = [];
      if (lockedCardsCounter == cardsNames.length) {
        showModel();
        stopTimer();
      }
    } else {
      enableClick(openCards);
      setTimeout(() => {
        toggleCardSymbol(openCards[0]);
        toggleCardSymbol(openCards[1]);
        openCards = [];
      }, 400);
    }
  }
}

function compareCards(card1, card2) {
  let className1 = card1.getElementsByTagName("i").item(0).className;
  let className2 = card2.getElementsByTagName("i").item(0).className;

  let cardName1 = className1.split(" ");
  let cardName2 = className2.split(" ");

  if (cardName1[1] === cardName2[1]) {
    return true;
  }
  return false;
}

function lockCards(card1, card2) {
  card1.classList.remove("open", "show");
  card1.classList.add("match");
  card2.classList.remove("open", "show");
  card2.classList.add("match");
  lockedCardsCounter = lockedCardsCounter + 2;
}

function incrementMovesCounter() {
  movesCounter++;
  setMoveCounter();
  document.querySelector(".moves").innerHTML = movesCounter;
  evaluateRating();
}

function setMoveCounter(movesCounter) {
  document.querySelector(".moves").innerHTML = movesCounter;
}

function resetMoveCounter() {
  movesCounter = 0;
  setMoveCounter(0);
}

function resetLockedCards() {
  lockedCardsCounter = 0;
}

function showModel() {
  const modal = document.getElementById("myModal");
  document.getElementById('time-consumed').innerHTML = `${hours} : ${minutes} : ${seconds}` 
  document.getElementById('star-rating').innerHTML = starRate
  modal.style.display = "block";
}

function evaluateRating() {
  switch (movesCounter) {
    case 10:
      hideStar(0);
      starRate = 4;
      break;
    case 20:
      hideStar(1);
      starRate = 3;
      break;
    case 30:
      hideStar(2);
      starRate = 2;
      break;
    case 40:
      hideStar(3);
      starRate = 1;
      break;
  }
}

function hideStar(index) {
  document.querySelector(".stars").getElementsByTagName("li")[
    index
  ].style.display = "none";
}
