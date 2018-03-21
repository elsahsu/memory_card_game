//JS strict mode
(function () {
  'use strict';

//variables
let openCards = [];
let matchedCards = [];
let movecount = 0;
let seconds = 0;
let minutes = 0;
let stars = 0;
let myTimer = null;

//Shuffle from stack overflow
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//show & pair cards, count moves, remove stars
function showCardSymbol(card) {
  if (card.firstElementChild == null) {
      console.log("Warning: Card has no children: " + card.className);
      return;
  }

  console.log("Begin: Clicked card: " + card.firstElementChild.className);
  console.log("Opened cards:" + openCards.length);
  for (let i = 0; i < openCards.length; i++) {
    let openCard = openCards[i];
    console.log(openCard.firstElementChild.className);
  }

  if (openCards.length == 0) {
    // Clicked on the first card. Just show it.
    card.className += " open";
    card.className += " show";
    openCards.push(card);
  } else if (openCards.length == 1) {
    // Clicked second card. Compare if matches the first card.
    let openCard = openCards[0];
    if (card === openCard) {
      console.log("Clicked on already opened card. No action.");
      return;
    }
    movecount = movecount + 1;
    // console.log(movecount);
    $(".moves").html(movecount);
    if (movecount === 10) {
        stars = 2;
        $('#star-2').remove();
    } else if (movecount === 15) {
        stars = 1;
        $('#star-1').remove();
    } else if (movecount === 20) {
        stars = 0;
        $('#star-0').remove();
    }
    console.log("Comparing to openCard: " + openCard.firstElementChild.className);
    if (card.firstElementChild.className === openCard.firstElementChild.className) {
        openCard.className = "card match";
        card.className = "card match";
        matchedCards.push(card);
        matchedCards.push(openCard);
        if (matchedCards.length === 16) {
            clearInterval(myTimer);
            let modal = document.getElementById('win-dialog');
            modal.style.display = "inline-block";
            for (let i = 0; i < stars; i++) {
                $("#popup-stars").append('<li><i class="fa fa-star"></i></li>');
            };
            $("#popup-time").html(minutes + ':' + seconds);
        }
        openCards.pop();
        console.log('Open cards after pop: ' + openCards.length);
        return;
    } else {
        openCard.className = "card mismatch";
        card.className = "card mismatch";
        openCards.push(card);
        return;
    }
  } else if (openCards.length > 1) {
      for (let i = 0; i < openCards.length; i++) {
        let openCard = openCards[i];
        openCard.className = "card";
      }
      openCards = [];
      openCards.push(card);
      card.className += " open";
      card.className += " show";
  }
};

//timer
function addSecond() {
  seconds = seconds + 1;
  if (seconds === 60) {
    minutes = minutes + 1;
    seconds = 0;
  }
  $(".seconds").html(minutes + ':' + seconds);
}

//start a game
function startNewGame() {
  stars = 3;
  movecount = 0;
  seconds = 0;
  minutes = 0;
  openCards = [];
  matchedCards = [];
  $(".seconds").html(minutes + ':' + seconds);
  $(".deck").empty();
  $(".stars").empty();
  $(".moves").html(movecount);
  clearInterval(myTimer);
  myTimer = setInterval(addSecond, 1000);
  const allCards = ["anchor", "anchor", "bicycle", "bicycle", "bolt", "bolt", "bomb", "bomb", "cube", "cube", "diamond", "diamond", "leaf", "leaf", "paper-plane", "paper-plane"]
  let shuffledCards = shuffle(allCards);
  for (let i = 0; i < shuffledCards.length; i++) {
    let imagename = shuffledCards[i];
    $(".deck").append('<li class="card"><i class="fa fa-' + imagename + '"></i></li>');
  }

  //addEventListener to cards
  let cardlist = document.querySelectorAll('.card');
  for (let i = 0; i < cardlist.length; i++) {
    let card = cardlist[i];
    card.addEventListener('click', function(event) {
  // console.log(event.target);
      showCardSymbol(event.target);
  //    event.target.className += " open";
  //    event.target.className += " show";
  })};

  for (let i = 0; i < 3; i++) {
    $(".stars").append('<li id="star-'+ i +'"><i class="fa fa-star"></i></li>');
  }
}
startNewGame();

//restart button
$(".fa-repeat").click(function() {
  startNewGame();
});

//new game button in popup
$("#popup-new-game").click(function() {
  let windialog = document.getElementById('win-dialog');
  windialog.style.display = "none";
  startNewGame();
});

//var.addEventListener('click', function(event){})-->JS
//$(".selector").click(function(){})-->jQuery


//popup modal
let span = document.getElementById("popup-close");
span.onclick = function() {
  let windialog = document.getElementById('win-dialog');
  windialog.style.display = "none";
}

}());
