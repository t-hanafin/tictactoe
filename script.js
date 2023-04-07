// Stores the state of the game.

function Gameboard() {
    const board = [ ];

    const getBoard = () => board;

    function addPiece(buttonId, symbol) {
        if (!board[buttonId]) {
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
        tie = Object.keys(board.getBoard()).length > 8;
        if (!winner && !tie) {
            switchPlayerTurn();
        } else {
            return winner ? winner : tie;
        }
    }

    const winScan = (buttonId) => {
        switch (parseInt(buttonId)) {
            case 0:
                return winCaseMatch(1, 4, 7);
                break;
            case 1:
                return winCaseMatch(1, 5);
                break;
            case 2:
                return winCaseMatch(1, 6, 8);
                break;
            case 3:
                return winCaseMatch(2, 4);
                break;
            case 4:
                return winCaseMatch(2, 5, 7, 8);
                break;
            case 5:
                return winCaseMatch(2, 6);
                break;
            case 6:
                return winCaseMatch(3, 4, 8);
                break;
            case 7:
                return winCaseMatch(3, 5);
                break;
            case 8:
                return winCaseMatch(3, 6, 7);
                break;
        }
    }

    const winCaseMatch = (...args) => {
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
                return winner = 4;
            } else if (arg === 5 && (!!(cB[1] === cB[4] && cB[1] === cB[7]))) {
                return winner = 5;
            } else if (arg === 6 && (!!(cB[2] === cB[5] && cB[2] === cB[8]))) {
                return winner = 6;
            } else if (arg === 7 && (!!(cB[0] === cB[4] && cB[0] === cB[8]))) {
                return winner = 7;
            } else if (arg === 8 && (!!(cB[2] === cB[4] && cB[2] === cB[6]))) {
                return winner = 8;
            }
        }
    }

    // this does not work yet
    const randomPlacePicker = () => {
        var place;
        var isBlank = false;
        do {
            place = (Math.floor(Math.random() * 10));
            if (place >= 0 && place <= 8) {
                console.log(place);
                isBlank = (board.getBoard()[place] === undefined);
            }
        } while (!isBlank);
        return place;
    }

    return { playRound, getBoard: board.getBoard() }
}

function ScreenController() {
    const game = GameController();
    var cells = document.querySelectorAll('.cell');
    var players = document.querySelector('.players');
    var screen = document.querySelector('body');
    cells.forEach((cell) => {
        cell.addEventListener('mouseup', () => {
            outcome = game.playRound(cell.id);
            outcomeTest(outcome, cell.id);
        })
    })

    function updateScreen(cellId) {
        let image = document.createElement('img');
        if (board.getBoard()[cellId] === "X") {
            image.src = "./svgs/cross.svg";
            image.id = "X";
        } else {
            image.src = "./svgs/circle.svg";
            image.id = "O";
        }
        let thisCell = document.getElementById(cellId);
        thisCell.textContent = '';
        thisCell.appendChild(image);
        thisCell.style = "pointer-events: none";
    }

    function outcomeTest(outcome, cellId) {
        if (winner) {
            updateScreen(cellId);
            displayWinMessage(cellId);
        } else if (tie) {
            updateScreen(cellId);
            screen.style = 'background-color: green';
        } else {
            updateScreen(cellId);
        }
    }

    function displayWinMessage(cellId) {
        if (board.getBoard()[cellId] === 'X') {
            screen.style = 'background-color: red';
        } else {
            screen.style = 'background-color: yellow';
        }
        cells.forEach((cell) => {
            cell.style = "pointer-events: none";
        })
    }
}

const game = ScreenController();