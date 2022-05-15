import { PIECE_TYPES } from "../../../constants";
import IllegalMoveError from "./error";

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

function isLegalMove(move, piece) {
  if (move.isSameSpace) {
    throw new IllegalMoveError("This is the same space.");
  }

  if (move.isFriendlyOccupied) {
    throw new IllegalMoveError("This space is already occupied by a friendly piece.");
  }

  if ([BISHOP, QUEEN, ROOK].includes(piece.type) && !move.hasClearPath) {
    throw new IllegalMoveError("There is another piece in the way.");
  }

  switch (piece.type) {
    case BISHOP: {
      if (!move.isDiagonal) {
        throw new IllegalMoveError("This piece must move diagonally.");
      }

      break;
    }

    case KING: {
      const isValidMove = move.isSingleSpace || move.isCastle;
      if (!isValidMove) {
        throw new IllegalMoveError(
          "This piece can only move one space (in any direction) at a time - unless castling."
        );
      }

      break;
    }

    case KNIGHT: {
      if (!move.isL) {
        throw new IllegalMoveError(
          "This piece can only move in the shape of an 'L' (2 spaces in one direction, 1 space in the other)."
        );
      }
      break;
    }

    case PAWN: {
      const isOneSquareForward = move.isVertical && move.isForward && move.isSingleSpace;
      const isPawnKill = move.isDiagonal && move.isForward && move.isSingleSpace && move.isTake;
      const isValidMove = isOneSquareForward || isPawnKill;

      if (!isValidMove) {
        throw new IllegalMoveError(
          "This piece can only move a single space forward, or take enemies a single space diagonally."
        );
      }
      break;
    }

    case QUEEN: {
      const isValidDirection = move.isDiagonal || move.isHorizontal || move.isVertical;

      if (!isValidDirection) {
        throw new IllegalMoveError("This piece can only move in a straight line in any direction.");
      }

      break;
    }

    case ROOK: {
      const isValidDirection = move.isHorizontal || move.isVertical;

      if (!isValidDirection) {
        throw new IllegalMoveError("This piece must move horizontally or vertically.");
      }

      break;
    }

    default: {
      throw new TypeError(`Invalid piece type: ${piece.type}`);
    }
  }

  return true;
}

export default function validate(move, piece) {
  try {
    const isLegal = isLegalMove(move, piece);

    return isLegal;
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);

    return false;
  }
}
