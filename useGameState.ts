import { useState, useCallback } from 'react';
import { Board, Player, GameState, GameStats, Difficulty } from '../types/game';
import { createEmptyBoard, getGameState, makeMove, isValidMove, checkWinner } from '../utils/gameLogic';
import { getBestMove } from '../utils/minimax';

export const useGameState = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [winner, setWinner] = useState<Player>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('impossible');
  const [stats, setStats] = useState<GameStats>({
    playerWins: 0,
    aiWins: 0,
    draws: 0,
    gamesPlayed: 0
  });

  const updateGameState = useCallback((newBoard: Board) => {
    const newGameState = getGameState(newBoard);
    const newWinner = checkWinner(newBoard);
    
    setGameState(newGameState);
    setWinner(newWinner);
    
    if (newGameState !== 'playing') {
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          gamesPlayed: prevStats.gamesPlayed + 1
        };
        
        if (newWinner === 'X') {
          newStats.playerWins += 1;
        } else if (newWinner === 'O') {
          newStats.aiWins += 1;
        } else {
          newStats.draws += 1;
        }
        
        return newStats;
      });
    }
  }, []);

  const makePlayerMove = useCallback((row: number, col: number) => {
    if (gameState !== 'playing' || currentPlayer !== 'X' || isAiThinking) return false;
    
    if (!isValidMove(board, row, col)) return false;
    
    try {
      const newBoard = makeMove(board, row, col, 'X');
      setBoard(newBoard);
      setCurrentPlayer('O');
      updateGameState(newBoard);
      return true;
    } catch (error) {
      console.error('Invalid move:', error);
      return false;
    }
  }, [board, gameState, currentPlayer, isAiThinking, updateGameState]);

  const makeAiMove = useCallback(async () => {
    if (gameState !== 'playing' || currentPlayer !== 'O') return;
    
    setIsAiThinking(true);
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const bestMove = getBestMove(board, difficulty);
      const newBoard = makeMove(board, bestMove.row, bestMove.col, 'O');
      setBoard(newBoard);
      setCurrentPlayer('X');
      updateGameState(newBoard);
    } catch (error) {
      console.error('AI move error:', error);
    } finally {
      setIsAiThinking(false);
    }
  }, [board, gameState, currentPlayer, difficulty, updateGameState]);

  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setGameState('playing');
    setWinner(null);
    setIsAiThinking(false);
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      playerWins: 0,
      aiWins: 0,
      draws: 0,
      gamesPlayed: 0
    });
  }, []);

  return {
    board,
    currentPlayer,
    gameState,
    winner,
    isAiThinking,
    difficulty,
    stats,
    makePlayerMove,
    makeAiMove,
    resetGame,
    resetStats,
    setDifficulty
  };
};