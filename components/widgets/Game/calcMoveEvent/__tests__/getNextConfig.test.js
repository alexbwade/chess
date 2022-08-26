import { BOARD_NEW_GAME, BOARD_TEST, COLORS, PIECE_TYPES } from "~constants";

// used as a helper, do not debug getNextConfig unless getDeltas is passing
import getDeltas from "../getDeltas";

import getNextConfig from "../getNextConfig";

const { WHITE } = COLORS;
const { KNIGHT, QUEEN } = PIECE_TYPES;

describe("getNextConfig", () => {
  let board;

  beforeEach(() => {
    board = {
      config: BOARD_NEW_GAME,
    };
  });

  it("should calculate correct board config for moving left white knight from b1 -> c3", () => {
    const move = { start: "b1", end: "c3" };
    const deltas = getDeltas(move);

    const nextConfig = getNextConfig({ board, move, deltas });

    expect(nextConfig).toEqual({
      ...BOARD_NEW_GAME,
      b1: null,
      c3: { color: WHITE, type: KNIGHT, moved: true },
    });
  });

  it("should calculate correct board config for moving white queen to end of board", () => {
    board = { config: BOARD_TEST };

    const move = { start: "f7", end: "f8" };
    const deltas = getDeltas(move);

    const nextConfig = getNextConfig({ board, move, deltas });

    expect(nextConfig).toEqual({
      ...BOARD_TEST,
      f7: null,
      f8: { color: WHITE, type: QUEEN, moved: true },
    });
  });
});
