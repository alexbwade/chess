import { PLAYERS } from "~constants";

import getNumbers from "./getNumbers";
import getDirection from "./getDirection";
import getSpacesInPath from "./getSpacesInPath";
import getNextConfig from "./getNextConfig";
import getNextStatus from "./getNextStatus";

const { PLAYER_1, PLAYER_2 } = PLAYERS;

export default function getMoveDetails(board, move) {
  const numbers = getNumbers(move);
  const direction = getDirection(numbers);
  const spacesInPath = getSpacesInPath(numbers, direction);
  const nextConfig = getNextConfig(board, move); // check castle in here independently
  const nextStatus = getNextStatus(nextConfig); // normal, check, checkmate
  const nextTurn = move.config.turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;

  return {
    numbers,
    direction,
    spacesInPath,
    nextConfig,
    nextStatus,
    nextTurn,
  };
}
