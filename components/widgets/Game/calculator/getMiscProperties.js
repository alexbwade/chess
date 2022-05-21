import { COLORS } from "~constants";

const { BLACK, WHITE } = COLORS;

export function isSameSpace({ start, end }) {
  return start === end;
}

export function isFriendlyOccupied({ config, start, end }) {
  console.log({ config, start, end, starrttt: config[start], endndd: config[end] });
  const startPiece = JSON.parse(config[start]);
  const endPiece = JSON.parse(config[end]) || {};

  return startPiece.color === endPiece.color;
}

export function isSingleSpace({ colDiff, rowDiff }) {
  const rowChange = Math.abs(rowDiff);
  const colChange = Math.abs(colDiff);

  return rowChange <= 1 && colChange <= 1 && rowChange + colChange >= 1;
}

export function isForward({ piece, rowDiff }) {
  if (piece.color === BLACK) return rowDiff > 0;
  if (piece.color === WHITE) return rowDiff < 0;

  // todo: probably remove
  console.log("Invalid piece color.");
  return false;
}

export function isTake({ config, start, end }) {
  return !!config[end] && config[start].color !== config[end]?.color;
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
  isSingleSpace,
  isSameSpace,
  isFriendlyOccupied,
  isForward,
  isTake,
  hasClearPath,
  isCastle,
};

export function calcMiscProperties(move) {
  return Object.entries(CALCULATIONS).reduce((acc, [fnName, fn]) => {
    acc[fnName] = fn(move);

    return acc;
  }, {});
}

export default function getMiscProperties(move) {
  return {
    ...move,
    ...calcMiscProperties(move),
  };
}
