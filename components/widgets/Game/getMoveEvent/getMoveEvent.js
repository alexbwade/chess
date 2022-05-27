import { STATUSES } from "~constants";

const { CHECK } = STATUSES;

export default function getMoveEvent(board, moveDetails) {
  const { config, status, turn } = board;
  const { start, end, player, nextConfig, nextStatus } = moveDetails;
  const piece = config[start];

  // player
  const isYourTurn = player === turn;
  const isYourPiece = player === piece.color;

  // status
  const wereChecked = status === CHECK;
  const areChecked = nextStatus === CHECK;
  const stillChecked = wereChecked && areChecked;

  // piece interactions
  const isOccupied = piece.color === config[end]?.color;
  const isTake = !!config[end] && piece.color !== config[end]?.color;

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
