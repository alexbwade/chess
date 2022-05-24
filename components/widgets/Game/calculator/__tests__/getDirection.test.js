import { DIRECTIONS } from "~constants";

import getDirection from "../getDirection";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, OTHER } = DIRECTIONS;

describe("getDirection", () => {
  it(`calculates ${VERTICAL} movements`, () => {
    const move = { start: "1b", end: "2b", rowDelta: 1, colDelta: 0 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: VERTICAL,
        isVertical: true,
        isHorizontal: false,
        isLShaped: false,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${HORIZONTAL} movements`, () => {
    const move = { start: "2a", end: "2d", rowDelta: 0, colDelta: 3 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: HORIZONTAL,
        isVertical: false,
        isHorizontal: true,
        isLShaped: false,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${DIAGONAL} movements`, () => {
    const move = { start: "2a", end: "4c", rowDelta: 2, colDelta: 2 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: DIAGONAL,
        isVertical: false,
        isHorizontal: false,
        isLShaped: false,
        isDiagonal: true,
      })
    );
  });

  it(`calculates ${L_SHAPE} movements`, () => {
    const move = { start: "2a", end: "1c", rowDelta: 1, colDelta: 2 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: L_SHAPE,
        isVertical: false,
        isHorizontal: false,
        isLShaped: true,
        isDiagonal: false,
      })
    );
  });

  it(`calculates ${OTHER} movements`, () => {
    const move = { start: "1a", end: "2f", rowDelta: 1, colDelta: 5 };
    const result = getDirection(move);

    expect(result).toEqual(
      expect.objectContaining({
        direction: OTHER,
        isVertical: false,
        isHorizontal: false,
        isLShaped: false,
        isDiagonal: false,
      })
    );
  });
});
