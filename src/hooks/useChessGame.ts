import { useState } from 'react';
import { Board, Position, Color } from '../types';
import { createInitialBoard } from '../utils/initialBoard';
import { isValidMove } from '../utils/moveValidation';

export const useChessGame = () => {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Color>('white');
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

  const handleSquareClick = (position: Position) => {
    const { row, col } = position;
    const piece = board[row][col];

    if (selectedSquare) {
      // Try to move
      const selectedPiece = board[selectedSquare.row][selectedSquare.col];
      
      if (selectedPiece && selectedPiece.color === currentPlayer) {
        if (isValidMove(board, selectedSquare, position, selectedPiece)) {
          // Make the move
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = selectedPiece;
          newBoard[selectedSquare.row][selectedSquare.col] = null;
          
          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        }
      }
      
      setSelectedSquare(null);
    } else {
      // Select piece
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
      }
    }
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('white');
    setSelectedSquare(null);
  };

  return {
    board,
    currentPlayer,
    selectedSquare,
    handleSquareClick,
    resetGame
  };
};