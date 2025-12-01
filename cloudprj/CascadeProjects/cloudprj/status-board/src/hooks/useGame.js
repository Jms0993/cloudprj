import { useState, useCallback } from 'react';

const GRID_SIZE = 4;

export const useGame = () => {
  const [grid, setGrid] = useState(initializeGrid());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore') || '0', 10);
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  function initializeGrid() {
    const newGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    return newGrid;
  }

  const resetGame = useCallback(() => {
    setGrid(initializeGrid());
    setScore(0);
    setIsGameOver(false);
    setWon(false);
    setKeepPlaying(false);
  }, []);

  const addRandomTile = (grid) => {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
    return grid;
  };

  const checkGameOver = (grid) => {
    // Check for any empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] === 0) return false;
        // Check right neighbor
        if (j < GRID_SIZE - 1 && grid[i][j] === grid[i][j + 1]) return false;
        // Check bottom neighbor
        if (i < GRID_SIZE - 1 && grid[i][j] === grid[i + 1][j]) return false;
      }
    }
    return true;
  };

  const moveTiles = useCallback((direction) => {
    setGrid(prevGrid => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      let moved = false;
      let newScore = score;

      // Process the grid based on direction
      const processGrid = (grid) => {
        for (let i = 0; i < GRID_SIZE; i++) {
          const row = [];
          const newRow = [];
          
          // Extract non-zero values
          for (let j = 0; j < GRID_SIZE; j++) {
            const value = direction === 'left' || direction === 'right' ? grid[i][j] : grid[j][i];
            if (value !== 0) row.push(value);
          }

          // Merge tiles
          for (let j = 0; j < row.length; j++) {
            if (row[j] === row[j + 1]) {
              const merged = row[j] * 2;
              newRow.push(merged);
              newScore += merged;
              
              // Check for win condition
              if (merged === 2048 && !won && !keepPlaying) {
                setWon(true);
                setIsGameOver(true);
              }
              
              j++; // Skip next element as it's merged
              moved = true;
            } else {
              newRow.push(row[j]);
              if (j > 0 && row[j - 1] === 0) moved = true;
            }
          }

          // Fill remaining with zeros
          while (newRow.length < GRID_SIZE) newRow.push(0);

          // Reverse if needed
          if (direction === 'right' || direction === 'down') newRow.reverse();

          // Update the grid
          for (let j = 0; j < GRID_SIZE; j++) {
            if (direction === 'left' || direction === 'right') {
              if (newGrid[i][j] !== newRow[j]) moved = true;
              newGrid[i][j] = newRow[j];
            } else {
              if (newGrid[j][i] !== newRow[j]) moved = true;
              newGrid[j][i] = newRow[j];
            }
          }
        }
      };

      // Transpose grid for up/down movements
      if (direction === 'up' || direction === 'down') {
        const transposed = newGrid[0].map((_, i) => newGrid.map(row => row[i]));
        processGrid(transposed);
      } else {
        processGrid(newGrid);
      }

      // Update score and add new tile if moved
      if (moved) {
        setScore(newScore);
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('bestScore', newScore);
        }
        
        addRandomTile(newGrid);
        
        // Check for game over
        if (checkGameOver(newGrid)) {
          setIsGameOver(true);
        }
      }

      return newGrid;
    });
  }, [score, bestScore, won, keepPlaying]);

  return {
    grid,
    score,
    bestScore,
    isGameOver,
    won,
    keepPlaying,
    setKeepPlaying,
    resetGame,
    moveTiles,
  };
};
