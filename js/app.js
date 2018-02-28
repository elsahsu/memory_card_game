/*
 * Create a list that holds all of your cards
 */
var open_cards = [];
var matched_cards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle stackoverflow.com/a/2450976
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

function show_card_symbol(card) {
  card.className += " open";
  card.className += " show";
  if (open_cards.length == 0) {
    open_cards.push(card);
  } else if (open_cards.length == 1){
    console.log("Clicked card: " + card.firstElementChild.className);
    for (var i = 0; i < open_cards.length; i++) {
      var open_card = open_cards[i];
      console.log("Open card:" + i + ": " + open_card.firstElementChild.className);
      if (card.firstElementChild.className === open_card.firstElementChild.className) {
        open_card.className = "card match";
        card.className = "card match";
        matched_cards.push(card);
        matched_cards.push(open_card);
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

const cardlist = document.querySelectorAll('.card');
for (var i = 0; i < cardlist.length; i++) {
  var card = cardlist[i];
  card.addEventListener('click', function (event) {
    console.log('The card was clicked!');
// console.log(event.target);
    show_card_symbol(event.target);
//    event.target.className += " open";
//    event.target.className += " show";
})};




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
