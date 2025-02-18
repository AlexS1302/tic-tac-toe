const board = document.querySelector(".board");
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');

let currentPlayer = "X";
let gameActive = true;
let gameDifficulty = 'easy' //Default
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

//Event Listeners

easyButton.addEventListener('click', function() {
    let gameDifficulty = 'easy';
    console.log('Difficulty set to Easy');
});

mediumButton.addEventListener('click', function() {
    let gameDifficulty = 'medium';
    console.log('Difficulty set to Medium');
});

hardButton.addEventListener('click', function() {
    let gameDifficulty = 'hard';
    console.log('Difficulty set to Hard');
});

function handleCellClick(event) {
    if (!gameActive || gameBoard[event.target.getAttribute("data-index")] !== "" || currentPlayer === "O") return;

    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        console.log(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    } else if (gameBoard.every(cell => cell != "")) {
        console.log("It's a tie!")
        gameActive = false;
        return;
    }

    currentPlayer = "O";
    console.log("Computer's turn");
    setTimeout(computerMove, 1000);
}

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

    if (checkWin()) {
        console.log(`Computer wins!`);
        gameActive = false;
        return;
    } else if (gameBoard.every(cell => cell != "")) {
        console.log("It's a tie!")
        gameActive = false;
        return;
    }

    currentPlayer = "X";
}



function checkWin(currentPlayer, gameBoard = gameState) {
    return winningPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === currentPlayer);
    })
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

