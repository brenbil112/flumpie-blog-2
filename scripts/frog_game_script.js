// GAME

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'FROG' && computerSelection === 'BUNNY') ||
    (playerSelection === 'BUNNY' && computerSelection === 'ELEPHANT') ||
    (playerSelection === 'ELEPHANT' && computerSelection === 'FROG')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (computerSelection === 'FROG' && playerSelection === 'BUNNY') ||
    (computerSelection === 'BUNNY' && playerSelection === 'ELEPHANT') ||
    (computerSelection === 'ELEPHANT' && playerSelection === 'FROG')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'FROG'
    case 1:
      return 'ELEPHANT'
    case 2:
      return 'BUNNY'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const frogBtn = document.getElementById('frogBtn')
const elephantBtn = document.getElementById('elephantBtn')
const bunnyBtn = document.getElementById('bunnyBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

frogBtn.addEventListener('click', () => handleClick('FROG'))
elephantBtn.addEventListener('click', () => handleClick('ELEPHANT'))
bunnyBtn.addEventListener('click', () => handleClick('BUNNY'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'FROG':
      playerSign.textContent = '🐸'
      break
    case 'ELEPHANT':
      playerSign.textContent = '🐘'
      break
    case 'BUNNY':
      playerSign.textContent = '🐰'
      break
  }

  switch (computerSelection) {
    case 'FROG':
      computerSign.textContent = '🐸'
      break
    case 'ELEPHANT':
      computerSign.textContent = '🐘'
      break
    case 'BUNNY':
      computerSign.textContent = '🐰'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'You won!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'You lost!'
  }

  playerScorePara.textContent = `Player: ${playerScore}`
  computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'You won!')
    : (endgameMsg.textContent = 'You lost...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Choose your Fighter!'
  scoreMessage.textContent = 'First to score 5 points wins the game!  Frog > Bunny > Elephant > Frog'
  playerScorePara.textContent = 'Player: 0'
  computerScorePara.textContent = 'Computer: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}