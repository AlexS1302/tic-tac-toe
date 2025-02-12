
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
            // implement later
            const winningPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ]
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

