const restartButton = document.getElementById('restart-btn');
let currentMarker = 'O';
let filteredArray;
let gameOver = 0;
let count = 0;

const gameBoard = {
  gameBoard: ['', '', '', '', '', '', '', '', ''],

  playRound(letter, index) {
    this.gameBoard[index] = letter;
  },
};

const ui = {
  getBoardContainer() {
    const gameBoardNodeList = document.querySelectorAll('.grid-cell');
    const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
    return gameBoardHTMLCollection;
  },

  renderBoard(i) {
    const container = this.getBoardContainer();
    container[i].innerHTML = currentMarker;
    // container.forEach(function (item) {
    //   container.innerHTML = "X"
    // render a square in the container with the appropriate letter
    // })
  },
  renderWinScreen(currentMarker) {
    const winMessage = document.getElementById('win-message');

    winMessage.innerHTML = `Player ${currentMarker} Wins!`;

    // render a different screen declaring the player passed in as the winner
  },
};

(function () {
  for (let i = 0; i < ui.getBoardContainer().length; i++) {
    ui.getBoardContainer()[i].addEventListener('click', playGame);
  }
})();
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
  let i = Array.from(ui.getBoardContainer()).indexOf(event.target);
  return i;
}

function playGame(event) {
  let i = handleClick(event);
  if (ui.getBoardContainer()[i].innerHTML === '' && gameOver !== 1) {
    if (gameBoard.gameBoard[i] === '' && currentMarker === 'O') {
      gameBoard.playRound('X', i);
      currentMarker = gameBoard.gameBoard[i];
    } else if (gameBoard.gameBoard[i] === '' && gameOver !== 1) {
      gameBoard.playRound('O', i);
      currentMarker = gameBoard.gameBoard[i];
    }
    ui.renderBoard(i);
    ui.getBoardContainer()[i].innerHTML = currentMarker;
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
            ui.getBoardContainer()[filteredArray[0]].style.color = 'red';
            ui.getBoardContainer()[filteredArray[1]].style.color = 'red';
            ui.getBoardContainer()[filteredArray[2]].style.color = 'red';
            currentMarker = 'X';
          } else {
            ui.getBoardContainer()[filteredArray2[0]].style.color = 'blue';
            ui.getBoardContainer()[filteredArray2[1]].style.color = 'blue';
            ui.getBoardContainer()[filteredArray2[2]].style.color = 'blue';
            currentMarker = 'O';
          }
          ui.renderWinScreen(currentMarker);
          gameOver = 1;

          break;
        } else {
          determineTie();
        }
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
  for (i = 0; i < gameBoard.gameBoard.length; i++) {
    if (gameBoard.gameBoard[i] !== '') {
      arrayCount++;
    }
  }

  if (arrayCount === 9 && winMessage.innerHTML === '') {
    winMessage.innerHTML = "It's a Tie!";
  }
}

const restart = function restartGame() {
  gameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];
  for (i = 0; i < ui.getBoardContainer().length; i++) {
    ui.getBoardContainer()[i].innerHTML = '';
    ui.getBoardContainer()[i].style.color = '';
  }
  ui.renderWinScreen('');

  gameOver = 0;
  currentMarker = 'O';
};

restartButton.addEventListener('click', restart);
