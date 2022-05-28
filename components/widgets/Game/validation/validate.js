import { PIECE_TYPES } from "~constants";
import IllegalMoveError, {
  ERROR_SAME_SPACE,
  ERROR_OCCUPIED,
  ERROR_BLOCKED,
  ERROR_NOT_YOUR_PIECE,
  ERROR_NOT_YOUR_TURN,
  ERROR_BISHOP,
  ERROR_KING,
  ERROR_KNIGHT,
  ERROR_PAWN,
  ERROR_QUEEN,
  ERROR_ROOK,
} from "./error";
import getValidationObject from "./getValidationObject";

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

export default function validate(event) {
  const validationObject = getValidationObject(event);

  const { piece } = validationObject;

  console.log({ event, validationObject });

  if (!validationObject.isYourTurn) {
    throw new IllegalMoveError(ERROR_NOT_YOUR_TURN);
  }

  if (!validationObject.isYourPiece) {
    throw new IllegalMoveError(ERROR_NOT_YOUR_PIECE);
  }

  if (validationObject.isSameSpace) {
    throw new IllegalMoveError(ERROR_SAME_SPACE);
  }

  if (validationObject.isOccupied) {
    throw new IllegalMoveError(ERROR_OCCUPIED);
  }

  if ([BISHOP, QUEEN, ROOK].includes(piece.type) && !validationObject.isClearPath) {
    throw new IllegalMoveError(ERROR_BLOCKED);
  }

  switch (piece.type) {
    case BISHOP: {
      if (!validationObject.isDiagonal) {
        throw new IllegalMoveError(ERROR_BISHOP);
      }

      break;
    }

    case KING: {
      const isValidMove = validationObject.isSingleSpace || validationObject.isCastle;
      if (!isValidMove) {
        throw new IllegalMoveError(ERROR_KING);
      }

      break;
    }

    case KNIGHT: {
      if (!validationObject.isLShaped) {
        throw new IllegalMoveError(ERROR_KNIGHT);
      }
      break;
    }

    case PAWN: {
      const isSingleSpaceForward = validationObject.isForward && validationObject.isSingleSpace;
      const isRegularAdvance = isSingleSpaceForward && validationObject.isVertical && !validationObject.isTake;
      const isInitialAdvance = !piece.moved && validationObject.isForward && validationObject.isTwoSpaces;
      const isEnemyKill = isSingleSpaceForward && validationObject.isDiagonal && validationObject.isTake;
      const isValidMove = isRegularAdvance || isInitialAdvance || isEnemyKill;

      if (!isValidMove) {
        throw new IllegalMoveError(ERROR_PAWN);
      }
      break;
    }

    case QUEEN: {
      const isValidDirection =
        validationObject.isDiagonal || validationObject.isHorizontal || validationObject.isVertical;

      if (!isValidDirection) {
        throw new IllegalMoveError(ERROR_QUEEN);
      }

      break;
    }

    case ROOK: {
      const isValidDirection = validationObject.isHorizontal || validationObject.isVertical;

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
