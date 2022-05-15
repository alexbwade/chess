import { COLORS, COLUMNS, PIECE_TYPES, SQUARES } from "../../constants";

const { WHITE, BLACK } = COLORS;
const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

export const BOARD_EMPTY = SQUARES.reduce((config, square) => {
  config[square.id] = null;
  return config;
}, {});

export const BOARD_NEW_GAME = (function () {
  const board = { ...BOARD_EMPTY };

  const MAJOR_ROW = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
  const MINOR_ROW = new Array(8).fill(PAWN);

  const createPieces = (pieceTypes, color) =>
    pieceTypes.map((type) => ({ color, type }));

  const occupiedRows = {
    8: createPieces(MAJOR_ROW, BLACK),
    7: createPieces(MINOR_ROW, BLACK),
    2: createPieces(MINOR_ROW, WHITE),
    1: createPieces(MAJOR_ROW, WHITE),
  };

  const setRow = (row, pieces) => {
    for (const col of COLUMNS) {
      const squareId = `${row}${col}`;
      board[squareId] = pieces.shift();
    }
  };

  Object.entries(occupiedRows).forEach(([row, set]) => {
    setRow(row, set);
  });

  return board;
})();
