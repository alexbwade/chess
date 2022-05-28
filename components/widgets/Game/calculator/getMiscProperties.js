import { COLORS, PIECE_TYPES } from "~constants";

const { BLACK, WHITE } = COLORS;
const { PAWN, KING } = PIECE_TYPES;

// export function isSameSpace({ start, end }) {
//   return start === end;
// }

// export function isOccupied({ config, start, end }) {
//   return config[start].color === config[end]?.color;
// }

// export function isSingleSpace({ colChange, rowChange }) {
//   return rowChange <= 1 && colChange <= 1 && rowChange + colChange >= 1;
// }

// export function isForward({ piece, rowDelta }) {
//   if (piece.color === BLACK) return rowDelta > 0;
//   if (piece.color === WHITE) return rowDelta < 0;

//   throw new Error("Invalid piece color.");
// }

// export function isTake({ config, start, end }) {
//   return !!config[end] && config[start].color !== config[end]?.color;
// }

export function hasClearPath({ config, spacesInPath }) {
  return spacesInPath.every((space) => {
    const occupied = !!config[space];

    return !occupied;
  });
}

// export function willBeChecked() {

// }

// export function isStillChecked({ status }) {
//   if (status === checked) {

//   }
// }

export function isCastle({ piece }) {
  if (piece.type !== KING) return false;
  if (piece.moved === true) return false;

  // const nearestRook = COLUMNS.find(col => )
  // todo (for king)   { config, castleable, piece type }
  return false;
}

// export function isPawnReachingEnd({ piece, nextRowIndex }) {
//   if (piece.type !== PAWN) {
//     return false;
//   }

//   const isWhitePawnReachingEnd = piece.color === WHITE && nextRowIndex === 0;
//   const isBlackPawnReachingEnd = piece.color === BLACK && nextRowIndex === 7;

//   if (isWhitePawnReachingEnd || isBlackPawnReachingEnd) {
//     return true;
//   }

//   return false;
// }

// export function isYourTurn({ player, turn }) {
//   return player === turn;
// }

// export function isYourPiece({ player, piece }) {
//   return piece.color === player;
// }

const CALCULATIONS = {
  isSingleSpace,
  isSameSpace,
  isOccupied,
  isForward,
  isTake,
  hasClearPath,
  isCastle,
  isYourTurn,
  isYourPiece,
  isPawnReachingEnd,
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
