import { BOARD_NEW_GAME, COLORS, PIECE_TYPES, PLAYERS, STATUSES } from "~constants";

import { updateBoard } from "../helpers";

const { PLAYER_1, PLAYER_2 } = PLAYERS;
const { WHITE, BLACK } = COLORS;
const { PAWN } = PIECE_TYPES;
const { CLEAR } = STATUSES;

describe("updateBoard", () => {
  it("should return the new board state after a valid move", () => {
    const move = { start: "a2", end: "a3", player: PLAYER_1 };
    const board = {
      config: BOARD_NEW_GAME,
      turn: PLAYER_1,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        a3: { color: WHITE, type: PAWN, moved: true },
      }),
      status: CLEAR,
      turn: PLAYER_2,
    });
  });

  it("should update player turn", () => {
    const move = { start: "a7", end: "a6", player: PLAYER_2 };
    const board = {
      config: BOARD_NEW_GAME,
      turn: PLAYER_2,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        a6: { color: BLACK, type: PAWN, moved: true },
      }),
      status: CLEAR,
      turn: PLAYER_1,
    });
  });
});
