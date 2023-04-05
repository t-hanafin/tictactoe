// Stores the state of the game.

function Gameboard() {
    const rows = 3;
    const columns = 3;
    // the 'cells' are from 1 to 9
    const board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // Populates the board.

    const getBoard = () => board;

    function log() {
        console.log("hi");
    }

    return { log, getBoard };
}

function GameController() {
    board = Gameboard(); 

    const playerFactory = (name, symbol) => {
        return { name, symbol };
    }

    const playerOne = playerFactory('playerOne', 'X');
    const playerTwo = playerFactory('playerTwo', 'O');

    const players = [
        playerOne,
        playerTwo,
    ];

    let activePlayer = players[0];
    
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }
    
    const playRound = (cell) => {
        // this'll put the player's symbol in the cell they select
        switchPlayerTurn();
    }
    
    function log() {
        console.log(activePlayer.symbol);
    }

    return { log, playRound }
}

function ScreenController() {
    const game = GameController();
    let boardDiv = document.querySelector('.gameboard');

    function log() {
        console.log("hi");
    }

    return { log };
}

const screenControl = ScreenController();
const gameControl = GameController();
const gBoard = Gameboard();

// screenControl.log();
gameControl.log();
// gBoard.log();