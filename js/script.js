// Declaration des vars utilisables pour manipuler le DOM

var body = document.getElementById('body')
var rollBtn = document.getElementById('roll')
var holdBtn = document.getElementById('hold')
var dImg = document.getElementById('dImg')
var dotIcon1 = document.getElementById('dot-icon')
var dotIcon2 = document.getElementById('dot-icon2')
var player1Titre = document.getElementById('p1-text')
var player2Titre = document.getElementById('p2-text')
var player1Current = document.getElementById('player1')
var player2Current = document.getElementById('player2')
var rollAudio = document.getElementById('roll-audio')
var loseAudio = document.getElementById('lose-audio')
var holdAudio = document.getElementById('hold-fx')

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






}, 400))



