const gameBoardNodeList = document.querySelectorAll('.grid-cell');
const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
const winMessage = document.getElementById('win-message');
const restartButton = document.getElementById('restart-btn');
let currentMarker = 'O';
let filteredArray;
let gameOver = 0;
let count = 0;

const gameBoard = {
  gameBoard: ['', '', '', '', '', '', '', '', ''],
};

const gamePlayers = {
  Player1: '',
  Player2: '',
};

const controlGame = {
  renderContent: () => {},
};

const winConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  let i = Array.from(gameBoardHTMLCollection).indexOf(event.target);
  return i;
}

  function playRound (event) {
  let i = handleClick(event);
  if (gameBoardHTMLCollection[i].innerHTML === '' && gameOver !== 1) {
  if (gameBoard.gameBoard[i] === '' && currentMarker === 'O') {
    gameBoard.gameBoard[i] = 'X';
    currentMarker = gameBoard.gameBoard[i];
  } else if (gameBoard.gameBoard[i] === '' && gameOver !== 1) {
    gameBoard.gameBoard[i] = 'O';
    currentMarker = gameBoard.gameBoard[i];
  }
    gameBoardHTMLCollection[i].innerHTML = currentMarker;
   currentMarker = event.target.innerHTML;

  checkForWinner();
  
}
}
function checkForWinner() {
  xIndices = getInd(gameBoard.gameBoard, 'X');
  oIndices = getInd(gameBoard.gameBoard, 'O');
  if (gameOver != 1) {
    for (u = 0; u < winConditions.length; u++) {
      x = 0;
      for (x = 0; x <= 2; x++) {
        if (
          (xIndices.includes(winConditions[u][0]) &&
            xIndices.includes(winConditions[u][1]) &&
            xIndices.includes(winConditions[u][2])) ||
          (oIndices.includes(winConditions[u][0]) &&
            oIndices.includes(winConditions[u][1]) &&
            oIndices.includes(winConditions[u][2]))
        ) {
          filteredArray = xIndices.filter(
            (item) =>
              item === winConditions[u][0] ||
              item === winConditions[u][1] ||
              item === winConditions[u][2]
          );

          filteredArray2 = oIndices.filter(
            (item) =>
              item === winConditions[u][0] ||
              item === winConditions[u][1] ||
              item === winConditions[u][2]
          );

          if (currentMarker === 'X') {
            gameBoardHTMLCollection[filteredArray[0]].style.color = 'red';
            gameBoardHTMLCollection[filteredArray[1]].style.color = 'red';
            gameBoardHTMLCollection[filteredArray[2]].style.color = 'red';
            currentMarker = 'X';
          } else {
            gameBoardHTMLCollection[filteredArray2[0]].style.color = 'blue';
            gameBoardHTMLCollection[filteredArray2[1]].style.color = 'blue';
            gameBoardHTMLCollection[filteredArray2[2]].style.color = 'blue';
            currentMarker = 'O';
          }
         winMessage.innerHTML = `Player ${currentMarker} Wins!`;
         gameOver = 1;
          
          break;
        } else {determineTie()}
          
        }
      }
    }
}


(function () {
  for (let i = 0; i < gameBoardHTMLCollection.length; i++) {
    gameBoardHTMLCollection[i].addEventListener('click', playRound);
  }
})();

function getInd(arr, val) {
  let index = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    index.push(i);
  }
  return index;
}

function determineTie() {
 let arrayCount = 0
  for (i = 0; i < gameBoard.gameBoard.length; i++) {
    if (gameBoard.gameBoard[i] !== '') {
      arrayCount++
    } 
  }
     
  if (arrayCount === 9 && winMessage.innerHTML === '') {
  winMessage.innerHTML = "It's a Tie!";
   
 
 
}
}

function restartGame() {
  gameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];
  for (i = 0; i < gameBoardHTMLCollection.length; i++) {
    gameBoardHTMLCollection[i].innerHTML = '';
    gameBoardHTMLCollection[i].style.color = '';
  }
  winMessage.innerHTML = '';

  gameOver = 0;
  currentMarker = 'O';
}

restartButton.addEventListener('click', restartGame);

