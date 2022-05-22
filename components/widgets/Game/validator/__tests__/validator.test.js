import { BOARD_EMPTY, COLORS, PIECE_TYPES } from "~constants";

import calculate from "../../calculator";
import IllegalMoveError, {
  ERROR_SAME_SPACE,
  ERROR_OCCUPIED,
  ERROR_BLOCKED,
  ERROR_BISHOP,
  ERROR_KING,
  ERROR_KNIGHT,
  ERROR_PAWN,
  ERROR_QUEEN,
  ERROR_ROOK,
} from "../error";

import validateMove from "../validator";

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;
const { BLACK, WHITE } = COLORS;

const BLACK_PAWN = { color: BLACK, type: PAWN };

const calcMove = ({ start, end, config = BOARD_EMPTY, piece = BLACK_PAWN }) => {
  config[start] = piece;

  return [calculate({ start, end, config, piece }), piece];
};

const getErr = (err) => `IllegalMoveError: ${err}`;

function validate(move, piece) {
  try {
    validateMove(move, piece);

    return true;
  } catch (err) {
    if (err instanceof IllegalMoveError) {
      console.log(`${err.name}: ${err.message}`);

      return false;
    }

    throw err;
  }
}

describe("validator", () => {
  let conSpy;

  beforeEach(() => {
    conSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("happy path", () => {
    it(`should allow a valid ${BISHOP} move`, () => {
      const movingPiece = { type: BISHOP, color: BLACK };
      const [move, piece] = calcMove({ start: "1a", end: "4d", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });

    it(`should allow a valid ${KING} move`, () => {
      const movingPiece = { type: KING, color: BLACK };
      const [move, piece] = calcMove({ start: "1a", end: "2b", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });

    it(`should allow a valid ${KNIGHT} move`, () => {
      const movingPiece = { type: KNIGHT, color: BLACK };
      const [move, piece] = calcMove({ start: "1a", end: "2c", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });

    it(`should allow a valid ${PAWN} move`, () => {
      const movingPiece = { type: PAWN, color: WHITE };
      const [move, piece] = calcMove({ start: "1a", end: "2a", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });

    it(`should allow a valid ${QUEEN} move`, () => {
      const movingPiece = { type: QUEEN, color: BLACK };
      const [move, piece] = calcMove({ start: "1a", end: "8h", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });

    it(`should allow a valid ${ROOK} move`, () => {
      const movingPiece = { type: ROOK, color: BLACK };
      const [move, piece] = calcMove({ start: "1a", end: "8a", piece: movingPiece });

      expect(validate(move, piece)).toBe(true);
    });
  });

  describe("sad path", () => {
    it("throws an IllegalMoveError", () => {
      const [move, piece] = calcMove({ start: "1a", end: "1a" });

      expect(() => {
        validateMove(move, piece);
      }).toThrow(IllegalMoveError);
    });

    describe("generic errors", () => {
      it("should error on same-space movements", () => {
        const [move, piece] = calcMove({ start: "1a", end: "1a" });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_SAME_SPACE));
      });

      it("should error if moving to friendly-occupied space", () => {
        const [move, piece] = calcMove({ start: "1a", end: "2a", config: { ...BOARD_EMPTY, "2a": BLACK_PAWN } });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_OCCUPIED));
      });

      it("should error if path not clear", () => {
        const movingPiece = { color: BLACK, type: BISHOP };
        const [move, piece] = calcMove({
          start: "1a",
          end: "3c",
          piece: movingPiece,
          config: { ...BOARD_EMPTY, "2b": BLACK_PAWN },
        });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_BLOCKED));
      });

      it("should error if invalid piece", () => {
        const movingPiece = { color: BLACK, type: "weird" };
        const [move, piece] = calcMove({
          start: "1a",
          end: "3c",
          piece: movingPiece,
        });

        expect(() => {
          validate(move, piece);
        }).toThrow(TypeError);
      });
    });

    describe("piece-specific errors", () => {
      it(`should not allow an invalid ${BISHOP} move`, () => {
        const movingPiece = { type: BISHOP, color: BLACK };
        const [move, piece] = calcMove({ start: "1a", end: "4a", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_BISHOP));
      });

      it(`should not allow an invalid ${KING} move`, () => {
        const movingPiece = { type: KING, color: BLACK };
        const [move, piece] = calcMove({ start: "1a", end: "3c", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_KING));
      });

      it(`should not allow an invalid ${KNIGHT} move`, () => {
        const movingPiece = { type: KNIGHT, color: BLACK };
        const [move, piece] = calcMove({ start: "1a", end: "2b", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_KNIGHT));
      });

      it(`should not allow an invalid ${PAWN} move`, () => {
        const movingPiece = { type: PAWN, color: WHITE };
        const [move, piece] = calcMove({ start: "1a", end: "2b", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_PAWN));
      });

      it(`should not allow an invalid ${QUEEN} move`, () => {
        const movingPiece = { type: QUEEN, color: BLACK };
        const [move, piece] = calcMove({ start: "1a", end: "8f", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_QUEEN));
      });

      it(`should not allow an invalid ${ROOK} move`, () => {
        const movingPiece = { type: ROOK, color: BLACK };
        const [move, piece] = calcMove({ start: "1a", end: "8h", piece: movingPiece });

        validate(move, piece);

        expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_ROOK));
      });
    });
  });
});
