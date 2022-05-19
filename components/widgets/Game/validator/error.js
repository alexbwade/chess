export const ERROR_SAME_SPACE = "This is the same space.";

export const ERROR_OCCUPIED = "This space is already occupied by a friendly piece.";

export default class IllegalMoveError extends Error {
  constructor(message) {
    super(message);

    this.name = "IllegalMoveError";
  }
}
