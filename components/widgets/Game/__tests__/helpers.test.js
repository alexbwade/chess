import { BOARD_NEW_GAME, COLORS, PIECE_TYPES, PLAYERS, STATUSES } from "~constants";

import { updateBoard } from "../helpers";

const { PLAYER_1, PLAYER_2 } = PLAYERS;
const { WHITE, BLACK } = COLORS;
const { PAWN } = PIECE_TYPES;
const { CLEAR } = STATUSES;

describe("updateBoard", () => {
  it("should return the new board state after a valid move", () => {
    const move = { start: "2a", end: "3a", player: PLAYER_1 };
    const board = {
      config: BOARD_NEW_GAME,
      turn: PLAYER_1,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        "3a": { color: WHITE, type: PAWN, moved: true },
      }),
      status: CLEAR,
      turn: PLAYER_2,
    });
  });

  it("should update player turn", () => {
    const move = { start: "7a", end: "6a", player: PLAYER_2 };
    const board = {
      config: BOARD_NEW_GAME,
      turn: PLAYER_2,
    };

    expect(updateBoard(board, move)).toEqual({
      config: expect.objectContaining({
        "6a": { color: BLACK, type: PAWN, moved: true },
      }),
      status: CLEAR,
      turn: PLAYER_1,
    });
  });
});
