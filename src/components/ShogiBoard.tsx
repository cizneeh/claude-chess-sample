import type React from 'react';
import type { Board, Piece, Position } from '../types';

interface ShogiboardProps {
  board: Board;
  selectedSquare: Position | null;
  validMoves: Position[];
  onSquareClick: (position: Position) => void;
}

const ShogiBoard: React.FC<ShogiboardProps> = ({
  board,
  selectedSquare,
  validMoves,
  onSquareClick,
}) => {
  const getPieceSymbol = (piece: Piece): string => {
    const symbols = {
      sente: {
        king: '王',
        rook: '飛',
        bishop: '角',
        gold: '金',
        silver: '銀',
        knight: '桂',
        lance: '香',
        pawn: '歩',
      },
      gote: {
        king: '玉',
        rook: '飛',
        bishop: '角',
        gold: '金',
        silver: '銀',
        knight: '桂',
        lance: '香',
        pawn: '歩',
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
    if (isSelected(row, col)) {
      return 'bg-yellow-300';
    }

    if (isValidMove(row, col)) {
      return 'bg-green-300';
    }

    return 'bg-amber-50'; // 将棋盤の色
  };

  return (
    <div className="grid grid-cols-9 grid-rows-9 w-[600px] h-[600px] border-4 border-gray-900 shadow-xl">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: 将棋盤の位置は固定で適切
            key={`square-${rowIndex}-${colIndex}`}
            className={`
              ${getSquareColor(rowIndex, colIndex)}
              flex items-center justify-center
              cursor-pointer
              text-3xl font-bold
              hover:brightness-110
              aspect-square
              border border-gray-400
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

export default ShogiBoard;
