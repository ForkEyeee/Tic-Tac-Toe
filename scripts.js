const gameBoardNodeList = document.querySelectorAll('.grid-cell');
const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
const winMessage = document.getElementById('win-message');
let currentMarker = 'O';
let filteredArray;
let gameOver = 0;
let element;
let count = 0;
const gameBoard = {
  gameBoard: ['', '', '', '', '', '', '', '', ''],
};

const gamePlayers = {
  Player1: 'Matt',
  Player2: 'Jeff',
};

const winConditions = [
  // horizontal
  [0, 1, 2], // 3
  [3, 4, 5], // 12
  [6, 7, 8], // 21

  // vertical
  [0, 3, 6], // 9
  [1, 4, 7], // 12
  [2, 5, 8], // 15

  // diagonal
  [0, 4, 8], // 12
  [2, 4, 6], // 12
];

(function () {
  for (let i = 0; i < gameBoardHTMLCollection.length; i++) {
    gameBoardHTMLCollection[i].addEventListener('click', (event) => {
     
      if (gameBoardHTMLCollection[i].innerHTML === '' && gameOver !== 1) {
        if (gameBoard.gameBoard[i] === '' && currentMarker === 'O') {
          gameBoard.gameBoard[i] = 'X';
          currentMarker = gameBoard.gameBoard[i];
        } else if (gameBoardHTMLCollection[i].innerHTML === '' && gameOver !== 1) {
          gameBoard.gameBoard[i] = 'O';
          currentMarker = gameBoard.gameBoard[i];
        } 
        gameBoardHTMLCollection[i].innerHTML = currentMarker;
        currentMarker = event.target.innerHTML;
        test = getInd(gameBoard.gameBoard, 'X');
        test2 = getInd(gameBoard.gameBoard, 'O');
      } 
      if (gameOver != 1) {
        for (u = 0; u < winConditions.length; u++) {
          x = 0;
          for (x = 0; x <= 2; x++) {
            if (
              (test.includes(winConditions[u][0]) &&
                test.includes(winConditions[u][1]) &&
                test.includes(winConditions[u][2])) ||
              (test2.includes(winConditions[u][0]) &&
                test2.includes(winConditions[u][1]) &&
                test2.includes(winConditions[u][2]))
            ) {
              filteredArray = test.filter(
                (item) =>
                  item === winConditions[u][0] ||
                  item === winConditions[u][1] ||
                  item === winConditions[u][2]
              );

              filteredArray2 = test2.filter(
                (item) =>
                  item === winConditions[u][0] ||
                  item === winConditions[u][1] ||
                  item === winConditions[u][2]
              );

              if (currentMarker === 'X') {
                gameBoardHTMLCollection[filteredArray[0]].style.color = 'red';
                gameBoardHTMLCollection[filteredArray[1]].style.color = 'red';
                gameBoardHTMLCollection[filteredArray[2]].style.color = 'red';
              } else {
                gameBoardHTMLCollection[filteredArray2[0]].style.color = 'blue';
                gameBoardHTMLCollection[filteredArray2[1]].style.color = 'blue';
                gameBoardHTMLCollection[filteredArray2[2]].style.color = 'blue';
              }
              winMessage.innerHTML = `Player ${currentMarker} Wins!`;
              gameOver = 1;
              break;
            } else {
              determineTie();
            }
          }
        }
      }
    });
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

const controlGame = {
  renderContent: () => {},
};

function determineTie() {
  let arrayCount = 0;
  for (i = 0; i < gameBoardHTMLCollection.length; i++) {
    if (gameBoardHTMLCollection[i].innerHTML !== '') {
      arrayCount++;
    }
  }
  if (arrayCount === 9 && winMessage.innerHTML === '') {
    winMessage.innerHTML = "It's a Tie!";
  }
}
