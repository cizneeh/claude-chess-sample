import type { Board } from '../types';

export const createInitialBoard = (): Board => {
  const board: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Black pieces (top of board)
  board[0][0] = { type: 'rook', color: 'black' };
  board[0][1] = { type: 'knight', color: 'black' };
  board[0][2] = { type: 'bishop', color: 'black' };
  board[0][3] = { type: 'queen', color: 'black' };
  board[0][4] = { type: 'king', color: 'black' };
  board[0][5] = { type: 'bishop', color: 'black' };
  board[0][6] = { type: 'knight', color: 'black' };
  board[0][7] = { type: 'rook', color: 'black' };

  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' };
  }

  // White pieces (bottom of board)
  board[7][0] = { type: 'rook', color: 'white' };
  board[7][1] = { type: 'knight', color: 'white' };
  board[7][2] = { type: 'bishop', color: 'white' };
  board[7][3] = { type: 'queen', color: 'white' };
  board[7][4] = { type: 'king', color: 'white' };
  board[7][5] = { type: 'bishop', color: 'white' };
  board[7][6] = { type: 'knight', color: 'white' };
  board[7][7] = { type: 'rook', color: 'white' };

  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: 'pawn', color: 'white' };
  }

  return board;
};
