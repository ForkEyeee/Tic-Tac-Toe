const gameBoardNodeList = document.querySelectorAll('.grid-cell');
const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
let element;
let count = 'O';
const gameBoard = {
  gameBoard: ['', '', '', '', '', '', '', '', ''],
};

const gamePlayers = {
  Player1: 'Matt',
  Player2: 'Jeff',
};

const winConditions = [
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

//

(function () {
  for (let i = 0; i < gameBoardHTMLCollection.length; i++) {
    gameBoardHTMLCollection[i].addEventListener('click', (event) => {
      if (gameBoardHTMLCollection[i].innerHTML === '') {
        if (gameBoard.gameBoard[i] === '' && count === 'O') {
          gameBoard.gameBoard[i] = 'X';
        } else {
          gameBoard.gameBoard[i] = 'O';
        }

        if (gameBoard.gameBoard.length > 9) {
          // gameBoard.gameBoard.length = 0;
        } else {
          gameBoardHTMLCollection[i].innerHTML = gameBoard.gameBoard[i];
          count = event.target.innerHTML;
        }
      }

      //if 3 of a type of marker exists on the board, check if they are in

      // element = event.target;
      // if (gameBoardHTMLCollection[i].innerHTML === '') {
      //   gameBoardHTMLCollection[i].innerHTML = 'X';
      // } else if (element.innerHTML === "X"){
      //   gameBoardHTMLCollection[i].innerHTML = 'O';
      // }
      console.log(element);
      if (JSON.stringify(winConditions).includes( JSON.stringify(getInd(gameBoard.gameBoard, 'X')))) {
        alert('You Win')
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
  if (arr.length > 3) {
    //arr.pop();
  }
  return index;
}

const controlGame = {
  renderContent: () => {},
};

//When the user presses on a grid cell, the markers will alternate between X and O.
