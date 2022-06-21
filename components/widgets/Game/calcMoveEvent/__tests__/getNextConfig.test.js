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

  it("should calculate correct board config for moving left white knight from 1b -> 3c", () => {
    const move = { start: "1b", end: "3c" };
    const deltas = getDeltas(move);

    const nextConfig = getNextConfig({ board, move, deltas });

    expect(nextConfig).toEqual({
      ...BOARD_NEW_GAME,
      "1b": null,
      "3c": { color: WHITE, type: KNIGHT, moved: true },
    });
  });

  it("should calculate correct board config for moving white queen to end of board", () => {
    board = { config: BOARD_TEST };

    const move = { start: "7f", end: "8f" };
    const deltas = getDeltas(move);

    const nextConfig = getNextConfig({ board, move, deltas });

    expect(nextConfig).toEqual({
      ...BOARD_TEST,
      "7f": null,
      "8f": { color: WHITE, type: QUEEN, moved: true },
    });
  });
});
