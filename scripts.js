const gameBoardNodeList = document.querySelectorAll('.grid-cell');
const gameBoardHTMLCollection = Array.from(gameBoardNodeList);

const gameBoard = {
  gameBoard: ['X', 'O', 'X', 'O', 'X', 'O'],
};

const gamePlayers = {
  Player1: 'Matt',
  Player2: 'Jeff',
};

const controlGame = {
  renderContent: () => {
    for (let i = 0; i < gameBoardHTMLCollection.length; i++) {
      gameBoardHTMLCollection[i].addEventListener('click', (event) => {
        const element = event.target;
        gameBoardHTMLCollection[i].innerHTML = 'X';
        console.log(element);
      });
    }
  },
};
