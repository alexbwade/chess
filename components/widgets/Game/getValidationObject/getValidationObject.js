import { STATUSES } from "~constants";

const { CHECK } = STATUSES;

export default function getValidationObject(event) {
  const { player, start, end, prevConfig, prevStatus, prevTurn, nextStatus } = event;
  const piece = prevConfig[start];

  // player
  const isYourTurn = player === prevTurn;
  const isYourPiece = player === piece.color;

  // status
  const wereChecked = prevStatus === CHECK;
  const areChecked = nextStatus === CHECK;
  const stillChecked = wereChecked && areChecked;

  // piece interactions
  const isOccupied = piece.color === prevConfig[end]?.color;
  const isTake = !!prevConfig[end] && piece.color !== prevConfig[end]?.color;

  return {
    isYourTurn,
    isYourPiece,
    isOccupied,
    isTake,
    wereChecked,
    areChecked,
    stillChecked,
    // ...validationRules,
  };
}
