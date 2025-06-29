import type { Board } from '../types';

export const createInitialBoard = (): Board => {
  const board: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));

  // 後手の駒（上側）
  board[0][0] = { type: 'lance', color: 'gote' };
  board[0][1] = { type: 'knight', color: 'gote' };
  board[0][2] = { type: 'silver', color: 'gote' };
  board[0][3] = { type: 'gold', color: 'gote' };
  board[0][4] = { type: 'king', color: 'gote' };
  board[0][5] = { type: 'gold', color: 'gote' };
  board[0][6] = { type: 'silver', color: 'gote' };
  board[0][7] = { type: 'knight', color: 'gote' };
  board[0][8] = { type: 'lance', color: 'gote' };

  board[1][1] = { type: 'bishop', color: 'gote' };
  board[1][7] = { type: 'rook', color: 'gote' };

  for (let i = 0; i < 9; i++) {
    board[2][i] = { type: 'pawn', color: 'gote' };
  }

  // 先手の駒（下側）
  board[8][0] = { type: 'lance', color: 'sente' };
  board[8][1] = { type: 'knight', color: 'sente' };
  board[8][2] = { type: 'silver', color: 'sente' };
  board[8][3] = { type: 'gold', color: 'sente' };
  board[8][4] = { type: 'king', color: 'sente' };
  board[8][5] = { type: 'gold', color: 'sente' };
  board[8][6] = { type: 'silver', color: 'sente' };
  board[8][7] = { type: 'knight', color: 'sente' };
  board[8][8] = { type: 'lance', color: 'sente' };

  board[7][1] = { type: 'rook', color: 'sente' };
  board[7][7] = { type: 'bishop', color: 'sente' };

  for (let i = 0; i < 9; i++) {
    board[6][i] = { type: 'pawn', color: 'sente' };
  }

  return board;
};
