const INITIAL_SCORE = 20
const MAX_NUMBER = 20

let number
let score
let highscore

const messageField = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highscoreField = document.querySelector('.highscore')
const numberField = document.querySelector('.number')
const guessField = document.querySelector('.guess')
const checkBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')

//el estado de mi app se basa en -number: numero aleatorio
// score, highscore, si uno de estos cambia se cambia el DOM a posteriori
/* seleccionar todos los elementos del DOM que necesitamos */

initData()

function initData() {
  score = INITIAL_SCORE
  scoreField.textContent = score
  highscore = Number(localStorage.getItem('highscore')) || 0
  number = Math.trunc(Math.random() * MAX_NUMBER) + 1
  console.log(number, '*******************************************')
}

checkBtn.addEventListener('click', checkNumber)
againBtn.addEventListener('click', playAgain)

function checkNumber() {
  //obtenemos el número pulsado
  const guess = Number(guessField.value)
  //si no es un numero que lo corrija y tiene que estar entre 1 y 20
  if (!guess || guess < 1 || guess > 20) {
    displayMesssage('Introduce un numero entre 1 y 20')
  } else if (guess === number) {
    displayMesssage('Numero correcto')
    numberField.textContent = number
    numberField.style.backgroundColor = 'red'
    numberField.style.color = 'white'
    document.body.style.backgroundColor = 'green'
    checkBtn.disabled = true
    if (score > highscore) {
      highscore = score
      highscoreField.textContent = highscore
      //guardamos el valor en el localStorage y highscoreField con el localStorage
      //si no hay highscore en el localStorage lo seteamos en 0
      //highscrore tiene que ser number
      localStorage.setItem('highscore', highscore)
    }
  } else {
    if (score > 1) {
      const message = guess > number ? 'Te has pasado' : 'Te has quedado corto'
      displayMesssage(message)
    } else {
      displayMesssage('Perdiste')
      checkBtn.disabled = true
    }
    score--
    scoreField.textContent = score
  }
}

function displayMesssage(message) {
  messageField.textContent = message
}

function playAgain() {
  initData()
  numberField.textContent = '?'
  numberField.style.backgroundColor = '#222'
  numberField.style.color = '#eee'
  document.body.style.backgroundColor = '#222'
  guessField.value = ''
  checkBtn.disabled = false
}

//si pulsamos la tecla enter debería pulsar el botón checkButton
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkBtn.click()
  }
})
