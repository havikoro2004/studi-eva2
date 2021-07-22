// Variables utilisés pour le code
var body = document.getElementById('body')
var newGame = document.getElementById('new')
var rollBtn = document.getElementById('roll')
var scores = document.getElementsByClassName('scores')
var holdBtn = document.getElementById('hold')
var redDot1 = document.getElementById('dot-icon')
var redDot2 = document.getElementById('dot-icon2')
var playerTitre1 = document.getElementById('p1-text')
var playerTitre2 = document.getElementById('p2-text')
const newFx = document.getElementById('new-fx')
const rollFx = document.getElementById('roll-fx')
const holdFx = document.getElementById('hold-fx')
const winFx = document.getElementById('win-fx')
const loseFx = document.getElementById('lose-fx')
var msg = () => { alert('Cliquer sur New Game pour rejouer') }

// Créer la classe joueurs
class Players {
  constructor(name , currentScore , totalScore , tour ,winner){
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.tour = false
    this.winner = false
  }
}
// Créer deux Objets Joueurs de la classe Players
var player1 = new Players('player1', 0, 0, false,false)
var player2 = new Players('player2', 0, 0, false,false)
var players = [player1, player2]


// Variable qui initialise la partie 
let gameTour = 0

// définir le joueur courant
let currentPlayer

//roll event
rollBtn.addEventListener('click', roll)

// roll boutton function
function roll() {
  setTimeout(() => {
    var nbrRand = rand(1, 7)
    generateFx(rollFx)
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

    if (gameTour == 0) {
      players[0].tour = true
      currentPlayer = players[0]
      currentPlayer.currentScore += nbrRand
      displayCurrentScore()
      currentPlayerCss()
    }

    if (nbrRand == 1) {
      generateFx(loseFx)
      setTimeout(() => {
        dImg.src = 'images/default.jpg'
        currentPlayerCss()
      }, 500);
      players[0].currentScore = 0
      currentPlayer.tour = false
      players.reverse()
      players[0].tour = true
      console.log(players);
      displayCurrentScore()
    }
  }, 400);
}

// Hold event 
holdBtn.addEventListener('click', hold)
//Hold fonction
function hold (){
  dImg.src = 'images/default.jpg';
  generateFx(holdFx)
  players[0].totalScore+=players[0].currentScore
  players[0].currentScore=0
  players[0].tour = false
  if (players[0].totalScore>=6) {
    holdFx.pause()
    generateFx(winFx)
    body.style.background = 'white'
    players[0].winner=true
    holdBtn.removeEventListener('click' , hold)
    rollBtn.removeEventListener('click',roll)
    holdBtn.addEventListener('click' , msg)
    rollBtn.addEventListener('click', msg)
    if (players[0]==player1) {
      dImg.src = 'images/win1.jpg'
    } else {
      dImg.src = 'images/win2.jpg'
    }
    
  }
  displayCurrentScore()
  players.reverse()
  players[0].tour = true
  displayTotalScore()
  currentPlayerCss()
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
// Reset event 
newGame.addEventListener('click', newFunction)

// Reset function
function newFunction() {
  generateFx(newFx)
  holdBtn.removeEventListener('click', msg)
  rollBtn.removeEventListener('click', msg)
  holdBtn.addEventListener('click' , hold)
  rollBtn.addEventListener('click' , roll)
  dImg.src = 'images/default.jpg'
  body.style.background = 'white'
  redDot2.style.opacity = '0'
  redDot1.style.opacity = '0'
  playerTitre2.style.fontWeight = 'normal'
  playerTitre1.style.fontWeight = 'normal'
  player1 = new Players('player1', 0, 0, false,false)
  player2 = new Players('player2', 0, 0, false,false)
  players = [player1, player2]
  gameTour==0
  for (i = 0; i < 2; i++) {
    scores[i].childNodes[3].childNodes[3].textContent = players[i].currentScore
    scores[i].childNodes[1].textContent = players[i].totalScore
  }

}

/*...........................................Functions utlisées.........................................//
...........................................................................................................*/

//function random
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
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
function currentPlayerCss() {
  if (players[0] == player1) {
    body.style.background = 'linear-gradient(90deg, #edf1f1 50%, white 50%)'
    redDot1.style.opacity = '100'
    redDot2.style.opacity = '0'
    playerTitre1.style.fontWeight = 'bolder'
    playerTitre2.style.fontWeight = 'normal'

  }
  if (players[0] == player2) {
    body.style.background = 'linear-gradient(90deg, white 50%, #edf1f1 50%)'
    redDot2.style.opacity = '100'
    redDot1.style.opacity = '0'
    playerTitre2.style.fontWeight = 'bolder'
    playerTitre1.style.fontWeight = 'normal'
  }
}
// Function fx sound boutton
function generateFx(fx) {
  if (fx.paused) { fx.currentTime = 0; fx.play() }
  else fx.pause();
}
