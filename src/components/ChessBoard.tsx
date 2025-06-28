import React from 'react'
import { Board, Position, Piece } from '../types'

interface ChessBoardProps {
  board: Board
  selectedSquare: Position | null
  onSquareClick: (position: Position) => void
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  board,
  selectedSquare,
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
    }
    return symbols[piece.color][piece.type]
  }

  const isSelected = (row: number, col: number): boolean => {
    return selectedSquare?.row === row && selectedSquare?.col === col
  }

  const getSquareColor = (row: number, col: number): string => {
    const isLight = (row + col) % 2 === 0
    if (isSelected(row, col)) {
      return isLight ? 'bg-yellow-300' : 'bg-yellow-600'
    }
    return isLight ? 'bg-amber-100' : 'bg-amber-800'
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 w-96 h-96 border-2 border-gray-800">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              ${getSquareColor(rowIndex, colIndex)}
              flex items-center justify-center
              cursor-pointer
              text-4xl
              hover:brightness-110
              aspect-square
            `}
            onClick={() => onSquareClick({ row: rowIndex, col: colIndex })}
          >
            {piece && getPieceSymbol(piece)}
          </div>
        )),
      )}
    </div>
  )
}

export default ChessBoard
