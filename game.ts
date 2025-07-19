export type Player = 'X' | 'O' | null;
export type Board = Player[][];
export type GameState = 'playing' | 'won' | 'draw';
export type Difficulty = 'easy' | 'medium' | 'impossible';

export interface GameStats {
  playerWins: number;
  aiWins: number;
  draws: number;
  gamesPlayed: number;
}

export interface MoveResult {
  row: number;
  col: number;
  score: number;
}

export type Theme = 'light' | 'dark';