import { COLORS, PIECE_TYPES } from "~constants";
import { BOARD_EMPTY } from "../../constants";

import calculate from "../../calculator";
import IllegalMoveError, { ERROR_OCCUPIED, ERROR_SAME_SPACE } from "../error";

import validate from "../validator";

const { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } = PIECE_TYPES;
const { BLACK, WHITE } = COLORS;

const WHITE_PAWN = { color: WHITE, type: PAWN };
const BLACK_PAWN = { color: BLACK, type: PAWN };

const calcMove = ({ start, end, config = BOARD_EMPTY, piece = BLACK_PAWN }) => {
  config[start] = piece;

  return [calculate({ start, end, config, piece }), piece];
};

const getErr = (err) => `IllegalMoveError: ${err}`;

describe("validator", () => {
  let conSpy;

  beforeEach(() => {
    conSpy = jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should error on same-space movements", () => {
    const [move, piece] = calcMove({ start: "1a", end: "1a" });

    validate(move, piece);

    expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_SAME_SPACE));
  });

  it("should error if moving to friendly-occupied psace", () => {
    const [move, piece] = calcMove({ start: "1a", end: "2a", config: { ...BOARD_EMPTY, "2a": BLACK_PAWN } });

    validate(move, piece);

    expect(conSpy).toHaveBeenCalledWith(getErr(ERROR_OCCUPIED));
  });
});
