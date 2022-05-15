import { DIRECTIONS } from "../../../constants";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, OTHER } = DIRECTIONS;

export function isVertical({ start, end }) {
  return start[0] === end[0];
}

export function isHorizontal({ start, end }) {
  return start[1] === end[1];
}

export function isDiagonal({ colDiff, rowDiff }) {
  const absColDiff = Math.abs(colDiff);
  const absRowDiff = Math.abs(rowDiff);
  return absColDiff === absRowDiff;
}

export function isL({ colDiff, rowDiff }) {
  const rowAbsDiff = Math.abs(rowDiff);
  const colAbsDiff = Math.abs(colDiff);

  return (rowAbsDiff === 2 && colAbsDiff === 1) || (rowAbsDiff === 1 && colAbsDiff === 2);
}

export default function getDirection(info) {
  switch (true) {
    case isVertical(info): {
      return VERTICAL;
    }
    case isHorizontal(info): {
      return HORIZONTAL;
    }
    case isDiagonal(info): {
      return DIAGONAL;
    }
    case isL(info): {
      return L_SHAPE;
    }
    default: {
      return OTHER;
    }
  }
}
