// Stores the state of the game.

function Gameboard() {
    const rows = 3;
    const columns = 3;
    // the 'cells' are from 1 to 9
    const board = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

    // Populates the board.

    const getBoard = () => board;

    function addPiece(buttonId, symbol) {
        if (board[buttonId] === 0 || board[buttonId] === null) {
            board[buttonId] = symbol;
        }
    }

    return { getBoard, addPiece };

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
        board.addPiece(buttonId, activePlayer.symbol);
        winner = (winScan(buttonId, activePlayer.symbol));
        if (!winner) {
            switchPlayerTurn();
        } else {
            return winner;
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
                return winner = 1;
            } else if (arg === 2 && (!!(cB[3] === cB[4] && cB[3] === cB[5]))) {
                return winner = 2;
            } else if (arg === 3 && (!!(cB[6] === cB[7] && cB[6] === cB[8]))) {
                return winner = 3;
            } else if (arg === 4 && (!!(cB[0] === cB[3] && cB[0] === cB[6]))) {
                return winner =  4;
            } else if (arg === 5 && (!!(cB[1] === cB[4] && cB[1] === cB[7]))) {
                return winner = 5;
            } else if (arg === 6 && (!!(cB[2] === cB[5] && cB[2] === cB[8]))) {
                return winner =  6;
            } else if (arg === 7 && (!!(cB[0] === cB[4] && cB[0] === cB[8]))) {
                return winner = 7;
            } else if (arg === 8 && (!!(cB[2] === cB[4] && cB[2] === cB[6]))) {
                return winner = 8;
            }
        }
    }

    return { playRound, getBoard: board.getBoard(), caseMatch }
}

function ScreenController() {
    const game = GameController();
    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseup', () => {
            game.playRound(cell.id);
            if (winner) {
                updateScreen(cell.id);
                displayWinMessage(cell.id);
            } else {
                updateScreen(cell.id);
            }
        })
    })

    function updateScreen(cellID) {
        let image = document.createElement('img');
        tempBoard = board.getBoard();
        if (tempBoard[cellID] === "X") {
            image.src = "/cross.svg";
        } else {
            image.src = "/circle.svg";
        }
        let thisCell = document.getElementById(cellID);
        thisCell.textContent = '';
        thisCell.appendChild(image);
        thisCell.disabled = true;
    }

    function drawWinLines(winner) {
        var cellOne;
        var cellTwo;
        var cellThree;
        switch (winner) {
            case 1:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);
            case 2:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);
            case 3:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);

            case 4:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);

            case 5:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);

            case 6:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);

            case 7:
                cellOne = document.getElementById(0);
                cellTwo = document.getElementById(1);
                cellThree = document.getElementById(2);

            case 8:
        }
    }

    /*

                if (arg === 1 && (!!(cB[0] === cB[1] && cB[0] === cB[2]))) {
                return winner = 1;
            } else if (arg === 2 && (!!(cB[3] === cB[4] && cB[3] === cB[5]))) {
                return winner = 2;
            } else if (arg === 3 && (!!(cB[6] === cB[7] && cB[6] === cB[8]))) {
                return winner = 3;
            } else if (arg === 4 && (!!(cB[0] === cB[3] && cB[0] === cB[6]))) {
                return winner =  4;
            } else if (arg === 5 && (!!(cB[1] === cB[4] && cB[1] === cB[7]))) {
                return winner = 5;
            } else if (arg === 6 && (!!(cB[2] === cB[5] && cB[2] === cB[8]))) {
                return winner =  6;
            } else if (arg === 7 && (!!(cB[0] === cB[4] && cB[0] === cB[8]))) {
                return winner = 7;
            } else if (arg === 8 && (!!(cB[2] === cB[4] && cB[2] === cB[6]))) {
                return winner = 8;
            }

*/

    function displayWinMessage(buttonId) {
        let winningSymbol = document.getElementById(buttonId).innerHTML;
        if (winningSymbol.toString().includes('cross')) {
            alert('X is win');
        } else {
            alert('O is the win');
        }
    }
}

const game = ScreenController();
