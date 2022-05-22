import { BOARD_NEW_GAME, COLORS, PIECE_TYPES, STATUSES } from "~constants";

import { updateBoard } from "../helpers";

const { PLAYER_1, PLAYER_2 } = STATUSES;
const { WHITE, BLACK } = COLORS;
const { PAWN } = PIECE_TYPES;

describe("updateBoard", () => {
  it("should return the new board state after a valid move", () => {
    const move = { start: "2a", end: "3a" };
    const board = {
      config: BOARD_NEW_GAME,
      status: PLAYER_1,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        "3a": { color: WHITE, type: PAWN },
      }),
      status: PLAYER_2,
    });
  });

  it("should return the original board state after an invalid move", () => {
    const move = { start: "7a", end: "6a" };
    const board = {
      config: BOARD_NEW_GAME,
      status: PLAYER_2,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        "6a": { color: BLACK, type: PAWN },
      }),
      status: PLAYER_1,
    });
  });
});
