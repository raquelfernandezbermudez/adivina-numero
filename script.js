const INITIAL_SCORE = 20
const MAX_NUMBER = 20

let number
let score
let highscore

//el estado de mi app se basa en -number: numero aleatorio
// score, highscore, si uno de estos cambia se cambia el DOM a posteriori

initData()

function initData() {
  score = INITIAL_SCORE
  highscore = 0
  number = Math.trunc(Math.random() * MAX_NUMBER) + 1
  console.log(number, '*******************************************')
}

/* seleccionar todos los elementos del DOM que necesitamos */
const messageField = document.querySelector('.message')
const scoreField = document.querySelector('.score')
const highscoreField = document.querySelector('.highscore')
const numberField = document.querySelector('.number')
const guessField = document.querySelector('.guess')
const checkBtn = document.querySelector('.check')
const againBtn = document.querySelector('.again')

console.log(scoreField)
console.log(scoreField.textContent)
console.log(highscoreField)
console.log(highscoreField.textContent)

checkBtn.addEventListener('click', checkNumber)

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
    highscore++
    highscoreField.textContent = highscore
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
