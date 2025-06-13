import React, { useState, useEffect } from 'react';

const SimpleSudoku = () => {
  // Simple puzzle with solution
  const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const [puzzle, setPuzzle] = useState(initialPuzzle.map(row => [...row]));
  const [selectedCell, setSelectedCell] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [lastCatEat, setLastCatEat] = useState(Date.now());
  const [showInstructions, setShowInstructions] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [catAnimation, setCatAnimation] = useState(null);

  // Difficulty settings
  const difficultySettings = {
    'easy': { catTime: 600000, label: 'Easy (10 min)', color: 'bg-green-500', textColor: 'text-green-600' },
    'just so so': { catTime: 300000, label: 'Just So So (5 min)', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    'hard': { catTime: 120000, label: 'Hard (2 min)', color: 'bg-orange-500', textColor: 'text-orange-600' },
    'hell': { catTime: 60000, label: 'Hell (1 min)', color: 'bg-red-500', textColor: 'text-red-600' }
  };

  const currentDifficulty = difficultySettings[difficulty];
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);

        // Cat eats a number every 5 minutes (300000ms)
        if (now - lastCatEat >= 300000) {
          catEatsNumber();
          setLastCatEat(now);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime, lastCatEat]);

  const catEatsNumber = () => {
    // Find all player-filled cells (not from initial puzzle)
    const playerCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (initialPuzzle[row][col] === 0 && puzzle[row][col] !== 0) {
          playerCells.push({ row, col });
        }
      }
    }

    // Randomly select one to "eat"
    if (playerCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * playerCells.length);
      const { row, col } = playerCells[randomIndex];

      // Calculate cell position for cat animation
      const cellElement = document.querySelector(`[data-cell="${row}-${col}"]`);
      if (cellElement) {
        const rect = cellElement.getBoundingClientRect();
        const containerRect = document.querySelector('.sudoku-container').getBoundingClientRect();

        // Position relative to container
        const targetX = rect.left - containerRect.left + rect.width / 2;
        const targetY = rect.top - containerRect.top + rect.height / 2;

        // Start cat animation
        setCatAnimation({
          targetX,
          targetY,
          targetRow: row,
          targetCol: col,
          phase: 'crawling'
        });

        // Phase 1: Crawling (2 seconds)
        setTimeout(() => {
          setCatAnimation(prev => ({ ...prev, phase: 'squatting' }));
        }, 2000);

        // Phase 2: Squatting and eating (1.5 seconds)
        setTimeout(() => {
          setCatAnimation(prev => ({ ...prev, phase: 'eating' }));

          // Actually remove the number
          const newPuzzle = puzzle.map(r => [...r]);
          newPuzzle[row][col] = 0;
          setPuzzle(newPuzzle);
        }, 3000);

        // Phase 3: Cleanup (1 second)
        setTimeout(() => {
          setCatAnimation(null);
        }, 4500);
      }
    }
  };

  const checkComplete = (puzzleToCheck) => {
    // Check if puzzle is complete and valid
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzleToCheck[row][col] === 0) return false;
      }
    }
    return true;
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 5000);
  };

  // Format time display
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isValidMove = (row, col, num) => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && puzzle[row][i] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && puzzle[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (i !== row && j !== col && puzzle[i][j] === num) return false;
      }
    }

    return true;
  };

  const handleCellClick = (row, col) => {
    if (initialPuzzle[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (num) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      if (isValidMove(row, col, num)) {
        const newPuzzle = puzzle.map(r => [...r]);
        newPuzzle[row][col] = num;
        setPuzzle(newPuzzle);

        // Check if puzzle is complete
        if (checkComplete(newPuzzle)) {
          setIsComplete(true);
          setIsActive(false); // Stop timer
          triggerFireworks();
        }
      }
    }
  };

  const clearCell = () => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const newPuzzle = puzzle.map(r => [...r]);
      newPuzzle[row][col] = 0;
      setPuzzle(newPuzzle);
    }
  };

  const resetGame = () => {
    setPuzzle(initialPuzzle.map(row => [...row]));
    setSelectedCell(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsActive(true);
    setLastCatEat(Date.now());
    setIsComplete(false);
    setShowFireworks(false);
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    // Reset cat timer when changing difficulty
    setLastCatEat(Date.now());
  };

  const pauseTimer = () => {
    setIsActive(!isActive);
  };

  const getCellClass = (row, col) => {
    let classes = "w-12 h-12 border border-gray-400 flex items-center justify-center text-lg font-semibold cursor-pointer ";

    // Thicker borders for 3x3 boxes
    if (row % 3 === 0) classes += "border-t-2 border-t-black ";
    if (col % 3 === 0) classes += "border-l-2 border-l-black ";
    if (row === 8) classes += "border-b-2 border-b-black ";
    if (col === 8) classes += "border-r-2 border-r-black ";

    // Cell coloring
    if (initialPuzzle[row][col] !== 0) {
      classes += "bg-gray-200 text-black ";
    } else if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes += "bg-blue-200 ";
    } else {
      classes += "bg-white hover:bg-gray-100 text-blue-600 ";
    }

    return classes;
  };

  // 移除顶级 return，将返回内容包裹在函数或组件内
