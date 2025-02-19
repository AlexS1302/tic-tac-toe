const board = document.querySelector(".board");
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');
const resetButton = document.getElementById('reset');
let message = document.getElementById("message");

let currentPlayer = "X";
let gameActive = true;
let gameDifficulty = 'hard' //Default
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

//Event Listeners

resetButton.addEventListener('click', function() {
    resetGame();
    console.log('Game has been reset')
    message.classList.remove('ellipsis');
});

easyButton.addEventListener('click', function() {
    gameDifficulty = 'easy';
    message.textContent = "Difficulty set to Easy";
    message.classList.remove('ellipsis');
});

mediumButton.addEventListener('click', function() {
    gameDifficulty = 'medium';
    message.textContent = "Difficulty set to Medium";
    message.classList.remove('ellipsis');
});

hardButton.addEventListener('click', function() {
    gameDifficulty = 'hard';
    message.textContent = "Difficulty set to Hard";
    message.classList.remove('ellipsis');
});


// Get Player Move
function handleCellClick(event) {
    if (!gameActive || gameBoard[event.target.getAttribute("data-index")] !== "" || currentPlayer === "O") return;

    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin(currentPlayer, gameBoard)) {
        message.textContent = `Player ${currentPlayer} wins!`;
        message.classList.remove('ellipsis');
        gameActive = false;
        return;
    } else if (gameBoard.every(cell => cell != "")) {
        message.textContent = `It's a tie!`;
        message.classList.remove('ellipsis');
        gameActive = false;
        return;
    }

    currentPlayer = "O";
    message.textContent = `Computer's turn`;
    message.classList.add('ellipsis');
    setTimeout(computerMove, 1000);
}

//Get Computer Move
function computerMove() {
    if (!gameActive) return;

    let computerMove;

    switch (gameDifficulty) {
        case "easy":
            computerMove = getEasyMove();
            break;
        case "medium":
            computerMove = getMediumMove();
            break;
        case "hard":
            computerMove = getHardMove();
            break;
    }

    gameBoard[computerMove] = currentPlayer;
    const cell = board.children[computerMove];
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin(currentPlayer, gameBoard)) {
        message.textContent = `Computer wins!`;
        message.classList.remove('ellipsis');
        gameActive = false;
        return;
    } else if (gameBoard.every(cell => cell != "")) {
        message.textContent = `It's a tie!`;
        message.classList.remove('ellipsis');
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    message.textContent = `Player's turn`;
    message.classList.add('ellipsis');
}


// Difficulties
function getEasyMove() {
    const availableMoves = gameBoard
    .map((val, index) => (val === "" ? index : null))
    .filter(val => val !== null);

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getMediumMove() {
    return getMove(0.3, getEasyMove);
}

function getHardMove() {
    return getMove(0.1, getMediumMove);
}

function getMove(threshold, fallbackMove) {
    const shouldBlock = Math.random() > threshold;
    let move;

    if (shouldBlock) {
        move = blockWinningMove();
        if (move !== -1) {
            return move;
        }
    }
    return fallbackMove();
}

function blockWinningMove() {
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === "") {
            // Check if O can win
            gameBoard[i] = "O";
            if (checkWin("O", gameBoard)) {
                return i;
            } else {
                gameBoard[i] = "";
            }

            // Check if X can win
            gameBoard[i] = "X";
            if (checkWin("X", gameBoard)) {
                gameBoard[i] = "O";
                return i;
            } else {
                gameBoard[i] = "";
            }
            
        }
    }
    return -1
}

function checkWin(currentPlayer, gameBoard) {
    return winningPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    gameActive = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Reset page board and update the message
    message.textContent = "Game has been reset";
    board.innerHTML = '';
    createBoard();

    // Activate game after short delay
    setTimeout(function() {
        gameActive = true;
        message.textContent = currentPlayer === "X" ? "Player's turn" : "Computer's turn";
        message.classList.add('ellipsis');
        

        if (currentPlayer === "O") {
            message.textContent = `Computer's turn`;
            message.classList.add('ellipsis');
            setTimeout(computerMove, 1000);
        }
    }, 1000);
}


// Create board on page
function createBoard() {
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

createBoard();
message.textContent = currentPlayer === "X" ? "Player's turn" : "Computer's turn";
message.classList.add('ellipsis');

