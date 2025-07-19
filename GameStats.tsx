import React from 'react';
import { GameStats } from '../types/game';
import { Trophy, Target, Users } from 'lucide-react';

interface GameStatsProps {
  stats: GameStats;
}

export const GameStatsComponent: React.FC<GameStatsProps> = ({ stats }) => {
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.playerWins / stats.gamesPlayed) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6 max-w-md mx-auto">
      <h3 className="text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 lg:mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500" />
        Game Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-2 lg:gap-4">
        <div className="text-center p-2 lg:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-xl lg:text-2xl font-bold text-blue-600">{stats.playerWins}</div>
          <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Your Wins</div>
        </div>
        
        <div className="text-center p-2 lg:p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="text-xl lg:text-2xl font-bold text-orange-600">{stats.aiWins}</div>
          <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">AI Wins</div>
        </div>
        
        <div className="text-center p-2 lg:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-xl lg:text-2xl font-bold text-gray-600 dark:text-gray-300">{stats.draws}</div>
          <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Draws</div>
        </div>
        
        <div className="text-center p-2 lg:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-xl lg:text-2xl font-bold text-green-600">{winRate}%</div>
          <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Win Rate</div>
        </div>
      </div>

      <div className="mt-3 lg:mt-4 flex items-center justify-center gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400">
        <Users className="w-4 h-4" />
        <span>Total Games: {stats.gamesPlayed}</span>
      </div>
    </div>
  );
};