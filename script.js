// Stores the state of the game.

function Gameboard() {
    const rows = 3;
    const columns = 3;
    // the 'cells' are from 1 to 9
    const board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // Populates the board.

    const getBoard = () => board;

    const log = () => {
        console.log("hi from Gameboard module");
    }

    function addPiece(buttonId, symbol) {
        if (board[buttonId] === 0 || board[buttonId] === null) {
            board[buttonId] = symbol;
        }
    }

    return { log, getBoard, addPiece };

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
    
    const playRound = (buttonId) => {
        // alert(`${activePlayer.name} pressed me, and i'm ${buttonId}`);
        // This puts the player's symbol in the cell they select
        board.addPiece(buttonId, activePlayer.symbol);
        console.log(board.getBoard());
        winner = (winScan(buttonId, activePlayer.symbol));
        if (!winner) {
            switchPlayerTurn();
            console.log('next player\'s turn');
        } else {
            console.log(`${activePlayer.symbol} won!!!`)
        }
    }

    const winScan = (buttonId) => {
        switch (parseInt(buttonId)) {
            case 0:
                return caseMatch(1, 4, 7);
                break;
            case 1:
                return caseMatch(1, 5);
                break;
            case 2:
                return caseMatch(1, 6, 8);
                break;
            case 3:
                return caseMatch(2, 4);
                break;
            case 4:
                return caseMatch(2, 5, 7, 8);
                break;
            case 5:
                return caseMatch(2, 6);
                break;
            case 6:
                return caseMatch(3, 4, 8);
                break;
            case 7:
                return caseMatch(3, 5);
                break;
            case 8:
                return caseMatch(3, 6, 7);
                break;
        }
    }

    const caseMatch = (...args) => {
        var cB = board.getBoard();
        var winner = false;
        for (arg of args) {
            if (arg === 1 && (!!(cB[0] === cB[1] && cB[0] === cB[2]))) {
                return winner = true;
            } else if (arg === 2 && (!!(cB[3] === cB[4] && cB[3] === cB[5]))) {
                return winner = true;
            } else if (arg === 3 && (!!(cB[6] === cB[7] && cB[6] === cB[8]))) {
                return winner =  true;
            } else if (arg === 4 && (!!(cB[0] === cB[3] && cB[0] === cB[6]))) {
                return winner =  true;
            } else if (arg === 5 && (!!(cB[1] === cB[4] && cB[1] === cB[7]))) {
                return winner = true;
            } else if (arg === 6 && (!!(cB[2] === cB[5] && cB[2] === cB[8]))) {
                return winner =  true;
            } else if (arg === 7 && (!!(cB[0] === cB[4] && cB[0] === cB[8]))) {
                return winner = true;
            } else if (arg === 8 && (!!(cB[2] === cB[4] && cB[2] === cB[6]))) {
                return winner = true;
            }
        }
    }

    function log() {
        console.log(activePlayer.symbol);
    }

    return { log, playRound, getBoard: board.getBoard() }
}

function ScreenController() {
    const game = GameController();
    let boardDiv = document.querySelector('.gameboard');
    let cells = document.querySelector('.cell');
    const buttons = document.querySelectorAll('.buttons');
    let i = 0;
    buttons.forEach((button) => {
        button.addEventListener('mouseup', () => {
            game.playRound(button.id);
            updateScreen();
        })
        button.textContent = (game.getBoard[i]);
        i++;
    })

    function updateScreen() {
        board2 = board.getBoard();
        buttons.forEach((button) => {
            if (board2[buttonId] === "X") {
                
            }
            button.textContent = board2[button.id];
        })
    }

    function log() {
        console.log(game.getBoard);
    }

    return { log };
}

const screenControl = ScreenController();
const gameControl = GameController();
const gBoard = Gameboard();

screenControl.log();
// gameControl.log();
// gBoard.log();