export const PIECE_TYPES = {
  BISHOP: "bishop",
  KING: "king",
  KNIGHT: "knight",
  PAWN: "pawn",
  QUEEN: "queen",
  ROOK: "rook",
};

export const COLORS = {
  WHITE: "white",
  BLACK: "black",
};

const { WHITE, BLACK } = COLORS;

export const COLUMNS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const ROWS = [1, 2, 3, 4, 5, 6, 7, 8].reverse();

export const SQUARES = (function () {
  const squares = [];
  let isWhite = true;

  for (const row of ROWS) {
    for (const col of COLUMNS) {
      squares.push({
        id: `${row}${col}`,
        color: isWhite ? WHITE : BLACK,
      });

      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }

  return squares;
})();

export const NUM_SQUARES = SQUARES.length;

export const DIRECTIONS = {
  DIAGONAL: "diagonal",
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  L_SHAPE: "l_shape",
  OTHER: "other",
};

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;

export const BOARD_EMPTY = SQUARES.reduce((config, square) => {
  config[square.id] = null;
  return config;
}, {});

export const BOARD_NEW_GAME = (function () {
  const board = { ...BOARD_EMPTY };

  const MAJOR_ROW = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];
  const MINOR_ROW = new Array(8).fill(PAWN);

  const createPieces = (pieceTypes, color) => pieceTypes.map((type) => ({ color, type }));

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

export const STATUSES = {
  PLAYER_1: COLORS.WHITE,
  PLAYER_2: COLORS.BLACK,
};
