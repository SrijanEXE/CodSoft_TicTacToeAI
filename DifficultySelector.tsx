import React from 'react';
import { Difficulty } from '../types/game';
import { Brain, Zap, Shield } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled: boolean;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  onDifficultyChange,
  disabled
}) => {
  const difficulties: Array<{ value: Difficulty; label: string; icon: React.ReactNode; color: string }> = [
    { value: 'easy', label: 'Easy', icon: <Zap className="w-4 h-4" />, color: 'green' },
    { value: 'medium', label: 'Medium', icon: <Brain className="w-4 h-4" />, color: 'yellow' },
    { value: 'impossible', label: 'Impossible', icon: <Shield className="w-4 h-4" />, color: 'red' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 lg:p-6 max-w-md mx-auto">
      <h3 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 lg:mb-4 text-center">AI Difficulty</h3>
      
      <div className="grid grid-cols-3 gap-1 lg:gap-2">
        {difficulties.map(({ value, label, icon, color }) => (
          <button
            key={value}
            onClick={() => onDifficultyChange(value)}
            disabled={disabled}
            className={`
              p-2 lg:p-3 rounded-lg border-2 transition-all duration-200
              flex flex-col items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium
              ${difficulty === value
                ? `border-${color}-400 bg-${color}-50 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-400`
                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
            `}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.charAt(0)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};