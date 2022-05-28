import { DIRECTIONS } from "~constants";

import getDirection from "../getDirection";

const { DIAGONAL, HORIZONTAL, VERTICAL, L_SHAPE, NONE, OTHER } = DIRECTIONS;

describe("getDirection", () => {
  it(`calculates non-movement (i.e. "${VERTICAL}")`, () => {
    const result = getDirection({ rowChange: 0, colChange: 0 });

    expect(result).toBe(NONE);
  });

  it(`calculates ${VERTICAL} movements`, () => {
    const result = getDirection({ rowChange: 1, colChange: 0 });

    expect(result).toBe(VERTICAL);
  });

  it(`calculates ${HORIZONTAL} movements`, () => {
    const result = getDirection({ rowChange: 0, colChange: 3 });

    expect(result).toBe(HORIZONTAL);
  });

  it(`calculates ${DIAGONAL} movements`, () => {
    const result = getDirection({ rowChange: 4, colChange: 4 });

    expect(result).toBe(DIAGONAL);
  });

  it(`calculates ${L_SHAPE} movements`, () => {
    const result = getDirection({ rowChange: 2, colChange: 1 });

    expect(result).toBe(L_SHAPE);
  });

  it(`calculates ${OTHER} movements`, () => {
    const result = getDirection({ rowChange: 2, colChange: 5 });

    expect(result).toBe(OTHER);
  });
});
