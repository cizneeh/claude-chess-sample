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
  if (toRow < 0 || toRow > 8 || toCol < 0 || toCol > 8) return false;

  // Can't capture own piece
  const targetPiece = board[toRow][toCol];
  if (targetPiece && targetPiece.color === piece.color) return false;

  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(piece, rowDiff, colDiff);
    case 'rook':
      return isValidRookMove(board, from, to, rowDiff, colDiff);
    case 'bishop':
      return isValidBishopMove(board, from, to, absRowDiff, absColDiff);
    case 'gold':
      return isValidGoldMove(absRowDiff, absColDiff, rowDiff, piece.color);
    case 'silver':
      return isValidSilverMove(absRowDiff, absColDiff, rowDiff, piece.color);
    case 'king':
      return isValidKingMove(absRowDiff, absColDiff);
    case 'knight':
      return isValidKnightMove(rowDiff, colDiff, piece.color);
    case 'lance':
      return isValidLanceMove(board, from, to, rowDiff, colDiff, piece.color);
    default:
      return false;
  }
};

// 歩兵の移動
const isValidPawnMove = (
  piece: Piece,
  rowDiff: number,
  colDiff: number,
): boolean => {
  const direction = piece.color === 'sente' ? -1 : 1;
  return rowDiff === direction && colDiff === 0;
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

// 金将の移動
const isValidGoldMove = (
  absRowDiff: number,
  absColDiff: number,
  rowDiff: number,
  color: string,
): boolean => {
  const direction = color === 'sente' ? -1 : 1;

  // 前、後、左、右、前斜め
  if (absRowDiff <= 1 && absColDiff <= 1) {
    // 後ろ斜めは不可
    if (rowDiff === -direction && absColDiff === 1) return false;
    return true;
  }
  return false;
};

// 銀将の移動
const isValidSilverMove = (
  absRowDiff: number,
  absColDiff: number,
  rowDiff: number,
  color: string,
): boolean => {
  const direction = color === 'sente' ? -1 : 1;

  // 前、前斜め、後ろ斜め
  if (absRowDiff <= 1 && absColDiff <= 1) {
    // 横と真後ろは不可
    if (rowDiff === 0 || (rowDiff === -direction && absColDiff === 0))
      return false;
    return true;
  }
  return false;
};

// 王将・玉将の移動
const isValidKingMove = (absRowDiff: number, absColDiff: number): boolean => {
  return absRowDiff <= 1 && absColDiff <= 1;
};

// 桂馬の移動
const isValidKnightMove = (
  rowDiff: number,
  colDiff: number,
  color: string,
): boolean => {
  const direction = color === 'sente' ? -1 : 1;
  return rowDiff === 2 * direction && Math.abs(colDiff) === 1;
};

// 香車の移動
const isValidLanceMove = (
  board: Board,
  from: Position,
  to: Position,
  rowDiff: number,
  colDiff: number,
  color: string,
): boolean => {
  const direction = color === 'sente' ? -1 : 1;

  // 前方向のみ
  if (colDiff !== 0 || rowDiff * direction <= 0) return false;

  return isPathClear(board, from, to);
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
