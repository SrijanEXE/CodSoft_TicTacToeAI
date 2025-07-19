import { Player, Board, GameState } from '../types/game';

export const createEmptyBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export const checkWinner = (board: Board): Player => {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const getGameState = (board: Board): GameState => {
  const winner = checkWinner(board);
  if (winner) return 'won';
  if (isBoardFull(board)) return 'draw';
  return 'playing';
};

export const getAvailableMoves = (board: Board): Array<{ row: number; col: number }> => {
  const moves = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        moves.push({ row, col });
      }
    }
  }
  return moves;
};

export const makeMove = (board: Board, row: number, col: number, player: Player): Board => {
  if (board[row][col] !== null) {
    throw new Error('Invalid move: cell already occupied');
  }
  
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = player;
  return newBoard;
};

export const isValidMove = (board: Board, row: number, col: number): boolean => {
  return row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === null;
};