import React, { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStatsComponent } from './components/GameStats';
import { DifficultySelector } from './components/DifficultySelector';
import { ThemeToggle } from './components/ThemeToggle';
import { useGameState } from './hooks/useGameState';
import { useTheme } from './hooks/useTheme';
import { Bot, RotateCcw, Trophy, Brain } from 'lucide-react';

function App() {
  const {
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
  } = useGameState();

  const { theme, toggleTheme } = useTheme();

  // Auto-trigger AI moves
  useEffect(() => {
    if (currentPlayer === 'O' && gameState === 'playing') {
      makeAiMove();
    }
  }, [currentPlayer, gameState, makeAiMove]);

  const getGameStatusMessage = () => {
    if (isAiThinking) {
      return (
        <div className="flex items-center gap-2 text-orange-600">
          <Bot className="w-5 h-5 animate-bounce" />
          <span>AI is thinking...</span>
        </div>
      );
    }
    
    if (gameState === 'won') {
      return winner === 'X' ? (
        <div className="flex items-center gap-2 text-green-600">
          <Trophy className="w-5 h-5" />
          <span>You won! Congratulations!</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-600">
          <Bot className="w-5 h-5" />
          <span>AI wins! Better luck next time!</span>
        </div>
      );
    }
    
    if (gameState === 'draw') {
      return (
        <div className="flex items-center gap-2 text-blue-600">
          <span>It's a draw! Well played!</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <span>Your turn! Click a cell to make your move.</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-4 px-4 transition-colors duration-300">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2 lg:mb-4 flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-blue-600" />
            Tic-Tac-Toe AI
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Challenge our intelligent AI powered by the Minimax algorithm with Alpha-Beta pruning. 
            Can you beat the unbeatable?
          </p>
        </div>

        {/* Game Status */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 bg-white dark:bg-gray-800 rounded-full shadow-md text-sm lg:text-lg font-medium">
            {getGameStatusMessage()}
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 items-start">
          {/* Difficulty Selector */}
          <div className="order-2 lg:order-1">
            <DifficultySelector
              difficulty={difficulty}
              onDifficultyChange={setDifficulty}
              disabled={gameState === 'playing' && !isAiThinking}
            />
          </div>

          {/* Game Board */}
          <div className="order-1 lg:order-2">
            <GameBoard
              board={board}
              onCellClick={makePlayerMove}
              disabled={currentPlayer !== 'X' || gameState !== 'playing' || isAiThinking}
            />
            
            {/* Game Controls */}
            <div className="mt-4 lg:mt-6 flex justify-center gap-3 lg:gap-4">
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm lg:text-base
                         transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                New Game
              </button>
              
              <button
                onClick={resetStats}
                className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium text-sm lg:text-base
                         transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Reset Stats
              </button>
            </div>
          </div>

          {/* Game Statistics */}
          <div className="order-3">
            <GameStatsComponent stats={stats} />
          </div>
        </div>

        {/* Algorithm Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6 max-w-4xl mx-auto">
          <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 lg:mb-4">About the AI</h3>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 lg:mb-2 text-sm lg:text-base">Minimax Algorithm</h4>
              <p>
                The AI uses the Minimax algorithm to evaluate all possible game states 
                and choose the optimal move. It assumes both players play perfectly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 lg:mb-2 text-sm lg:text-base">Alpha-Beta Pruning</h4>
              <p>
                This optimization technique reduces the number of nodes evaluated 
                in the search tree, making the AI faster without sacrificing optimality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 lg:mb-2 text-sm lg:text-base">Difficulty Levels</h4>
              <p>
                Easy and Medium modes introduce strategic mistakes to provide 
                different challenge levels while maintaining engaging gameplay.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 lg:mb-2 text-sm lg:text-base">Optimal Play</h4>
              <p>
                On Impossible mode, the AI never loses. The best outcome for 
                a human player is a draw when playing optimally.
              </p>
            </div>
          </div>
        </div>

        {/* Creator Footer */}
        <div className="text-center py-6 lg:py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div className="text-sm lg:text-base">
              <span className="text-gray-600 dark:text-gray-400">Created by </span>
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Srijan Samanta
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;