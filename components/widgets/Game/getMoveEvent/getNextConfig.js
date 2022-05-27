import { COLORS, PIECE_TYPES } from "~constants";

const { WHITE, BLACK } = COLORS;
const { QUEEN, KING, ROOK, PAWN } = PIECE_TYPES;

function isPawnReachingEnd({ piece, nextRowIndex }) {
  if (piece.type !== PAWN) {
    return false;
  }

  const isWhitePawnReachingEnd = piece.color === WHITE && nextRowIndex === 0;
  const isBlackPawnReachingEnd = piece.color === BLACK && nextRowIndex === 7;

  if (isWhitePawnReachingEnd || isBlackPawnReachingEnd) {
    return true;
  }

  return false;
}

export default function getNextConfig(board, move) {
  const { start, end } = move;
  const { config } = board;

  let piece = config[start];

  if (isPawnReachingEnd(move)) {
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

  return newConfig;
}
