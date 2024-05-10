// Tic Tac Toe
class Agent {
    constructor() {}

    // check a board state for X, then all board states for O, then all for X, etc. until we hit a board that results in a 1
    // if a board can let X win, but we know we can't reach it because O gets in the way, its a draw.
    // once we recurse all the way through, we pick a board that results in a 1. if there are no 1s, pick a draw. if no draws, suffer.
    // Dynamically program a base case to end the calls. Recurse until we hit it.
    minimax(board, isMaximizing) {

        let gameOver = board.gameOver();
        switch(gameOver) {
            case 1: return 1;
            case 2: return -1;
            case 3: return 0;
        }
        var bestScore = isMaximizing ? -Infinity : Infinity;
        for (let i = 0; i < board.cells.length; i++) {
            let cell = i + 1;
            if (board.cellFree(cell)) {
                let newBoard = board.clone();
                newBoard.move(cell);
                let score = this.minimax(newBoard, !isMaximizing);
                bestScore = isMaximizing ? Math.max(bestScore, score): Math.min(bestScore, score);
            }
        }
        return bestScore;
    }

    // honestly not sure how else I would do this...
    selectMove(board) {
    // Define the initial best score and move
        let maxScore = -Infinity;
        let maxMove = null;

        let minScore = Infinity;
        let minMove = null;

        // Loop through each cell to evaluate the best move
        for (let i = 0; i < board.cells.length; i++) {
            let cell = i + 1;
            if (board.cellFree(cell)) {
                // Make a move on the current cell
                let newBoard = board.clone();
                newBoard.move(cell);

                // Calculate the score for the current move
                let score = this.minimax(newBoard, !board.playerOne);

                // Update the best move if the current move has a higher score
                if (score > maxScore) {
                    maxScore = score;
                    maxMove = cell;
                }
                if (score < minScore) {
                    minScore = score;
                    minMove = cell;
                }
            }
        }
        return board.playerOne ? maxMove : minMove;
    }

}