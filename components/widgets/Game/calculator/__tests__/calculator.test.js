import { BOARD_EMPTY, COLORS } from "~constants";

import calculate from "../calculator";

const { BLACK, WHITE } = COLORS;
const WHITE_PIECE = { color: WHITE };
const BLACK_PIECE = { color: BLACK };

const createInitialMove = ({ start, end, config = BOARD_EMPTY, piece = BLACK_PIECE }) => {
  config[start] = piece;

  return { start, end, config, piece };
};

describe("calculator", () => {
  it("should calculate expected properties for move: 1a -> 1b", () => {
    const move = createInitialMove({ start: "1a", end: "1b" });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDelta: 1,
        rowDelta: 0,
        prevColIndex: 0,
        prevRowIndex: 7,
        nextColIndex: 1,
        nextRowIndex: 7,
        isSingleSpace: true,
        isTake: false,
        isOccupied: false,
      })
    );
  });

  it("should calculate expected properties for move: 7a -> 4c", () => {
    const move = createInitialMove({ start: "7a", end: "4c" });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDelta: 2,
        rowDelta: 3,
        prevColIndex: 0,
        prevRowIndex: 1,
        nextColIndex: 2,
        nextRowIndex: 4,
        isDiagonal: false,
        isHorizontal: false,
        isLShaped: false,
      })
    );
  });

  it("should calculate expected properties for move: 6h -> 2a", () => {
    const move = createInitialMove({ start: "6h", end: "2a", config: { ...BOARD_EMPTY, "2a": BLACK_PIECE } });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDelta: -7,
        rowDelta: 4,
        prevColIndex: 7,
        prevRowIndex: 2,
        nextColIndex: 0,
        nextRowIndex: 6,
        isOccupied: true,
        isTake: false,
        isSingleSpace: false,
        isSameSpace: false,
      })
    );
  });

  it("should calculate expected properties for move: 1h -> 8a", () => {
    const move = createInitialMove({ start: "1h", end: "8a", config: { ...BOARD_EMPTY, "8a": WHITE_PIECE } });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDelta: -7,
        rowDelta: -7,
        prevColIndex: 7,
        prevRowIndex: 7,
        nextColIndex: 0,
        nextRowIndex: 0,
        isOccupied: false,
        isTake: true,
        isSingleSpace: false,
        isSameSpace: false,
      })
    );
  });
});
