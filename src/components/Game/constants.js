import { COLORS, COLUMNS, SQUARES } from '../../constants';

import { Pawn, Knight, Bishop, Queen, King, Rook } from '../Pieces';

const { WHITE, BLACK } = COLORS;

export const BOARD_EMPTY = SQUARES.reduce((config, square) => {
  config[square.id] = null;
  return config;
}, {});

export const BOARD_NEW_GAME = (function () {
  const board = { ...BOARD_EMPTY };

  const MAJOR_ROW = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
  const MINOR_ROW = new Array(8).fill(Pawn);

  const createPieces = (pieces, color) => pieces.map((Piece) => <Piece color={color} />);

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
