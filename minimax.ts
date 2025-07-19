import { Board, Player, MoveResult, Difficulty } from '../types/game';
import { checkWinner, getAvailableMoves, makeMove, isBoardFull } from './gameLogic';

const SCORES = {
  'O': 10,  // AI wins
  'X': -10, // Human wins
  'draw': 0
};

export const evaluateBoard = (board: Board): number => {
  const winner = checkWinner(board);
  if (winner === 'O') return SCORES['O'];
  if (winner === 'X') return SCORES['X'];
  if (isBoardFull(board)) return SCORES['draw'];
  return 0;
};

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number => {
  const score = evaluateBoard(board);
  
  // Terminal node
  if (score !== 0 || isBoardFull(board)) {
    return score - (depth * (score > 0 ? 1 : -1)); // Prefer faster wins/slower losses
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    const moves = getAvailableMoves(board);
    
    for (const move of moves) {
      const newBoard = makeMove(board, move.row, move.col, 'O');
      const evaluation = minimax(newBoard, depth + 1, false, alpha, beta);
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      
      // Alpha-Beta pruning
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const moves = getAvailableMoves(board);
    
    for (const move of moves) {
      const newBoard = makeMove(board, move.row, move.col, 'X');
      const evaluation = minimax(newBoard, depth + 1, true, alpha, beta);
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      
      // Alpha-Beta pruning
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getBestMove = (board: Board, difficulty: Difficulty = 'impossible'): MoveResult => {
  const moves = getAvailableMoves(board);
  
  if (moves.length === 0) {
    throw new Error('No available moves');
  }

  // Easy mode: random moves 70% of the time
  if (difficulty === 'easy' && Math.random() < 0.7) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return { ...randomMove, score: 0 };
  }
  
  // Medium mode: random moves 30% of the time
  if (difficulty === 'medium' && Math.random() < 0.3) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return { ...randomMove, score: 0 };
  }

  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const newBoard = makeMove(board, move.row, move.col, 'O');
    const score = minimax(newBoard, 0, false);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return { ...bestMove, score: bestScore };
};