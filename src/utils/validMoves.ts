import type { Board, Position } from '../types';
import { isValidMove } from './moveValidation';

export const getValidMoves = (
  board: Board,
  fromPosition: Position,
): Position[] => {
  const validMoves: Position[] = [];
  const piece = board[fromPosition.row][fromPosition.col];

  if (!piece) return validMoves;

  // 全てのマスをチェックして有効な移動先を見つける
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const toPosition = { row, col };

      if (isValidMove(board, fromPosition, toPosition, piece)) {
        validMoves.push(toPosition);
      }
    }
  }

  return validMoves;
};
