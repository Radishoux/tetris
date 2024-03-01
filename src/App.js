import React, { useState, useEffect } from 'react';
import './App.css';

// The shape of the Tetromino
const tetromino = [
  [1, 1, 1, 1]
];

// The initial position of the Tetromino
const initialPosition = { x: 5, y: 0 };

// The initial state of the game board
const initialBoard = Array.from({length: 20}, () => Array(10).fill(0));

function Tetris() {
  const [position, setPosition] = useState(initialPosition);
  const [board, setBoard] = useState(initialBoard);

  // Function to render the game board
  const renderBoard = () => {
    return board.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const isTetrominoCell = position.y === rowIndex && position.x === cellIndex;
        return <div key={`${rowIndex}-${cellIndex}`} className={`cell ${isTetrominoCell ? 'filled' : ''}`}></div>
      });
    });
  };

  // Function to handle the keyboard events
  const handleKeyPress = (event) => {
    switch(event.key) {
      case 'ArrowUp':
        setPosition(prev => ({ ...prev, y: prev.y - 1 }));
        break;
      case 'ArrowDown':
        setPosition(prev => ({ ...prev, y: prev.y + 1 }));
        break;
      case 'ArrowLeft':
        setPosition(prev => ({ ...prev, x: prev.x - 1 }));
        break;
      case 'ArrowRight':
        setPosition(prev => ({ ...prev, x: prev.x + 1 }));
        break;
      default:
        break;
    }
  };

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        // If the Tetromino is at the bottom of the board, don't update its position
        if (prev.y >= board.length - 1) {
          return prev;
        }

        // Otherwise, move the Tetromino down
        return { x: prev.x, y: prev.y + 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [board]);


  return (
    <div className="board">
      {renderBoard()}
    </div>
  );
}

export default Tetris;