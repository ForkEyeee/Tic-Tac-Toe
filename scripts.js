const gameBoardNodeList = document.querySelectorAll('.grid-cell');
const gameBoardHTMLCollection = Array.from(gameBoardNodeList);
let gameOver = 0 ;
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
      
      currentMarker = event.innerHTML;
      if (gameBoardHTMLCollection[i].innerHTML === '' && gameOver !== 1) {
        if (gameBoard.gameBoard[i] === '' && count === 'O') {
          gameBoard.gameBoard[i] = 'X';
          currentMarker = gameBoard.gameBoard[i];
        } else {
          gameBoard.gameBoard[i] = 'O';
          currentMarker = gameBoard.gameBoard[i];
        }
        gameBoardHTMLCollection[i].innerHTML = gameBoard.gameBoard[i];
        count = event.target.innerHTML;
        test = getInd(gameBoard.gameBoard, 'X');
        test2 = getInd(gameBoard.gameBoard, 'O');
      } else {}
      if (gameOver != 1) {
      if (
        (test.includes(winConditions[0][0]) &&
          test.includes(winConditions[0][1]) &&
          test.includes(winConditions[0][2])) ||
        (test.includes(winConditions[1][0]) &&
          test.includes(winConditions[1][1]) &&
          test.includes(winConditions[1][2])) ||
        (test.includes(winConditions[2][0]) &&
          test.includes(winConditions[2][1]) &&
          test.includes(winConditions[2][2])) ||
        (test.includes(winConditions[3][0]) &&
          test.includes(winConditions[3][1]) &&
          test.includes(winConditions[3][2])) ||
        (test.includes(winConditions[4][0]) &&
          test.includes(winConditions[4][1]) &&
          test.includes(winConditions[4][2])) ||
        (test.includes(winConditions[5][0]) &&
          test.includes(winConditions[5][1]) &&
          test.includes(winConditions[5][2])) ||
        (test.includes(winConditions[6][0]) &&
          test.includes(winConditions[6][1]) &&
          test.includes(winConditions[6][2])) ||
        (test.includes(winConditions[7][0]) &&
          test.includes(winConditions[7][1]) &&
          test.includes(winConditions[7][2])) ||
        (test2.includes(winConditions[0][0]) &&
          test2.includes(winConditions[0][1]) &&
          test2.includes(winConditions[0][2])) ||
        (test2.includes(winConditions[1][0]) &&
          test2.includes(winConditions[1][1]) &&
          test2.includes(winConditions[1][2])) ||
        (test2.includes(winConditions[2][0]) &&
          test2.includes(winConditions[2][1]) &&
          test2.includes(winConditions[2][2])) ||
        (test2.includes(winConditions[3][0]) &&
          test2.includes(winConditions[3][1]) &&
          test2.includes(winConditions[3][2])) ||
        (test2.includes(winConditions[4][0]) &&
          test2.includes(winConditions[4][1]) &&
          test2.includes(winConditions[4][2])) ||
        (test2.includes(winConditions[5][0]) &&
          test2.includes(winConditions[5][1]) &&
          test2.includes(winConditions[5][2])) ||
        (test2.includes(winConditions[6][0]) &&
          test2.includes(winConditions[6][1]) &&
          test2.includes(winConditions[6][2])) ||
        (test2.includes(winConditions[7][0]) &&
          test2.includes(winConditions[7][1]) &&
          test2.includes(winConditions[7][2]))
      ) {
        gameOver = 1;
        alert(`${currentMarker} Wins!`);

      } else {determineTie ();}
    }});
  }
})();

//finds the indices at which "X" or "O" appears in the gameBoard.gameBoard array.

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

//When the user presses on a grid cell, the markers will alternate between X and O.
// function test(arr) {
//   text = '[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]';
//   for (i = 0; i < arr.length; i++) {
//     if (text.includes(arr[i])) {
//       console.log('works');
//     }
//   }
// }


function determineTie () {
  let arrayCount = 0;
  for (i = 0; i < gameBoardHTMLCollection.length; i++) {
    if( gameBoardHTMLCollection[i].innerHTML !== "") {
    arrayCount++
  } 
  }
  if (arrayCount === 9) {
    return alert("It's a Tie!");
    
  }
}