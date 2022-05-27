import { PLAYERS } from "~constants";

import getDeltas from "./getDeltas";
import getDirection from "./getDirection";
import getPath from "./getPath";
import getNextConfig from "./getNextConfig";
import getNextStatus from "./getNextStatus";

const { PLAYER_1, PLAYER_2 } = PLAYERS;

export default function getMoveEvent(board, move) {
  const deltas = getDeltas(move);
  const direction = getDirection(deltas);
  const path = getPath(deltas, direction);

  const nextConfig = getNextConfig(board, move); // check castle in here independently
  const nextStatus = getNextStatus(nextConfig); // normal, check, checkmate
  const nextTurn = move.config.turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;

  return {
    ...move,
    prevConfig: board.config,
    prevStatus: board.status,
    prevTurn: board.turn,
    deltas,
    direction,
    path,
    nextConfig,
    nextStatus,
    nextTurn,
  };
}
