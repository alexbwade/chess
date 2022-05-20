import { PIECE_TYPES } from "~constants";
import IllegalMoveError, {
  ERROR_SAME_SPACE,
  ERROR_OCCUPIED,
  ERROR_BLOCKED,
  ERROR_BISHOP,
  ERROR_KING,
  ERROR_KNIGHT,
  ERROR_PAWN,
  ERROR_QUEEN,
  ERROR_ROOK,
} from "./error";

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

export function validateMove(move, piece) {
  if (move.isSameSpace) {
    throw new IllegalMoveError(ERROR_SAME_SPACE);
  }

  if (move.isFriendlyOccupied) {
    throw new IllegalMoveError(ERROR_OCCUPIED);
  }

  if ([BISHOP, QUEEN, ROOK].includes(piece.type) && !move.hasClearPath) {
    throw new IllegalMoveError(ERROR_BLOCKED);
  }

  switch (piece.type) {
    case BISHOP: {
      if (!move.isDiagonal) {
        throw new IllegalMoveError(ERROR_BISHOP);
      }

      break;
    }

    case KING: {
      const isValidMove = move.isSingleSpace || move.isCastle;
      if (!isValidMove) {
        throw new IllegalMoveError(ERROR_KING);
      }

      break;
    }

    case KNIGHT: {
      if (!move.isL) {
        throw new IllegalMoveError(ERROR_KNIGHT);
      }
      break;
    }

    case PAWN: {
      const isSingleSpaceForward = move.isForward && move.isSingleSpace;
      const isRegularAdvance = isSingleSpaceForward && move.isVertical && !move.isTake;
      const isEnemyKill = isSingleSpaceForward && move.isDiagonal && move.isTake;
      const isValidMove = isRegularAdvance || isEnemyKill;

      if (!isValidMove) {
        throw new IllegalMoveError(ERROR_PAWN);
      }
      break;
    }

    case QUEEN: {
      const isValidDirection = move.isDiagonal || move.isHorizontal || move.isVertical;

      if (!isValidDirection) {
        throw new IllegalMoveError(ERROR_QUEEN);
      }

      break;
    }

    case ROOK: {
      const isValidDirection = move.isHorizontal || move.isVertical;

      if (!isValidDirection) {
        throw new IllegalMoveError(ERROR_ROOK);
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
    validateMove(move, piece);

    return true;
  } catch (err) {
    if (err instanceof IllegalMoveError) {
      console.log(`${err.name}: ${err.message}`);

      return false;
    }

    throw err;
  }
}
