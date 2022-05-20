import { DIRECTIONS } from "~constants";

import getDirection from "../getDirection";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, OTHER } = DIRECTIONS;

describe("getDirection", () => {
  it(`calculates ${VERTICAL} movements`, () => {
    const move = { start: "1b", end: "2b", rowDiff: 1, colDiff: 0 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: VERTICAL,
        isVertical: true,
        isHorizontal: false,
        isL: false,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${HORIZONTAL} movements`, () => {
    const move = { start: "2a", end: "2d", rowDiff: 0, colDiff: 3 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: HORIZONTAL,
        isVertical: false,
        isHorizontal: true,
        isL: false,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${DIAGONAL} movements`, () => {
    const move = { start: "2a", end: "4c", rowDiff: 2, colDiff: 2 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: DIAGONAL,
        isVertical: false,
        isHorizontal: false,
        isL: false,
        isDiagonal: true,
      })
    );
  });

  it(`calculates ${L_SHAPE} movements`, () => {
    const move = { start: "2a", end: "1c", rowDiff: 1, colDiff: 2 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: L_SHAPE,
        isVertical: false,
        isHorizontal: false,
        isL: true,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${OTHER} movements`, () => {
    const move = { start: "1a", end: "2f", rowDiff: 1, colDiff: 5 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: OTHER,
        isVertical: false,
        isHorizontal: false,
        isL: false,
        isDiagonal: false,
      })
    );
  });
});
