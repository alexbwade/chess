import { COLORS, DIRECTIONS, STATUSES } from "~constants";

const { CHECK } = STATUSES;
const { WHITE } = COLORS;
const { VERTICAL, HORIZONTAL, DIAGONAL, L_SHAPE, NONE, OTHER } = DIRECTIONS;

export function hasClearPath({ config, path }) {
  return path.every((space) => {
    const occupied = !!config[space];

    return !occupied;
  });
}

export default function getValidationObject(event) {
  const {
    player,
    start,
    end,
    deltas: { colChange, rowChange, rowDelta },
    direction,
    path,
    prevConfig,
    prevStatus,
    prevTurn,
    nextStatus,
  } = event;
  const piece = prevConfig[start];

  // player
  const isYourTurn = player === prevTurn;
  const isYourPiece = player === piece.color;

  // status
  const wereChecked = prevStatus === CHECK;
  const areChecked = nextStatus === CHECK;
  const stillChecked = wereChecked && areChecked;

  // movement
  const isSameSpace = start === end;
  const isSingleSpace = rowChange <= 1 && colChange <= 1 && rowChange + colChange >= 1;
  const isTwoSpaces = rowChange <= 2 && colChange <= 2 && rowChange + colChange >= 2;
  const isForward = piece.color === WHITE ? rowDelta < 0 : rowDelta > 0;
  const hasClearPath = path.every((space) => !prevConfig[space]);

  // direction
  const isVertical = direction === VERTICAL;
  const isHorizontal = direction === HORIZONTAL;
  const isDiagonal = direction === DIAGONAL;
  const isLShaped = direction === L_SHAPE;

  // piece interactions
  const isOccupied = piece.color === prevConfig[end]?.color;
  const isTake = !!prevConfig[end] && piece.color !== prevConfig[end]?.color;

  return {
    piece,
    // player
    isYourTurn,
    isYourPiece,
    // status
    wereChecked,
    areChecked,
    stillChecked,
    // movement
    isSameSpace,
    isSingleSpace,
    isTwoSpaces,
    isForward,
    hasClearPath,
    // direction
    isVertical,
    isHorizontal,
    isDiagonal,
    isLShaped,
    // piece interactions
    isOccupied,
    isTake,
  };
}
