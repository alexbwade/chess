import { COLORS } from "../../../constants";

const { BLACK, WHITE } = COLORS;

export function isSameSpace({ start, end }) {
  return start === end;
}

export function isFriendlyOccupied({ config, start, end }) {
  return config[start].color === config[end]?.color;
}

export function isSingleSpace({ colDiff, rowDiff }) {
  return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
}

export function isForward({ color, rowDiff }) {
  if (color === BLACK) return rowDiff > 0;
  if (color === WHITE) return rowDiff < 0;

  console.log("Invalid color.");
  return false;
}

export function isL({ colDiff, rowDiff }) {
  const rowAbsDiff = Math.abs(rowDiff);
  const colAbsDiff = Math.abs(colDiff);

  return (rowAbsDiff === 2 && colAbsDiff === 1) || (rowAbsDiff === 1 && colAbsDiff === 2);
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

const CALCULATIONS = {
  isDiagonal,
  isVertical,
  isHorizontal,
  isSingleSpace,
  isSameSpace,
  isFriendlyOccupied,
  isForward,
  isL,
  isTake,
  hasClearPath,
};

export default function getMovementProperties(info) {
  return Object.entries(CALCULATIONS).reduce((acc, [fnName, fn]) => {
    acc[fnName] = fn(info);

    return acc;
  }, {});
}
