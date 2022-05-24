import { DIRECTIONS } from "~constants";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, OTHER } = DIRECTIONS;

function isHorizontal({ start, end }) {
  return start[0] === end[0];
}

function isVertical({ start, end }) {
  return start[1] === end[1];
}

function isDiagonal({ colDelta, rowDelta }) {
  return Math.abs(colDelta) === Math.abs(rowDelta);
}

function isLShaped({ colDelta, rowDelta }) {
  const rowAbsDiff = Math.abs(rowDelta);
  const colAbsDiff = Math.abs(colDelta);

  return (rowAbsDiff === 2 && colAbsDiff === 1) || (rowAbsDiff === 1 && colAbsDiff === 2);
}

function getDirectionProperty(move) {
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
    case isLShaped(move): {
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
    // quick-access properties
    isVertical: direction === VERTICAL,
    isHorizontal: direction === HORIZONTAL,
    isDiagonal: direction === DIAGONAL,
    isLShaped: direction === L_SHAPE,
  };
}
