import type React from 'react';
import type { Board, Piece, Position } from '../types';

interface ChessBoardProps {
  board: Board;
  selectedSquare: Position | null;
  validMoves: Position[];
  onSquareClick: (position: Position) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedSquare,
  validMoves,
  onSquareClick,
}) => {
  const getPieceSymbol = (piece: Piece): string => {
    const symbols = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙',
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟',
      },
    };
    return symbols[piece.color][piece.type];
  };

  const isSelected = (row: number, col: number): boolean => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  };

  const isValidMove = (row: number, col: number): boolean => {
    return validMoves.some((move) => move.row === row && move.col === col);
  };

  const getSquareColor = (row: number, col: number): string => {
    const isLight = (row + col) % 2 === 0;

    if (isSelected(row, col)) {
      return isLight ? 'bg-yellow-300' : 'bg-yellow-500';
    }

    if (isValidMove(row, col)) {
      return isLight ? 'bg-green-300' : 'bg-green-500';
    }

    return isLight ? 'bg-stone-200' : 'bg-stone-600';
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-[600px] h-[600px] border-4 border-gray-900 shadow-xl">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: チェス盤の位置は固定で適切
            key={`square-${rowIndex}-${colIndex}`}
            className={`
              ${getSquareColor(rowIndex, colIndex)}
              flex items-center justify-center
              cursor-pointer
              text-6xl
              hover:brightness-110
              aspect-square
              border border-gray-600
              transition-all duration-150
            `}
            role="button"
            tabIndex={0}
            onClick={() => onSquareClick({ row: rowIndex, col: colIndex })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSquareClick({ row: rowIndex, col: colIndex });
              }
            }}
          >
            {piece && getPieceSymbol(piece)}
          </div>
        )),
      )}
    </div>
  );
};

export default ChessBoard;
