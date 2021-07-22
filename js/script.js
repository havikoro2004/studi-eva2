//function random
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var body = document.getElementById('body')
var newGame = document.getElementById('new')
var rollBtn = document.getElementById('roll')
var scores = document.getElementsByClassName('scores')
var holdBtn = document.getElementById('hold')
var redDot1 = document.getElementById('dot-icon')
var redDot2 = document.getElementById('dot-icon2')
var playerTitre1 = document.getElementById('p1-text')
var playerTitre2 = document.getElementById('p2-text')

class Players {
  constructor(name , currentScore , totalScore , tour){
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.tour = false
    this.winner = false
  }
}

var player1 = new Players('player1', 0, 0, false)
var player2 = new Players('player2', 0, 0, false)
var players = [player1, player2]

// Commencer la partie 
let gameTour = 0
// définir le joueur courant
let currentPlayer

// roll boutton function

function roll() {

var nbrRand = rand(1,7)

  switch (nbrRand) {
    case 1: dImg.src = 'images/1.jpg'; 
      break; 
    case 2: dImg.src = 'images/2.jpg'; 
      break;
    case 3: dImg.src = 'images/3.jpg'; 
      break; 
    case 4: dImg.src = 'images/4.jpg'; 
      break;
    case 5: dImg.src = 'images/5.jpg'; 
      break;
    case 6: dImg.src = 'images/6.jpg'; 
      break;
  }

if (gameTour==0) {
  players[0].tour = true
  currentPlayer = players[0]
  currentPlayer.currentScore+=nbrRand
  displayCurrentScore()
  currentPlayerCss()
}
  
  if (nbrRand==1) {
    setTimeout(() => {
      dImg.src = 'images/default.jpg'
    }, 500);
    players[0].currentScore = 0
    currentPlayer.tour = false
    players.reverse()
    players[0].tour=true
    console.log(players);
    displayCurrentScore()
  }


}

//Hold fonction
function hold (){
  players[0].totalScore+=players[0].currentScore
  players[0].currentScore=0
  players[0].tour = false
  displayCurrentScore()
  players.reverse()
  players[0].tour = true
  displayTotalScore()
  currentPlayerCss()
}
// Hold boutton 
holdBtn.addEventListener('click' , hold)
rollBtn.addEventListener('click' , roll)

// New Game boutton 
newGame.addEventListener('click' , newFunction)

// function reset 
function newFunction() {
  for (player of players) {
    player.currentScore = 0
    player.totalScore = 0
    player.tour=false
  }
  players[0].tour = true
  currentPlayer = player1
  currentPlayer = players[0]
  displayTotalScore()
  displayCurrentScore()
  resetCss()
  roll
  
  
}
//function affichage current scores 
function displayCurrentScore() {
  if (currentPlayer = player1) {
    scores[0].childNodes[3].childNodes[3].textContent = currentPlayer.currentScore
  }
  if (currentPlayer = player2) {
    scores[1].childNodes[3].childNodes[3].textContent = currentPlayer.currentScore
  }
}

//function affichage total scores 
function displayTotalScore() {
  if (currentPlayer = player1) {
    scores[0].childNodes[1].textContent = currentPlayer.totalScore
  }
  if (currentPlayer = player2) {
    scores[1].childNodes[1].textContent = currentPlayer.totalScore
  }
}

// Function currentPlayer Css 
function currentPlayerCss () {
  if (players[0]==player1) {
    body.style.background = 'linear-gradient(90deg, #edf1f1 50%, white 50%)'
    redDot1.style.opacity = '100'
    redDot2.style.opacity='0'
    playerTitre1.style.fontWeight='bolder'
    playerTitre2.style.fontWeight = 'normal'

  } 
  if (players[0]==player2) {
    body.style.background = 'linear-gradient(90deg, white 50%, #edf1f1 50%)'
    redDot2.style.opacity = '100'
    redDot1.style.opacity='0'
    playerTitre2.style.fontWeight='bolder'
    playerTitre1.style.fontWeight = 'normal'
  }
  
}

// reset Css
function resetCss() {
  body.style.background = 'white'
  redDot2.style.opacity = '0'
  redDot1.style.opacity = '0'
  playerTitre2.style.fontWeight = 'normal'
  playerTitre1.style.fontWeight = 'normal'
}