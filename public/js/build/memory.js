"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// cards array holds all cards
var card = document.getElementsByClassName("card");

var cards = _toConsumableArray(card); // deck of all cards in game


var deck = document.getElementById("card-deck"); // declaring variable of matchedCards

var matchedCard = document.getElementsByClassName("match");
var moves = 0; // close icon in modal

var closeicon = document.querySelector(".close"); // declare modal

var modal = document.getElementById("popup1"); // array for opened cards

var openedCards = []; // @description shuffles cards
// @param {array}
// @returns shuffledarray

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

; // @description shuffles cards when page is refreshed / loads

document.body.onload = startGame(); // @description function to start a new play 

function startGame() {
  // shuffle deck
  cards = shuffle(cards); // remove all exisiting classes from each card

  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  } // reset moves


  moves = 0;
} // @description toggles open and show class to display cards


var displayCard = function displayCard() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}; // @description add opened cards to OpenedCards list and check if cards are match or not


function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;

  if (len === 2) {
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

; // @description when cards match

function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
} // description when cards don't match


function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
} // @description disable cards temporarily


function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add('disabled');
  });
} // @description enable cards and disable matched cards


function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove('disabled');

    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
} // @description congratulations when all cards match, show modal and moves, time and rating


function congratulations() {
  if (matchedCard.length == cards.length) {
    var code = 'total-recall'; // show congratulations modal

    swal('Sucess', 'Your code is ' + code, 'info');
  }

  ;
} // @description close icon on modal


function closeModal() {
  closeicon.addEventListener("click", function (e) {
    modal.classList.remove("show");
    startGame();
  });
} // @desciption for user to play Again 


function playAgain() {
  modal.classList.remove("show");
  startGame();
} // loop to add event listeners to each card


for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}

;