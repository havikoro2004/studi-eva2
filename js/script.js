// Declaration des vars utilisables pour manipuler le DOM

var body = document.getElementById('body')
var rollBtn = document.getElementById('roll')
var holdBtn = document.getElementById('hold')
var rollHoldDiv = document.getElementById('rollHold')
var dImg = document.getElementById('dImg')
var dotIcon1 = document.getElementById('dot-icon')
var dotIcon2 = document.getElementById('dot-icon2')
var player1Titre = document.getElementById('p1-text')
var player2Titre = document.getElementById('p2-text')
var player1Current = document.getElementById('player1')
var player2Current = document.getElementById('player2')
var rollAudio = document.getElementById('roll-fx')
var loseAudio = document.getElementById('lose-fx')
var holdAudio = document.getElementById('hold-fx')
var newAudio = document.getElementById('new-fx')
var winAudio = document.getElementById('win-fx')
var newGame =  document.getElementById('new')
var currentScoreDiv1 = document.getElementById('current1')
var currentScoreDiv2 = document.getElementById('current2')


//Création d'une fonction rand() qui génére un nombre entre 1 et 6 
function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Créer la classe Player 

class Player {
  constructor(name, currentScore, totalScore, tour) {
    this.name = name
    this.currentScore = currentScore
    this.totalScore = totalScore
    this.tour = tour
  }
}

// Créer Deux joueurs
let player1 = new Player('player1', 0, 0, false)
let player2 = new Player('player2', 0, 0, false)
let players = [player1, player2]


//Définir début de partie
var gameTour = 0

// Variable qui présent le joueur courant
var player;


// function Debounce 
function debounce(callback, delay) {
  var timer;
  return function () {
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay)
  }
}

// function ChangeBackgroundColor

function changeBgColor (){
  if (player1.tour == true) {
    body.style.background = 'linear-gradient(90deg, #edf1f1 50%, white 50%)'
    dotIcon2.style.color = 'white'
    dotIcon1.style.color = 'red'
    player1Titre.style.fontWeight = 'bolder'
    player2Titre.style.fontWeight = 'normal'

  } else {
    body.style.background = 'linear-gradient(90deg, white 50%, #edf1f1 50%)'
    dotIcon2.style.color = 'red'
    dotIcon1.style.color = 'white'
    player2Titre.style.fontWeight = 'bolder'
    player1Titre.style.fontWeight = 'normal'
  }
}
// Ajouter evenement au click sur le btn Roll

rollBtn.addEventListener('click', debounce(function () {

  rollAudio.play()
  
  let nbrRand = rand(1, 7)

  switch (nbrRand) {
    case 1: dImg.src = 'images/1.jpg';
    break; 
    case 2: dImg.src = 'images/2.jpg';
    break; 
    case 3: dImg.src = 'images/3.jpg'; 
    break; case 4: dImg.src = 'images/4.jpg'; 
    break; case 5: dImg.src = 'images/5.jpg'; 
    break; case 6: dImg.src = 'images/6.jpg'; 
    break;
  }

  if (gameTour == 0) {
    players[0].tour = true
    player = players[0]
    player.currentScore += nbrRand
    var currentScoreArea = document.getElementById(players[0].name).childNodes[3].childNodes[3]
    
    if (nbrRand == 1) {
      setTimeout(() => {
        dImg.src = 'images/default.jpg'
      }, 500);
      rollAudio.pause()
      loseAudio.pause()
      loseAudio.play()
      currentScoreArea.textContent = 0
      player.currentScore = 0
      player.tour = false
      players.reverse()
      players[0].tour = true

    }
    currentScoreArea.textContent = players[0].currentScore
  }

  changeBgColor()

}, 400))

// Boutton HOLD 
holdBtn.addEventListener('click', debounce(function () {
  holdAudio.play()
  setTimeout(() => {
    dImg.src = 'images/default.jpg'
  }, 500);
  player=players[0]
  let total = document.getElementById(players[0].name).childNodes[1]
  player.totalScore += player.currentScore
  total.textContent = player.totalScore
  player.currentScore = 0
  document.getElementById(players[0].name).childNodes[3].childNodes[3].textContent = player.currentScore
  player.tour = false
  players.reverse()
  players[0].tour = true
  changeBgColor()

  //winner part
  if (player.totalScore>=6) {
      holdAudio.pause()
      winAudio.play()
      let winner = player
      rollHoldDiv.style.display='none'
      // remove chiledren 
      document.getElementById(players[1].name).childNodes[3].textContent=''
      if (winner==player1) {
        currentScoreDiv1.style.background = 'center / contain no-repeat url("images/win1.jpg")'
      } else {
        currentScoreDiv2.style.background = 'center / contain no-repeat url("images/win2.jpg")'
      }
      body.style.background = 'linear-gradient(90deg, white 50%, white 50%)'
      dotIcon2.style.color = 'white'
      dotIcon1.style.color = 'white'
      player2Titre.style.fontWeight = 'normal'
      player1Titre.style.fontWeight = 'normal'
      return;
  }
}, 400))

// New game
newGame.addEventListener('click' , ()=>{
  newAudio.play()
  setInterval(() => {
    location.reload() 
  }, 500);
})

