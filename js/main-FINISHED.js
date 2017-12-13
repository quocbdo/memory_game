var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"	
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"	
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"	
	}

];

var cardsInPlay = [];
var score = 0;

/* Displays/updates score in the index.html file. */
var scoreUpdate = function() {
	var p = document.getElementById('points');
	p.textContent = score;
}

/* Intergrated shuffle function to randomize the "cards"
array based on the Fisher–Yates Shuffle algorithm. Implemented 
in createBoard(). */
var shuffle = function(deck) {
    var counter = deck.length;
    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);
        counter--;
        var temp = deck[counter];
        deck[counter] = deck[index];
        deck[index] = temp;
    }
    return deck;
}

/* Updated checkForMatch() to eliminate user clicking on same card to
earn points. */
var checkForMatch = function() {
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0].rank === cardsInPlay[1].rank && cardsInPlay[0].cardImage !== cardsInPlay[1].cardImage) {
      		alert("You found a match!");
      		score++;
      		scoreUpdate();
  			} else {
      		alert("Sorry, try again.");
      		}
    }
} 

/* Updated flipCard() to store entire card object in cardsInPlay array
so checkForMatch() can stop user from clicking same card to earn points. */
var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	cardsInPlay.push(cards[cardId]);
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	this.setAttribute('src', cards[cardId].cardImage);
	checkForMatch();
}

var createBoard = function() {
	shuffle(cards);
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

/* Resets game-board by clearing out elements and calling createBoard(). */
var resetBoard = function() {
	var game = document.getElementById('game-board');
	var i = 4;
	while (i > 0) {
		game.removeChild(game.childNodes[0]);
		i--;
	}
	cardsInPlay = [];
	createBoard();
}

document.getElementById('shuffle-button').addEventListener('click', resetBoard);

createBoard();
