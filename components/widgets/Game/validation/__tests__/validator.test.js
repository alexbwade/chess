import { BOARD_TEST, COLORS, PIECE_TYPES, PLAYERS, STATUSES } from "~constants";
import calcMoveEvent from "../../calcMoveEvent";

import IllegalMoveError, {
  ERROR_SAME_SPACE,
  ERROR_OCCUPIED,
  ERROR_BLOCKED,
  ERROR_NOT_YOUR_PIECE,
  ERROR_NOT_YOUR_TURN,
  ERROR_BISHOP,
  ERROR_KING,
  ERROR_KNIGHT,
  ERROR_PAWN,
  ERROR_QUEEN,
  ERROR_ROOK,
} from "../error";

import validateMove from "../validate";

const { WHITE } = COLORS;
const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;
const { PLAYER_1, PLAYER_2 } = PLAYERS;
const { CLEAR } = STATUSES;

const getMockEvent = (moveProps, boardProps) => {
  const defaultBoard = { config: { ...BOARD_TEST }, status: CLEAR, turn: PLAYER_1 };
  const defaultMove = { start: "2c", end: "3c", player: PLAYER_1 };

  const board = { ...defaultBoard, ...boardProps };
  const move = { ...defaultMove, ...moveProps };

  return calcMoveEvent(board, move);
};

const getErr = (err) => `IllegalMoveError: ${err}`;

function validate(move, piece) {
  try {
    validateMove(move, piece);

    return true;
  } catch (err) {
    if (err instanceof IllegalMoveError) {
      return `${err.name}: ${err.message}`;
    }

    throw err;
  }
}

describe("validator", () => {
  describe("happy path", () => {
    it(`should allow a valid ${BISHOP} move`, () => {
      const event = getMockEvent({ start: "1c", end: "3e" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${KING} move`, () => {
      const event = getMockEvent({ start: "1e", end: "2e" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${KNIGHT} move`, () => {
      const event = getMockEvent({ start: "1b", end: "3c" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${PAWN} move`, () => {
      const event = getMockEvent({ start: "2c", end: "3c" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${PAWN} take/capture`, () => {
      const event = getMockEvent({ start: "7f", end: "8g" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${QUEEN} move`, () => {
      const event = getMockEvent({ start: "1d", end: "4g" });

      expect(validate(event)).toBe(true);
    });

    it(`should allow a valid ${ROOK} move`, () => {
      const event = getMockEvent({ start: "1a", end: "6a" });

      expect(validate(event)).toBe(true);
    });
  });

  describe("sad path", () => {
    describe("generic errors", () => {
      it("should error if not the player's turn", () => {
        const event = getMockEvent({ start: "1b", end: "3c" }, { turn: PLAYER_2 });

        expect(validate(event)).toBe(getErr(ERROR_NOT_YOUR_TURN));
      });

      it("should error if not the player's piece", () => {
        const event = getMockEvent({ start: "8c", end: "5f" });

        expect(validate(event)).toBe(getErr(ERROR_NOT_YOUR_PIECE));
      });

      it("should error on same-space movements", () => {
        const event = getMockEvent({ start: "1d", end: "1d" });

        expect(validate(event)).toBe(getErr(ERROR_SAME_SPACE));
      });

      it("should error if moving to friendly-occupied space", () => {
        const event = getMockEvent({ start: "1h", end: "1g" });

        expect(validate(event)).toBe(getErr(ERROR_OCCUPIED));
      });

      it("should error if path not clear", () => {
        const event = getMockEvent({ start: "1d", end: "5d" });

        expect(validate(event)).toBe(getErr(ERROR_BLOCKED));
      });

      it("should error if invalid piece", () => {
        const INVALID_PIECE_TYPE = "blererg";
        const event = getMockEvent(
          { start: "1d", end: "5d" },
          { config: { ...BOARD_TEST, "1d": { type: INVALID_PIECE_TYPE, color: WHITE } } }
        );

        expect(() => validate(event)).toThrow(TypeError);
      });
    });

    describe("piece-specific errors", () => {
      it(`should not allow an invalid ${BISHOP} move`, () => {
        const event = getMockEvent({ start: "1f", end: "3f" });

        expect(validate(event)).toBe(getErr(ERROR_BISHOP));
      });

      it(`should not allow an invalid ${KING} move`, () => {
        const event = getMockEvent({ start: "1e", end: "3e" });

        expect(validate(event)).toBe(getErr(ERROR_KING));
      });

      it(`should not allow an invalid ${KNIGHT} move`, () => {
        const event = getMockEvent({ start: "1b", end: "2b" });

        expect(validate(event)).toBe(getErr(ERROR_KNIGHT));
      });

      it(`should not allow an invalid ${PAWN} move`, () => {
        const event = getMockEvent({ start: "2c", end: "2d" });

        expect(validate(event)).toBe(getErr(ERROR_PAWN));
      });

      it(`should not allow an invalid ${QUEEN} move`, () => {
        const event = getMockEvent({ start: "1d", end: "3e" });

        expect(validate(event)).toBe(getErr(ERROR_QUEEN));
      });

      it(`should not allow an invalid ${ROOK} move`, () => {
        const event = getMockEvent({ start: "1h", end: "4e" });

        expect(validate(event)).toBe(getErr(ERROR_ROOK));
      });
    });
  });
});
