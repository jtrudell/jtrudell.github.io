//Simple number guessing game for DBC Phase 0 Week 7 September 2015

var magicNumber = Math.floor(Math.random() * 10 + 1);

var player = {
  name: prompt("What is your name?"),
  wonThisGame: false,
  guesses: 4
};

var magician = {
  greet: sayHello(player.name),
  startGame: playGame()
};

function newGameButton() {
  var button = document.getElementById("play");
  document.write("<p><button id='play' type='button' onclick = 'window.location.reload();'>Play again!</button></p>");
}

function printText(line, parentDiv) {
  var newPara = document.createElement("p");
  var text = document.createTextNode(line);
  newPara.appendChild(text);
  document.body.insertBefore(newPara, parentDiv)
}

function sayHello(name) {
  if (name === "") {
    name = "Nobody";
  }
  var hi = "Hello, " + name + "! Let's get started.";
  var introDiv = document.getElementById("intro");
  printText(hi, introDiv.nextSibling);
}

function playGame() {
  player.wonThisGame = false;
  while (!player.wonThisGame && player.guesses > 0) {
  guess();
  }
  newGameButton();
}

function newGameButton() {
  var button = document.getElementById("play");
  document.write("<p><button id='play' type='button' onclick = 'window.location.reload();'>Play again!</button></p>");
}

function guess() {
  var playerGuess = prompt("I am thinking of a number between 1 and 10. What is it? You get four guesses.");
  player.guesses -= 1;
  checkNumber(playerGuess);
}

function checkNumber(playerGuess) {
  if (playerGuess == magicNumber) {
    player.wonThisGame = true;
    youWon(magicNumber);
  } else {
    guessText(playerGuess);
  }
}

function guessText(guess) {
  if (guess === "") {
    guess = "Nothing";
  }

  if (player.guesses > 0) {
    var tryAgain = guess + " is not the magic number. You have " + player.guesses + " more guesses.";
  } else {
    var tryAgain = guess + " is not the magic number. You have no more guesses. You LOSE.";
  }

  var footerDiv = document.getElementById("footer");
  printText(tryAgain, footerDiv);
}

function youWon(number) {
  var winner = "You got it right! The number was " + number + ".";
  var footerDiv = document.getElementById("footer");
  printText(winner, footerDiv.nextSibling);
}

player.name;
magician.greet;
magicNumber;
magician.startGame;
button.onclick = playGame();
