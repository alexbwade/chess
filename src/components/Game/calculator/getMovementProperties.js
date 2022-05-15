import { COLORS, DIRECTIONS } from "../../../constants";

const { BLACK, WHITE } = COLORS;
const { HORIZONTAL, VERTICAL, DIAGONAL, L_SHAPE } = DIRECTIONS;

export function isDiagonal({ direction }) {
  return direction === DIAGONAL;
}

export function isHorizontal({ direction }) {
  return direction === HORIZONTAL;
}

export function isVertical({ direction }) {
  return direction === VERTICAL;
}

export function isL({ direction }) {
  return direction === L_SHAPE;
}

export function isSameSpace({ start, end }) {
  return start === end;
}

export function isFriendlyOccupied({ config, start, end }) {
  return config[start].color === config[end]?.color;
}

export function isSingleSpace({ colDiff, rowDiff }) {
  return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
}

export function isForward({ piece, rowDiff }) {
  if (piece.color === BLACK) return rowDiff > 0;
  if (piece.color === WHITE) return rowDiff < 0;

  console.log("Invalid piece color.");
  return false;
}

export function isTake({ config, end }) {
  return !!config[end];
}

export function hasClearPath({ config, spacesInPath }) {
  return spacesInPath.every((space) => {
    const occupied = !!config[space];

    return !occupied;
  });
}

export function isCastle() {
  // todo (for king)
  return false;
}

const CALCULATIONS = {
  isDiagonal,
  isHorizontal,
  isVertical,
  isL,
  isSingleSpace,
  isSameSpace,
  isFriendlyOccupied,
  isForward,
  isTake,
  hasClearPath,
};

export function getCalculations(move) {
  return Object.entries(CALCULATIONS).reduce((acc, [fnName, fn]) => {
    acc[fnName] = fn(move);

    return acc;
  }, {});
}

export default function getMovementProperties(move) {
  return {
    ...move,
    ...getCalculations(move),
  };
}
