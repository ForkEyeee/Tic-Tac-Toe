let currentMarker = 'O';
let filteredArray;
let filteredArray2;
let gameOver = 0;
let count = 0;

const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];

  return {
    playRound(letter, index) {
      board[index] = letter;
    },
    getBoard() {
      return board;
    },
    resetBoard() {
      board = ['', '', '', '', '', '', '', '', ''];
    },
  };
})();

// const gameBoard = {
//   gameBoard: ['', '', '', '', '', '', '', '', ''],
//   playRound(letter, index) {
//     this.gameBoard[index] = letter;
//   },
// };

const ui = {
  getBoardContainer() {
    const gameBoardNodeList = document.querySelectorAll('.grid-cell');
    const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
    return gameBoardHTMLCollection;
  },

  renderBoard(i) {
    const container = this.getBoardContainer();
    container[i].innerHTML = currentMarker;
  },

  renderWinScreen(currentMarker) {
    const winMessage = document.getElementById('win-message');
    if (currentMarker === '') {
      winMessage.innerHTML = '';
    } else if (currentMarker === 'Its a Tie!') {
      winMessage.innerHTML = 'Its a Tie!';
    } else {
      winMessage.innerHTML = `Player ${currentMarker} Wins!`;
    }
  },
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

function getGridIndex(event) {
  let i = Array.from(ui.getBoardContainer()).indexOf(event.target);
  return i;
}

function playGame(event) {
  let i = getGridIndex(event);
  if (ui.getBoardContainer()[i].innerHTML === '' && gameOver !== 1) {
    if (gameBoard.getBoard()[i] === '' && currentMarker === 'O') {
      gameBoard.playRound('X', i);
      currentMarker = gameBoard.getBoard()[i];
    } else if (gameBoard.getBoard()[i] === '' && gameOver !== 1) {
      gameBoard.playRound('O', i);
      currentMarker = gameBoard.getBoard()[i];
    }
    ui.renderBoard(i);
    ui.getBoardContainer()[i].innerHTML = currentMarker;
    currentMarker = event.target.innerHTML;

    checkForWinner2();
  }
}

function checkForWinner2() {
  let winningArray = checkForWinner();
  if (winningArray !== undefined) {
    ui.getBoardContainer()[winningArray[0]].style.color = 'red';
    ui.getBoardContainer()[winningArray[1]].style.color = 'red';
    ui.getBoardContainer()[winningArray[2]].style.color = 'red';
    ui.renderWinScreen(currentMarker);
    gameOver = 1;
  } else {
    return;
  }
}

function checkForWinner() {
  xIndices = getInd(gameBoard.getBoard(), 'X');
  oIndices = getInd(gameBoard.getBoard(), 'O');
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
          if (filteredArray.length === 3) {
            return filteredArray;
          } else {
            return filteredArray2;
          }
        } else {
          determineTie();
        }

        break;
      }
    }
  }
}

function getInd(arr, val) {
  let index = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    index.push(i);
  }
  return index;
}

function determineTie() {
  let arrayCount = 0;
  for (i = 0; i < gameBoard.getBoard().length; i++) {
    if (gameBoard.getBoard()[i] !== '') {
      arrayCount++;
    }
  }

  if (arrayCount === 9) {
    ui.renderWinScreen('Its a Tie!');
  }
}

//event listeners for the grid and restart button

const restart = function restartGame() {
  gameBoard.resetBoard();
  for (i = 0; i < ui.getBoardContainer().length; i++) {
    ui.getBoardContainer()[i].innerHTML = '';
    ui.getBoardContainer()[i].style.color = '';
  }
  ui.renderWinScreen('');

  gameOver = 0;
  currentMarker = 'O';
};

(function () {
  for (let i = 0; i < ui.getBoardContainer().length; i++) {
    ui.getBoardContainer()[i].addEventListener('click', playGame);
  }
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click', restart);
})();
