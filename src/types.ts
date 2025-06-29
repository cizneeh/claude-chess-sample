export type PieceType =
  | 'king' // 王将・玉将
  | 'rook' // 飛車
  | 'bishop' // 角行
  | 'gold' // 金将
  | 'silver' // 銀将
  | 'knight' // 桂馬
  | 'lance' // 香車
  | 'pawn'; // 歩兵
export type Color = 'sente' | 'gote'; // 先手・後手

export interface Piece {
  type: PieceType;
  color: Color;
}

export interface Position {
  row: number;
  col: number;
}

export type Board = (Piece | null)[][];
