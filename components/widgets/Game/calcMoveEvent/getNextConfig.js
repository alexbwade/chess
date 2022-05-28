import { COLORS, PIECE_TYPES, ROWS } from "~constants";

const { WHITE, BLACK } = COLORS;
const { QUEEN, KING, ROOK, PAWN } = PIECE_TYPES;

function isPawnReachingEnd(piece, deltas) {
  const { nextRowIndex } = deltas;

  if (piece.type !== PAWN) {
    return false;
  }

  const finalRow = {
    [WHITE]: 8,
    [BLACK]: 1,
  }[piece.color];

  const finalRowIndex = ROWS.findIndex((row) => row === finalRow);

  return nextRowIndex === finalRowIndex;
}

export default function getNextConfig({ board, move, deltas }) {
  const { start, end } = move;
  const { config } = board;

  const copiedConfig = { ...config };
  // might need to copy config here, may need immutability
  let piece = { ...copiedConfig[start] };

  if (isPawnReachingEnd(piece, deltas)) {
    // todo: test that the resulting piece is a NEW object
    piece = {
      ...piece,
      type: QUEEN,
    };
  }

  piece.moved = true;

  const nextConfig = {
    ...copiedConfig,
    [start]: null,
    [end]: piece,
  };

  return nextConfig;
}
