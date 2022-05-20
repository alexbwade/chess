import { COLORS } from "~constants";

import { BOARD_EMPTY } from "../../constants";

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
        colDiff: 1,
        rowDiff: 0,
        currentColIndex: 0,
        currentRowIndex: 7,
        targetColIndex: 1,
        targetRowIndex: 7,
        isSingleSpace: true,
        isTake: false,
        isFriendlyOccupied: false,
      })
    );
  });

  it("should calculate expected properties for move: 7a -> 4c", () => {
    const move = createInitialMove({ start: "7a", end: "4c" });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDiff: 2,
        rowDiff: 3,
        currentColIndex: 0,
        currentRowIndex: 1,
        targetColIndex: 2,
        targetRowIndex: 4,
        isDiagonal: false,
        isHorizontal: false,
        isL: false,
      })
    );
  });

  it("should calculate expected properties for move: 6h -> 2a", () => {
    const move = createInitialMove({ start: "6h", end: "2a", config: { ...BOARD_EMPTY, "2a": BLACK_PIECE } });

    expect(calculate(move)).toEqual(
      expect.objectContaining({
        colDiff: -7,
        rowDiff: 4,
        currentColIndex: 7,
        currentRowIndex: 2,
        targetColIndex: 0,
        targetRowIndex: 6,
        isFriendlyOccupied: true,
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
        colDiff: -7,
        rowDiff: -7,
        currentColIndex: 7,
        currentRowIndex: 7,
        targetColIndex: 0,
        targetRowIndex: 0,
        isFriendlyOccupied: false,
        isTake: true,
        isSingleSpace: false,
        isSameSpace: false,
      })
    );
  });
});
