
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
                    return `${flatBoard[a]} wins!`
                }
            }

            // Tie
            if (flatBoard.every(cell => cell !== '')) {
                return "It's a tie!";
            }

            return null;

        }

        return {board, placeSymbol, checkWinOrTie};
    }

    return {createGameboard};
})();


// Players
const Player = (function() {
    function createPlayer(name, symbol) {
        return { name, symbol};
    }
    return {createPlayer};
})

// Game Control

const gameControl = (function() {
    function createGame() {
        const board =  gameBoard.createGameboard();
        const players = [
            Player.createPlayer('Player 1', 'X'),
            Player.createPlayer('Player 2', 'O')
        ];
        let currentPlayerIndex = 0;
        let isGameOver = false;

        function getCurrentPlayer() {
            return players[currentPlayerIndex];
        }

        function switchPlayer() {
            currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
        }

        function playMove(row, col) {
            if (!isGameOver && board.placeSymbol(row, col, getCurrentPlayer().symbol)) {
                const result = board.checkWinOrTie();
                if(result) {
                    console.log(result);
                    isGameOver = true
                } else {
                    switchPlayer();
                }
            }
        }
        return { getCurrentPlayer, playMove};
    }
    return { createGame };
})();