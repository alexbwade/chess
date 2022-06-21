import { COLORS, PIECE_TYPES, ROWS } from "~constants";

const { WHITE, BLACK } = COLORS;
const { QUEEN, PAWN } = PIECE_TYPES;

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

  const copiedConfig = JSON.parse(JSON.stringify(config));
  let piece = copiedConfig[start];

  if (isPawnReachingEnd(piece, deltas)) {
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

  // if (isValidCastleAttempt(piece, deltas)) {
  //   nextConfig = {
  //     ...nextConfig,
  //     [rookStart]: null,
  //     [rookEnd]: rook;
  //   }
  // }

  return nextConfig;
}
