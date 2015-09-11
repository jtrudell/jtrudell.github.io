var magicNumber = Math.floor(Math.random() * 10 + 1);

var player = {
  name: prompt("What is your name?"),
  wonThisGame: false,
  guesses: 4
}

var magician = {
  greet: sayHello(player.name),
  startGame: playGame()
}

function guess() {
  var playerGuess = prompt("I am thinking of a number between 1 and 10. What is it? You get four guesses");
  player.guesses -= 1;
  checkNumber(playerGuess);
}

function checkNumber(guess) {
  if (guess == magicNumber) {
    player.wonThisGame = true;
    youWon(magicNumber);
  } else {
    addText(guess);
  }
}

function playGame() {
  player.wonThisGame = false;
  while (!player.wonThisGame && player.guesses > 0) {
  guess();
  }
  callButton();
}

function sayHello(name) {
  if (name === "") {
    name = "Nobody";
  }
  var newPara = document.createElement("p");
  var hi = document.createTextNode("Hello, " + name + "! Let's get started!");
  newPara.appendChild(hi);

  var introDiv = document.getElementById("intro");
  document.body.insertBefore(newPara, introDiv.nextSibling);
}

function addText(guess) {
  if (guess === "") {
    guess = "Nothing";
  }
  var newPara = document.createElement("p");
  if (player.guesses > 0) {
    var tryAgain = document.createTextNode(guess + " is not the magic number. You have " + player.guesses + " more guesses.");
  } else {
    var tryAgain = document.createTextNode(guess + " is not the magic number. You have no more guesses. You LOSE.");
  }

  newPara.appendChild(tryAgain);

  var footerDiv = document.getElementById("footer");
  document.body.insertBefore(newPara, footerDiv);
}

function youWon(number) {
  var winPara = document.createElement("p");
  var winner = "You got it right! The number was " + number + ".";
  var text = document.createTextNode(winner);
    winPara.appendChild(text);

    var footerDiv = document.getElementById("footer");
    document.body.insertBefore(winPara, footerDiv.nextSibling);
  }

function callButton() {
  var button = document.getElementById("play");
  document.write("<p><button id='play' type='button' onclick = 'window.location.reload();'>Play again!</button></p>");
}

player.name;
magician.greet;
magicNumber;
magician.startGame;
button.onclick = playGame();
