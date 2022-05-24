import { BOARD_EMPTY, COLORS, PLAYERS } from "~constants";

import getCoreProperties from "../getCoreProperties";
import getDirection from "../getDirection";
import getSpacesInPath from "../getSpacesInPath";

import getMiscProperties from "../getMiscProperties";

const { BLACK, WHITE } = COLORS;
const { PLAYER_1, PLAYER_2 } = PLAYERS;
const WHITE_PIECE = { color: WHITE };
const BLACK_PIECE = { color: BLACK };

const getMove = ({ start, end, config = BOARD_EMPTY, piece = BLACK_PIECE, turn = PLAYER_2, player = PLAYER_2 }) => {
  // assume the starting position contains the moving piece
  config[start] = piece;

  return getSpacesInPath(getDirection(getCoreProperties({ start, end, config, piece, turn, player })));
};

describe("getMiscProperties", () => {
  describe("isForward", () => {
    it("should calculate forward movement for white piece", () => {
      const move = getMove({ start: "1a", end: "3c", piece: WHITE_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toBe(true);
    });

    it("should calculate non-forward movement for white piece", () => {
      const move = getMove({ start: "3c", end: "1a", piece: WHITE_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toBe(false);
    });

    it("should calculate forward movement for black piece", () => {
      const move = getMove({ start: "3c", end: "1a", piece: BLACK_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toBe(true);
    });

    it("should calculate non-forward movement for black piece", () => {
      const move = getMove({ start: "1a", end: "3c", piece: BLACK_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toBe(false);
    });

    it("should catch invalid piece color", () => {
      const move = getMove({ start: "1a", end: "3c", piece: { color: "blah" } });

      expect(() => {
        getMiscProperties(move);
      }).toThrow("Invalid piece color.");
    });
  });

  describe("isSameSpace", () => {
    it("should calculate non-movement", () => {
      const move = getMove({ start: "1a", end: "1a" });
      const result = getMiscProperties(move);

      expect(result.isSameSpace).toBe(true);
    });

    it("should calculate movement", () => {
      const move = getMove({ start: "1a", end: "3a" });
      const result = getMiscProperties(move);

      expect(result.isSameSpace).toBe(false);
    });
  });

  describe("isOccupied", () => {
    it("should calculate a move to a friendly-occupied space", () => {
      const movingPiece = WHITE_PIECE;
      const pieceAtDestination = WHITE_PIECE;
      const move = getMove({
        start: "1a",
        end: "2a",
        piece: movingPiece,
        config: { ...BOARD_EMPTY, "2a": pieceAtDestination },
      });
      const result = getMiscProperties(move);

      expect(result.isOccupied).toBe(true);
    });

    it("should calculate a move to an enemy-occupied space", () => {
      const movingPiece = WHITE_PIECE;
      const pieceAtDestination = BLACK_PIECE;
      const move = getMove({
        start: "1a",
        end: "2a",
        piece: movingPiece,
        config: { ...BOARD_EMPTY, "2a": pieceAtDestination },
      });
      const result = getMiscProperties(move);

      expect(result.isOccupied).toBe(false);
    });

    it("should calculate a move to an empty space", () => {
      const movingPiece = WHITE_PIECE;
      const pieceAtDestination = null;
      const move = getMove({
        start: "1a",
        end: "2a",
        piece: movingPiece,
        config: { ...BOARD_EMPTY, "2a": pieceAtDestination },
      });
      const result = getMiscProperties(move);

      expect(result.isOccupied).toBe(false);
    });
  });

  describe("isSingleSpace", () => {
    it("should calculate a single space", () => {
      const move = getMove({ start: "1a", end: "2a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toBe(true);
    });

    it("should calculate a non-single space", () => {
      const move = getMove({ start: "1a", end: "1a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toBe(false);
    });

    it("should calculate for multiple spaces", () => {
      const move = getMove({ start: "1a", end: "3a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toBe(false);
    });
  });

  describe("isTake", () => {
    it("should calculate a take (i.e. opponent kill)", () => {
      const movingPiece = WHITE_PIECE;
      const pieceAtDestination = BLACK_PIECE;
      const move = getMove({
        start: "1a",
        end: "2a",
        piece: movingPiece,
        config: { ...BOARD_EMPTY, "2a": pieceAtDestination },
      });
      const result = getMiscProperties(move);

      expect(result.isTake).toBe(true);
    });

    it("should calculate a non-take (e.g. friendly occupied)", () => {
      const movingPiece = BLACK_PIECE;
      const pieceAtDestination = BLACK_PIECE;
      const move = getMove({
        start: "1a",
        end: "2a",
        piece: movingPiece,
        config: { ...BOARD_EMPTY, "2a": pieceAtDestination },
      });
      const result = getMiscProperties(move);

      expect(result.isTake).toBe(false);
    });

    it("should calculate a non-take for ordinary movement", () => {
      const move = getMove({ start: "1a", end: "2a" });
      const result = getMiscProperties(move);

      expect(result.isTake).toBe(false);
    });
  });

  describe("hasClearPath", () => {
    it("should calculate clear path", () => {
      const move = getMove({ start: "1a", end: "3c" });
      const result = getMiscProperties(move);

      expect(result.hasClearPath).toBe(true);
    });

    it("should calculate a non-clear path", () => {
      const move = getMove({ start: "1a", end: "3c", config: { ...BOARD_EMPTY, "2b": WHITE_PIECE } });
      const result = getMiscProperties(move);

      expect(result.hasClearPath).toBe(false);
    });
  });

  describe("isCastle", () => {
    it("todo", () => {
      const move = getMove({ start: "1a", end: "3c", config: { ...BOARD_EMPTY, "2b": WHITE_PIECE } });
      const result = getMiscProperties(move);

      expect(result.isCastle).toBe(false);
    });
  });

  describe("isYourTurn", () => {
    it("should calculate that it's currently your turn", () => {
      const move = getMove({ start: "1a", end: "3c", turn: PLAYER_2 });
      const result = getMiscProperties(move);

      expect(result.isYourTurn).toBe(true);
    });

    it("should calculate that it's currently NOT your turn", () => {
      const move = getMove({ start: "1a", end: "3c", turn: PLAYER_1 });
      const result = getMiscProperties(move);

      expect(result.isYourTurn).toBe(false);
    });
  });

  describe("isYourPiece", () => {
    it("should calculate that the piece belongs to you", () => {
      const move = getMove({ start: "1a", end: "3c", piece: BLACK_PIECE, player: PLAYER_2 });
      const result = getMiscProperties(move);

      expect(result.isYourPiece).toBe(true);
    });

    it("should calculate that the piece does NOT belong to you", () => {
      const move = getMove({ start: "1a", end: "3c", piece: BLACK_PIECE, player: PLAYER_1 });
      const result = getMiscProperties(move);

      expect(result.isYourPiece).toBe(false);
    });
  });
});
