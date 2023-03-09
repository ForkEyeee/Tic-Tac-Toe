const gameBoard = (function () {
  let board = ['', '', '', '', '', '', '', '', ''];
  //board is private and only retreivable with method getBoard()
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

const ui = {
  currentMarker: '',
  gameOver: 0,

  setMarker() {
    if (this.currentMarker === '') {
      ui.currentMarker = 'X';
    } else if (this.currentMarker === 'X') {
      ui.currentMarker = 'O';
    } else if (this.currentMarker === 'O') {
      ui.currentMarker = 'X';
    }
    return ui.currentMarker;
  },

  getBoardContainer() {
    const gameBoardNodeList = document.querySelectorAll('.grid-cell');
    const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
    return gameBoardHTMLCollection;
  },

  renderBoard(i) {
    const container = this.getBoardContainer();
    container[i].innerHTML = this.currentMarker;
    return container;
  },

  renderWinScreen(currentMarker) {
    const winMessage = document.getElementById('win-message');
    if (currentMarker === '') {
      winMessage.innerHTML = '';
    } else if (currentMarker === 'Its a Tie!') {
      winMessage.innerHTML = 'Its a Tie!';
      winMessage.style.color = 'white';
    } else {
      winMessage.style.color = 'white';
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
  if (ui.gameOver !== 1) {
    let i = getGridIndex(event);
    ui.setMarker();
    if (gameBoard.getBoard()[i] === '') {
      gameBoard.playRound(ui.currentMarker, i);
      if (ui.getBoardContainer()[i].innerHTML === '') {
      }
    }
    ui.renderBoard(i);
    checkForWinner2();
  }
}

function checkForWinner2() {
  let winningArray = checkForWinner();
  if (winningArray !== undefined) {
    ui.getBoardContainer()[winningArray[0]].style.color = 'red';
    ui.getBoardContainer()[winningArray[1]].style.color = 'red';
    ui.getBoardContainer()[winningArray[2]].style.color = 'red';
    ui.renderWinScreen(ui.currentMarker);
    ui.gameOver = 1;
  } else {
    return;
  }
}

function checkForWinner() {
  xIndices = getInd(gameBoard.getBoard(), 'X');
  oIndices = getInd(gameBoard.getBoard(), 'O');
  if (ui.gameOver != 1) {
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
          xIndices = xIndices.filter(
            (item) =>
              item === winConditions[u][0] ||
              item === winConditions[u][1] ||
              item === winConditions[u][2]
          );

          oIndices = oIndices.filter(
            (item) =>
              item === winConditions[u][0] ||
              item === winConditions[u][1] ||
              item === winConditions[u][2]
          );
          if (xIndices.length === 3) {
            return xIndices;
          } else {
            return oIndices;
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

  ui.gameOver = 0;
  ui.setMarker();
};

(function () {
  for (let i = 0; i < ui.getBoardContainer().length; i++) {
    ui.getBoardContainer()[i].addEventListener('click', playGame);
  }
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click', restart);
})();
