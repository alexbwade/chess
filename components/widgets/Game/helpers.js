import { PIECE_TYPES, PLAYERS } from "~constants";

import validate from "./validator";
import calculate from "./calculator";

const { PLAYER_1, PLAYER_2 } = PLAYERS;
const { QUEEN, KING, ROOK } = PIECE_TYPES;

export function updateBoard(board, move) {
  const { config, turn } = board;
  const { start, end, player } = move;

  let piece = config[start];
  const details = { config, piece, start, end, player, turn };

  const event = calculate(details);

  validate(event, piece);

  // board modifications start
  if (event.isPawnReachingEnd) {
    // todo: test that this is a NEW piece
    piece = {
      ...piece,
      type: QUEEN,
    };
  }

  if (piece.type === KING || piece.type === ROOK) {
    piece.moved = true;
  }

  const newConfig = {
    ...config,
    [start]: null,
    [end]: piece,
  };
  // board modifications end

  // assess status here (normal, check, checkmate)
  // const newStatus = getStatus(newConfig);

  // assess turn
  const nextPlayer = turn === PLAYER_1 ? PLAYER_2 : PLAYER_1;

  return {
    config: newConfig,
    turn: nextPlayer,
    // status: newStatus,
  };
}
