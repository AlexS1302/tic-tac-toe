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
    let gameDifficulty = 'easy'
    console.log('Difficulty set to Easy');
});

mediumButton.addEventListener('click', function() {
    let gameDifficulty = 'medium'
    console.log('Difficulty set to Medium');
});

hardButton.addEventListener('click', function() {
    let gameDifficulty = 'hard'
    console.log('Difficulty set to Hard');
});

function handleCellClick(event) {
    if (!gameActive || gameState[event.target.getAttribute("data-index")] !== "" || currentPlayer === "O") return;

    const cell = event.target;
    const cellIndex = cell.getAttribute("data-index");

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
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

