import { STATUSES } from "~constants";

import validate from "./validator";
import calculate from "./calculator";

const { PLAYER_1, PLAYER_2 } = STATUSES;

export function updateBoard(board, move) {
  const { config, status } = board;
  const { start, end } = move;

  const piece = config[start];

  const moveDetails = calculate({ config, piece, start, end });

  validate(moveDetails, piece); // && piece.color === status

  const newConfig = {
    ...config,
    [start]: null,
    [end]: piece,
  };

  const nextPlayer = status === PLAYER_1 ? PLAYER_2 : PLAYER_1;

  return {
    config: newConfig,
    status: nextPlayer,
  };
}
