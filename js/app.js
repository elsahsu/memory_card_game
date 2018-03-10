//variables
var open_cards = [];
var matched_cards = [];
var movecount = 0;
var seconds = 0;
var minutes = 0;
var stars = 0;

//Shuffle
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
function show_card_symbol(card) {
  card.className += " open";
  card.className += " show";
  if (open_cards.length == 0) {
    open_cards.push(card);
  } else if (open_cards.length == 1) {
    console.log("Clicked card: " + card.firstElementChild.className);
    movecount = movecount + 1;
    console.log(movecount);
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
    for (var i = 0; i < open_cards.length; i++) {
      var open_card = open_cards[i];
      console.log("Open card:" + i + ": " + open_card.firstElementChild.className);
      if (card.firstElementChild.className === open_card.firstElementChild.className) {
        open_card.className = "card match";
        card.className = "card match";
        matched_cards.push(card);
        matched_cards.push(open_card);
        if (matched_cards.length === 16) {
            let modal = document.getElementById('win-dialog');
            clearInterval(myTimer);
            modal.style.display = "inline-block";
            for (let i = 0; i < stars; i++) {
                $("#popup-stars").append('<li><i class="fa fa-star"></i></li>');
            };
            $("#popup-time").html(minutes + ':' + seconds);
        }
        open_cards.pop();
        return;
      } else {
          open_card.className = "card mismatch";
          card.className = "card mismatch";
          open_cards.push(card);
          return;
        }
      }
  } else if (open_cards.length > 1) {
      for (var i = 0; i < open_cards.length; i++) {
        var open_card = open_cards[i];
        open_card.className = "card";
      }
      open_cards = [];
      open_cards.push(card);
  }

  console.log(open_cards);
};

//timer
function add_second() {
  seconds = seconds + 1;
  if (seconds === 60) {
    minutes = minutes + 1;
    seconds = 0;
  }
  $(".seconds").html(minutes + ':' + seconds);
  console.log('adding seconds succeed!');
}
var myTimer;

//start a game
function start_new_game() {
  stars = 3;
  movecount = 0;
  seconds = 0;
  minutes = 0;
  $(".seconds").html(minutes + ':' + seconds);
  $(".deck").empty();
  $(".stars").empty();
  $(".moves").html(movecount);
  myTimer = setInterval(add_second, 1000);
  var all_cards = ["anchor", "anchor", "bicycle", "bicycle", "bolt", "bolt", "bomb", "bomb", "cube", "cube", "diamond", "diamond", "leaf", "leaf", "paper-plane", "paper-plane"]
  var shuffled_cards = shuffle(all_cards);
  console.log(shuffled_cards);
  for (var i = 0; i < shuffled_cards.length; i++) {
    var imagename = shuffled_cards[i];
    $(".deck").append('<li class="card"><i class="fa fa-' + imagename + '"></i></li>');
  }

  //addEventListener to cards
  let cardlist = document.querySelectorAll('.card');
  for (var i = 0; i < cardlist.length; i++) {
    var card = cardlist[i];
    card.addEventListener('click', function(event) {
      console.log('The card was clicked!');
  // console.log(event.target);
      show_card_symbol(event.target);
  //    event.target.className += " open";
  //    event.target.className += " show";
  })};

  for (var i = 0; i < 3; i++) {
    $(".stars").append('<li id="star-'+ i +'"><i class="fa fa-star"></i></li>');
  }
}
start_new_game();

//restart button
$(".fa-repeat").click(function() {
  console.log('restart button works asap!')
  start_new_game();
});

//var.addEventListener('click', function(event){})-->JS
//$(".selector").click(function(){})-->jQuery


//popup modal
let span = document.getElementById("popup-close");
span.onclick = function() {
  let windialog = document.getElementById('win-dialog');
  windialog.style.display = "none";
  console.log("close the popup!");
}