const SudokuComponent = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">随机数独游戏</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {Object.entries(difficultySettings).map(([key, setting]) => (
            <button
              key={key}
              className={`px-4 py-2 rounded ${setting.color} text-white ${difficulty === key ? 'opacity-75' : ''}`}
              onClick={() => setDifficulty(key)}
              disabled={isComplete || !isActive}
            >
              {setting.label}
            </button>
          ))}
        </div>
        <div className="text-lg font-semibold text-gray-800">时间: {formatTime(elapsedTime)}</div>
      </div>
      <div className="sudoku-container mx-auto bg-white p-2 rounded shadow-lg">
        {puzzle.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                data-cell="{rowIndex}-{colIndex}"
                className={`w-12 h-12 border flex items-center justify-center ${initialPuzzle[rowIndex][colIndex] === 0 ? 'cursor-pointer' : 'bg-gray-200'} ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-blue-100' : ''} ${rowIndex % 3 === 2 && 'border-b-2'} ${colIndex % 3 === 2 && 'border-r-2'}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => handleNumberClick(num)}
            disabled={isComplete || !isActive}
          >
            {num}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          onClick={clearCell}
          disabled={isComplete || !isActive || !selectedCell}
        >
          清除
        </button>
        <button
          className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={resetGame}
        >
          重置
        </button>
      </div>
      {showFireworks && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="text-4xl font-bold text-green-600">恭喜完成！</div>
        </div>
      )}
      {catAnimation && (
        <div
          className="absolute transition-all duration-2000"
          style={{ left: `${catAnimation.targetX}px`, top: `${catAnimation.targetY}px` }}
        >
          <img src="cat.png" alt="Cat" className="w-12 h-12" />
        </div>
      )}
    </div>
  );
};

export default SimpleSudoku;

// 假设添加类型定义来解决问题
let selectedCell: { row: number; col: number } | null = null;

const setCatAnimation = (animation: { targetX: number; targetY: number; targetRow: number; targetCol: number; phase: string } | null) => {
  // ... existing code ...
const checkComplete = (puzzleToCheck) => {
  // Check if puzzle is complete and valid
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzleToCheck[row][col] === 0) return false;
    }
  }
  return true;
};

const triggerFireworks = () => {
  setShowFireworks(true);
  setTimeout(() => setShowFireworks(false), 5000);
};

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const isValidMove = (row, col, num) => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && puzzle[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && puzzle[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (i !== row && j !== col && puzzle[i][j] === num) return false;
    }
  }

  return true;
};

const handleCellClick = (row, col) => {
  if (initialPuzzle[row][col] === 0) {
    setSelectedCell({ row, col });
  }
};

const handleNumberClick = (num) => {
  if (selectedCell) {
    const { row, col } = selectedCell;
    if (isValidMove(row, col, num)) {
      const newPuzzle = puzzle.map(r => [...r]);
      newPuzzle[row][col] = num;
      setPuzzle(newPuzzle);

      // Check if puzzle is complete
      if (checkComplete(newPuzzle)) {
        setIsComplete(true);
        setIsActive(false); // Stop timer
        triggerFireworks();
      }
    }
  }
};

const clearCell = () => {
  if (selectedCell) {
    const { row, col } = selectedCell;
    const newPuzzle = puzzle.map(r => [...r]);
    newPuzzle[row][col] = 0;
    setPuzzle(newPuzzle);
  }
};

const resetGame = () => {
  setPuzzle(initialPuzzle.map(row => [...row]));
  setSelectedCell(null);
  setStartTime(Date.now());
  setElapsedTime(0);
  setIsActive(true);
  setLastCatEat(Date.now());
  setIsComplete(false);
  setShowFireworks(false);
};

const changeDifficulty = (newDifficulty) => {
  setDifficulty(newDifficulty);
  // Reset cat timer when changing difficulty
  setLastCatEat(Date.now());
};

const pauseTimer = () => {
  setIsActive(!isActive);
};

const getCellClass = (row, col) => {
  let classes = "w-12 h-12 border border-gray-400 flex items-center justify-center text-lg font-semibold cursor-pointer ";

  // Thicker borders for 3x3 boxes
  if (row % 3 === 0) classes += "border-t-2 border-t-black ";
  if (col % 3 === 0) classes += "border-l-2 border-l-black ";
  if (row === 8) classes += "border-b-2 border-b-black ";
  if (col === 8) classes += "border-r-2 border-r-black ";

  // Cell coloring
  if (initialPuzzle[row][col] !== 0) {
    classes += "bg-gray-200 text-black ";
  } else if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
    classes += "bg-blue-200 ";
  } else {
    classes += "bg-white hover:bg-gray-100 text-blue-600 ";
  }

  return classes;
};

return (
  <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">随机数独游戏</h1>
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        {Object.entries(difficultySettings).map(([key, setting]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded ${setting.color} text-white ${difficulty === key ? 'opacity-75' : ''}`}
            onClick={() => setDifficulty(key)}
            disabled={isComplete || !isActive}
          >
            {setting.label}
          </button>
        ))}
      </div>
      <div className="text-lg font-semibold text-gray-800">时间: {formatTime(elapsedTime)}</div>
    </div>
    <div className="sudoku-container mx-auto bg-white p-2 rounded shadow-lg">
      {puzzle.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              data-cell="{rowIndex}-{colIndex}"
              className={`w-12 h-12 border flex items-center justify-center ${initialPuzzle[rowIndex][colIndex] === 0 ? 'cursor-pointer' : 'bg-gray-200'} ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'bg-blue-100' : ''} ${rowIndex % 3 === 2 && 'border-b-2'} ${colIndex % 3 === 2 && 'border-r-2'}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className="mt-4 flex justify-center space-x-2">
      {Array.from({ length: 9 }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => handleNumberClick(num)}
          disabled={isComplete || !isActive}
        >
          {num}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={clearCell}
        disabled={isComplete || !isActive || !selectedCell}
      >
        清除
      </button>
      <button
        className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        onClick={resetGame}
      >
        重置
      </button>
    </div>
    {showFireworks && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="text-4xl font-bold text-green-600">恭喜完成！</div>
      </div>
    )}
    {catAnimation && (
      <div
        className="absolute transition-all duration-2000"
        style={{ left: `${catAnimation.targetX}px`, top: `${catAnimation.targetY}px` }}
      >
        <img src="cat.png" alt="Cat" className="w-12 h-12" />
      </div>
    )}
  </div>
);