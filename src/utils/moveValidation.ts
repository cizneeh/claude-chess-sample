import type { Board, Piece, Position } from '../types';

export const isValidMove = (
  board: Board,
  from: Position,
  to: Position,
  piece: Piece,
): boolean => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;

  // Can't move to same position
  if (fromRow === toRow && fromCol === toCol) return false;

  // Can't move outside board
  if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;

  // Can't capture own piece
  const targetPiece = board[toRow][toCol];
  if (targetPiece && targetPiece.color === piece.color) return false;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(board, from, to, piece, rowDiff, colDiff);
    case 'rook':
      return isValidRookMove(board, from, to, rowDiff, colDiff);
    case 'bishop':
      return isValidBishopMove(board, from, to, absRowDiff, absColDiff);
    case 'queen':
      return isValidQueenMove(
        board,
        from,
        to,
        rowDiff,
        colDiff,
        absRowDiff,
        absColDiff,
      );
    case 'king':
      return isValidKingMove(absRowDiff, absColDiff);
    case 'knight':
      return isValidKnightMove(absRowDiff, absColDiff);
    default:
      return false;
  }
};

const isValidPawnMove = (
  board: Board,
  from: Position,
  to: Position,
  piece: Piece,
  rowDiff: number,
  colDiff: number,
): boolean => {
  const { row: fromRow } = from;
  const { row: toRow, col: toCol } = to;
  const direction = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;

  // Forward move
  if (colDiff === 0) {
    if (board[toRow][toCol]) return false; // Can't move forward to occupied square

    if (rowDiff === direction) return true; // One square forward
    if (fromRow === startRow && rowDiff === 2 * direction) return true; // Two squares from start
  }

  // Diagonal capture
  if (Math.abs(colDiff) === 1 && rowDiff === direction) {
    return board[toRow][toCol] !== null; // Must capture a piece
  }

  return false;
};

const isValidRookMove = (
  board: Board,
  from: Position,
  to: Position,
  rowDiff: number,
  colDiff: number,
): boolean => {
  if (rowDiff !== 0 && colDiff !== 0) return false; // Must move in straight line

  return isPathClear(board, from, to);
};

const isValidBishopMove = (
  board: Board,
  from: Position,
  to: Position,
  absRowDiff: number,
  absColDiff: number,
): boolean => {
  if (absRowDiff !== absColDiff) return false; // Must move diagonally

  return isPathClear(board, from, to);
};

const isValidQueenMove = (
  board: Board,
  from: Position,
  to: Position,
  rowDiff: number,
  colDiff: number,
  absRowDiff: number,
  absColDiff: number,
): boolean => {
  // Queen combines rook and bishop moves
  const isRookMove = rowDiff === 0 || colDiff === 0;
  const isBishopMove = absRowDiff === absColDiff;

  if (!isRookMove && !isBishopMove) return false;

  return isPathClear(board, from, to);
};

const isValidKingMove = (absRowDiff: number, absColDiff: number): boolean => {
  return absRowDiff <= 1 && absColDiff <= 1;
};

const isValidKnightMove = (absRowDiff: number, absColDiff: number): boolean => {
  return (
    (absRowDiff === 2 && absColDiff === 1) ||
    (absRowDiff === 1 && absColDiff === 2)
  );
};

const isPathClear = (board: Board, from: Position, to: Position): boolean => {
  const { row: fromRow, col: fromCol } = from;
  const { row: toRow, col: toCol } = to;

  const rowStep = toRow === fromRow ? 0 : toRow > fromRow ? 1 : -1;
  const colStep = toCol === fromCol ? 0 : toCol > fromCol ? 1 : -1;

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== null) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
};
