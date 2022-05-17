import { DIRECTIONS } from "~constants";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, OTHER } = DIRECTIONS;

export function isHorizontal({ start, end }) {
  return start[0] === end[0];
}

export function isVertical({ start, end }) {
  return start[1] === end[1];
}

export function isDiagonal({ colDiff, rowDiff }) {
  return Math.abs(colDiff) === Math.abs(rowDiff);
}

export function isL({ colDiff, rowDiff }) {
  const rowAbsDiff = Math.abs(rowDiff);
  const colAbsDiff = Math.abs(colDiff);

  return (rowAbsDiff === 2 && colAbsDiff === 1) || (rowAbsDiff === 1 && colAbsDiff === 2);
}

export function getDirectionProperty(move) {
  switch (true) {
    case isVertical(move): {
      return VERTICAL;
    }
    case isHorizontal(move): {
      return HORIZONTAL;
    }
    case isDiagonal(move): {
      return DIAGONAL;
    }
    case isL(move): {
      return L_SHAPE;
    }
    default: {
      return OTHER;
    }
  }
}

export default function getDirection(move) {
  const direction = getDirectionProperty(move);

  return {
    ...move,
    direction,
    // quick access properties
    isVertical: direction === VERTICAL,
    isHorizontal: direction === HORIZONTAL,
    isDiagonal: direction === DIAGONAL,
    isL: direction === L_SHAPE,
  };
}
