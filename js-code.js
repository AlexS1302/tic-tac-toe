
// Gameboard
const gameBoard = (function () {
    function createGameboard() {
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        function placeSymbol(row, col, symbol) {
            if (board[row][col] === '') {
                board[row][col] = symbol;
                return true;
            }
            return false;
        }

        function checkWinOrTie() {
            const winningPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];
            // Flatten it into a 1D array
            const flatBoard = board.flat();

            // Win
            for (let pattern of winningPatterns) {
                const [a, b, c] = pattern; //indices
                if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
                    return flatBoard[a];
                }
            }

            // Tie
            if (flatBoard.every(cell => cell !== '')) {
                return "It's a tie!";
            }

            return null;

        }

        function resetBoard() {
            for (let row = 0; row < board.length; row++) {
                for (let col = 0; col < board[row].length; col++) {
                    board[row][col] = '';
                }
            }
        }

        return {board, placeSymbol, checkWinOrTie, resetBoard};
    }

    return {createGameboard};
})();


// Players
const Player = (function() {
    function createPlayer(name, symbol) {
        return { name, symbol};
    }
    return {createPlayer};
})();

// Computer Player & Difficulty

const computerPlayer = (function() {
    function createComputerPlayer(difficulty) {
        function computerMove(board, symbol) {
            if (difficulty === 'Easy') {
                return easyMove(board, symbol);
            } else if (difficulty === 'Medium') {
                return mediumMove(board, symbol); 
            } else if (difficulty === 'Hard') {
                return hardMove(board, symbol);
            }
        }
    }
})



// Game Control
const gameControl = (function() {
    function createGame() {
        const board =  gameBoard.createGameboard();
        const players = [];
        let currentPlayerIndex = 0;
        let isGameOver = false;

        function addPlayer(player) {
            players.push(player)
        }

        function addComputerPlayer(difficulty) {
            computerPlayer = computerPlayer.createComputerPlayer(difficulty);
        }

        function getCurrentPlayer() {
            return players[currentPlayerIndex];
        }

        function switchPlayer() {
            currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
        }

        function getPlayerBySymbol(symbol) {
            return players.find(player => player.symbol === symbol)
        }

        function playMove(row, col) {
            if (!isGameOver && board.placeSymbol(row, col, getCurrentPlayer().symbol)) {
                const result = board.checkWinOrTie();
                if(result) {
                    if (result === "It's a tie!") {
                        console.log(result)
                    } else {
                        const winningPlayer = getPlayerBySymbol(result);
                        console.log(`${winningPlayer.name} wins!`);
                    }
                    isGameOver = true;
                } else {
                    switchPlayer();
                }
            }
        }
        return { addPlayer, getCurrentPlayer, playMove};
    }
    return { createGame };
})();

const player1 = Player.createPlayer('Player 1', 'X');
const player2 = Player.createPlayer('Computer', 'O');

// Initialise the game
const game = gameControl.createGame();
game.addPlayer(player1);
game.addComputerPlayer('Easy');

console.log(`Current Player: ${game.getCurrentPlayer().name}`);
game.playMove(0, 0);


