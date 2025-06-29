import { useState } from 'react';
import type { Board, Color, Position } from '../types';
import { createInitialBoard } from '../utils/initialBoard';
import { isValidMove } from '../utils/moveValidation';
import { getValidMoves } from '../utils/validMoves';

export const useChessGame = () => {
  const [board, setBoard] = useState<Board>(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Color>('white');
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);

  const handleSquareClick = (position: Position) => {
    const { row, col } = position;
    const piece = board[row][col];

    if (selectedSquare) {
      // Try to move
      const selectedPiece = board[selectedSquare.row][selectedSquare.col];

      if (selectedPiece && selectedPiece.color === currentPlayer) {
        if (isValidMove(board, selectedSquare, position, selectedPiece)) {
          // Make the move
          const newBoard = board.map((row) => [...row]);
          newBoard[row][col] = selectedPiece;
          newBoard[selectedSquare.row][selectedSquare.col] = null;

          setBoard(newBoard);
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        }
      }

      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      // Select piece
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
        setValidMoves(getValidMoves(board, position));
      }
    }
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setValidMoves([]);
  };

  return {
    board,
    currentPlayer,
    selectedSquare,
    validMoves,
    handleSquareClick,
    resetGame,
  };
};
