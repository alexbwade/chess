export const ERROR_SAME_SPACE = "This is the same space.";

export const ERROR_OCCUPIED = "This space is already occupied by a friendly piece.";

export const ERROR_BLOCKED = "There is another piece in the way.";

export const ERROR_BISHOP = "This piece must move diagonally.";

export const ERROR_KING = "This piece can only move one space (in any direction) at a time - unless castling.";

export const ERROR_KNIGHT =
  "This piece can only move in the shape of an 'L' (2 spaces in one direction, 1 space in the other).";

export const ERROR_PAWN = "This piece can only move a single space forward, or take enemies a single space diagonally.";

export const ERROR_QUEEN = "This piece can only move in a straight line in any direction.";

export const ERROR_ROOK = "This piece must move horizontally or vertically.";

export default class IllegalMoveError extends Error {
  constructor(message) {
    super(message);

    this.name = "IllegalMoveError";
  }
}
