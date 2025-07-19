import React from 'react';
import { Board, Player } from '../types/game';

interface GameBoardProps {
  board: Board;
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
  winningLine?: Array<{ row: number; col: number }>;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  board, 
  onCellClick, 
  disabled,
  winningLine = []
}) => {
  const isWinningCell = (row: number, col: number): boolean => {
    return winningLine.some(cell => cell.row === row && cell.col === col);
  };

  const getCellContent = (player: Player): string => {
    if (player === 'X') return '×';
    if (player === 'O') return '○';
    return '';
  };

  return (
    <div className="grid grid-cols-3 gap-1 sm:gap-2 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-xs sm:max-w-md mx-auto">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={disabled || cell !== null}
            className={`
              w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg border-2 border-gray-200 dark:border-gray-600
              flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold
              transition-all duration-200 ease-in-out
              ${cell === null && !disabled 
                ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-105 cursor-pointer' 
                : 'cursor-default'
              }
              ${isWinningCell(rowIndex, colIndex) 
                ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-500 animate-pulse' 
                : 'bg-gray-50 dark:bg-gray-700'
              }
              ${cell === 'X' ? 'text-blue-600 dark:text-blue-400' : ''}
              ${cell === 'O' ? 'text-orange-500 dark:text-orange-400' : ''}
              disabled:opacity-50
            `}
          >
            <span className={`transform transition-transform duration-200 ${
              cell ? 'scale-100 animate-bounce' : 'scale-0'
            }`}>
              {getCellContent(cell)}
            </span>
          </button>
        ))
      )}
    </div>
  );
};