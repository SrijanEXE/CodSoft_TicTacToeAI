import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types/game';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-2 right-2 lg:top-4 lg:right-4 p-2 lg:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg 
                 border border-gray-200 dark:border-gray-700 hover:shadow-xl 
                 transition-all duration-200 hover:scale-105 z-10"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
      )}
    </button>
  );
};