import { STATUSES } from "~constants";

import validate from "./validator";
import calculate from "./calculator";

const { PLAYER_1, PLAYER_2 } = STATUSES;

export function updateBoard(board, move) {
  const { config, status } = board;
  const { start, end, player } = move;
  const piece = config[start];
  const details = { config, piece, start, end, player, status };

  const event = calculate(details);

  validate(event, piece);

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
