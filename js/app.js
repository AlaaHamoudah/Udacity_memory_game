/*
 * Create a list that holds all of your cards
 */
var movesCounter = 0;
var lockedCardsCounter = 0;
var openCards = [];
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
function initGame() {
  const shuffledArray = shuffle(cardsNames);
  let cardItem = shuffledArray.map(card=>{
      return ` <li class="card"> <i class="fa ${card}"></i>  </li>`
  })
  let allCards = document.querySelector(".deck");
  allCards.innerHTML = cardItem.join('');
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
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
document.addEventListener('DOMContentLoaded', function(){

    var allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
      card.addEventListener("click", function(e) {
          console.log('eee')
        incrementMovesCounter();
        toggleCardSymbol(card);
        addToOpenCards(card);
      });
    });
    
    
    const restartButton = document.querySelector('.restart')
    restartButton.addEventListener('click', function(){
        initGame();
        lockedCardsCounter= 0;
        setMoveCounter(0);
    
    })

});

function toggleCardSymbol(card) {
  card.classList.toggle("show");
  card.classList.toggle("open");
}

function addToOpenCards(card) {
  openCards.push(card);

  if (openCards.length == 2) {
      // if matched
    if (compareCards(openCards[0], openCards[1] )) {

      lockCards(openCards[0], openCards[1]);
      openCards = [];
      if(lockedCardsCounter == cardsNames.length){
          alert ( 'Game finish')
      }
    } else {
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
  setMoveCounter()
  document.querySelector(".moves").innerHTML = movesCounter;
}

 function  setMoveCounter(movesCounter){
    document.querySelector(".moves").innerHTML = movesCounter;
 }
