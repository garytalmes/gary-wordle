// Selectors
var viewport = document.querySelector("#viewport");
var gameboard = document.querySelector("#game-board-here");
var submitButton = document.querySelector("button#submit");
var playButton = document.querySelector("button#play");

// Global variables
var isGameStarted = false;
var words = [ "scope", "bolts", "thyme", "laser", "tired", "pluck", "rhino", "lakes" ];
var wordToBeGuessed = "";

var currentRow = 0;
var currentLetterBlock = 0;

// Choose the word that will be guessed
function pickAWord(){
  var min = 0;
  var max = words.length - 1;
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  wordToBeGuessed = words[randomNumber];
  //console.log(`Current word is: ${wordToBeGuessed}`);
  setupBoard();
}

// Sets up the initial game board
function setupBoard(){
  for( var i = 1; i < 6; i++ ){
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", `game-row row-${i}`)
    for( var z = 0; z < wordToBeGuessed.length; z++ ){
      // create a DOM element to hold each letter
      var letterBox = document.createElement("div");
      letterBox.setAttribute("class", "letter-box");

      var letterSpan = document.createElement("span");
      letterBox.appendChild(letterSpan);

      // append this letter block to the correct row in the DOM
      rowDiv.appendChild(letterBox);
    }
    gameboard.appendChild(rowDiv);
  }
  submitButton.setAttribute("style", "display: block;");
}

// Start up a game and initialize key global variables
function init(){
  currentRow = 0;
  currentLetterBlock = 0;
  isGameStarted = true;
  gameboard.innerHTML = "";
  pickAWord();
}


// Evaluate the currently finished row to see if the game has yet been won (or lost)
function evaluateRow(exactMatches){
  if( exactMatches === wordToBeGuessed.length ){
    alert("You win!");
  } else if( currentRow === 4 ) {
    alert("You lose!");
  } else {
    currentRow++;
    currentLetterBlock = 0;
  }
}


// event listeners go here
document.addEventListener("keydown", function(e){

  // TODO: allow delete key to remove last-entered letter 

  var allowedKeys = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];

  if( isGameStarted ){
    var rowDivs = document.querySelectorAll("div.game-row");
    var keyPressed = e.key.toLowerCase();

    // access the correct letter box on the correct row
    if( allowedKeys.includes(keyPressed) && currentLetterBlock < wordToBeGuessed.length ){
      var currentLetterSpan = rowDivs[currentRow].children[currentLetterBlock].children[0]
      currentLetterSpan.textContent = keyPressed;
      currentLetterBlock++;
    }
  }
});

// When the submit button is clicked, we evaluate the letters in the current row
submitButton.addEventListener("click", function(e){
  var rowDivs = document.querySelectorAll("div.game-row");

  var letterBlocksToCheck = rowDivs[currentRow].children;
  var lettersExamined = [];
  var exactMatches = 0;

  for( var i = 0; i < letterBlocksToCheck.length; i++ ){

    // TODO: handle words with multiple instances of the same letter

    if( !lettersExamined.includes(letterEntered) ){
      lettersExamined.push(letterEntered);

      var letterEntered = letterBlocksToCheck[i].children[0].textContent;
      var backgroundColor = "#555";  // default 

      // is this letter anywhere in the real word
      if( wordToBeGuessed.includes(letterEntered) ){
        backgroundColor = "#e6d380";
      }

      if( wordToBeGuessed.charAt(i) === letterEntered ){
        exactMatches++;
        backgroundColor = "#57b354";
      }

      letterBlocksToCheck[i].setAttribute("style", `background-color: ${backgroundColor}`)
    }
  }
  evaluateRow(exactMatches);
});


playButton.addEventListener("click", function(){
  init();
});