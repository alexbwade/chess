import { COLORS, COLUMNS, ROWS, PIECE_TYPES } from "../../constants";

const { BLACK, WHITE } = COLORS; // will need for pawn validation
const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

function getDiffs(start, end) {
  const [currentRow, currentCol] = start.split("");
  const [targetRow, targetCol] = end.split("");
  const currentRowIndex = ROWS.indexOf(+currentRow);
  const currentColIndex = COLUMNS.indexOf(currentCol);
  const targetRowIndex = ROWS.indexOf(+targetRow);
  const targetColIndex = COLUMNS.indexOf(targetCol);

  return {
    currentRowIndex,
    currentColIndex,
    targetRowIndex,
    targetColIndex,
    rowDiff: targetRowIndex - currentRowIndex,
    colDiff: targetColIndex - currentColIndex,
  };
}

function getIntermediarySpaces(start, end) {
  const { currentRowIndex, currentColIndex, targetRowIndex, targetColIndex } = getDiffs(start, end);
}

function isSame(start, end) {
  return start === end;
}

function isFriendlyOccupied(config, start, end) {
  return config[start].color === config[end]?.color;
}

function isClearPath(config, start, end) {
  const intermediarySpaces = getIntermediarySpaces(start, end);

  return intermediarySpaces.every((space) => {
    const occupied = !!config[space];

    return !occupied;
  });
}

function isHorizontal(start, end) {
  return start[0] === end[0];
}

function isVertical(start, end) {
  return start[1] === end[1];
}

function isDiagonal(start, end) {
  const { colDiff, rowDiff } = getDiffs(start, end);

  return Math.abs(rowDiff) === Math.abs(colDiff);
}

function isSingleSpace(start, end) {
  const { colDiff, rowDiff } = getDiffs(start, end);

  return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
}

function isL(start, end) {
  const { colDiff, rowDiff } = getDiffs(start, end);

  const rowAbsDiff = Math.abs(rowDiff);
  const colAbsDiff = Math.abs(colDiff);

  return (rowAbsDiff === 2 && colAbsDiff === 1) || (rowAbsDiff === 1 && colAbsDiff === 2);
}

function isTake(config, end) {
  return !!config[end];
}

function isPawnKill(config, start, end) {
  return isDiagonal(start, end) && isSingleSpace(start, end) && isTake(config, end);
}

function isOneSquareForward(start, end) {
  return isVertical(start, end) && isSingleSpace(start, end);
}

export default function validate({ config, piece, start, end }) {
  if (isSame(start, end)) return false;
  if (isFriendlyOccupied(config, start, end)) return false;

  const { color, type } = piece;

  console.log({ type, color, start, end });

  // who doesn't need clear path? King, Pawn, Knight

  switch (type) {
    case BISHOP: {
      return isDiagonal(start, end) && isClearPath(config, start, end);
    }

    case KING: {
      const isValidDirection = isVertical(start, end) || isHorizontal(start, end) || isDiagonal(start, end);

      return isSingleSpace(start, end) && isValidDirection;
    }

    case KNIGHT: {
      return isL(start, end);
    }

    case PAWN: {
      return isOneSquareForward(start, end) || isPawnKill(config, start, end);
    }

    case QUEEN: {
      if (!isClearPath(config, start, end)) return false;

      return isVertical(start, end) || isHorizontal(start, end) || isDiagonal(start, end);
    }

    case ROOK: {
      if (!isClearPath(config, start, end)) return false;

      return isHorizontal(start, end) || isVertical(start, end);
    }

    default: {
      throw new Error("Invalid type");
    }
  }
}
