import { COLORS } from "~constants";

import getCoreProperties from "../getCoreProperties";
import getDirection from "../getDirection";
import getSpacesInPath from "../getSpacesInPath";

import getMiscProperties from "../getMiscProperties";
import { BOARD_EMPTY } from "../../constants";

const { BLACK, WHITE } = COLORS;
const WHITE_PIECE = { color: WHITE };
const BLACK_PIECE = { color: BLACK };

const getMove = ({ start, end, config = BOARD_EMPTY, piece = BLACK_PIECE }) => {
  // assume the starting position contains the moving piece
  config[start] = piece;
  return getSpacesInPath(getDirection(getCoreProperties({ start, end, config, piece })));
};

describe("getMiscProperties", () => {
  describe("isForward", () => {
    it("should calculate forward movement for white piece", () => {
      const move = getMove({ start: "1a", end: "3c", piece: WHITE_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toEqual(true);
    });

    it("should calculate non-forward movement for white piece", () => {
      const move = getMove({ start: "3c", end: "1a", piece: WHITE_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toEqual(false);
    });

    it("should calculate forward movement for black piece", () => {
      const move = getMove({ start: "3c", end: "1a", piece: BLACK_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toEqual(true);
    });

    it("should calculate non-forward movement for black piece", () => {
      const move = getMove({ start: "1a", end: "3c", piece: BLACK_PIECE });
      const result = getMiscProperties(move);

      expect(result.isForward).toEqual(false);
    });

    it("should catch invalid piece color", () => {
      const spy = jest.spyOn(console, "log");
      const move = getMove({ start: "1a", end: "3c", piece: { color: "blah" } });
      getMiscProperties(move);

      expect(spy).toHaveBeenCalledWith("Invalid piece color.");
    });
  });

  describe("isSameSpace", () => {
    it("should calculate non-movement", () => {
      const move = getMove({ start: "1a", end: "1a" });
      const result = getMiscProperties(move);

      expect(result.isSameSpace).toEqual(true);
    });

    it("should calculate movement", () => {
      const move = getMove({ start: "1a", end: "3a" });
      const result = getMiscProperties(move);

      expect(result.isSameSpace).toEqual(false);
    });
  });

  describe("isFriendlyOccupied", () => {
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

      expect(result.isFriendlyOccupied).toEqual(true);
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

      expect(result.isFriendlyOccupied).toEqual(false);
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

      expect(result.isFriendlyOccupied).toEqual(false);
    });
  });

  describe("isSingleSpace", () => {
    it("should calculate a single space", () => {
      const move = getMove({ start: "1a", end: "2a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toEqual(true);
    });

    it("should calculate a non-single space", () => {
      const move = getMove({ start: "1a", end: "1a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toEqual(false);
    });

    it("should calculate for multiple spaces", () => {
      const move = getMove({ start: "1a", end: "3a" });
      const result = getMiscProperties(move);

      expect(result.isSingleSpace).toEqual(false);
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

      expect(result.isTake).toEqual(true);
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

      expect(result.isTake).toEqual(false);
    });

    it("should calculate a non-take for ordinary movement", () => {
      const move = getMove({ start: "1a", end: "2a" });
      const result = getMiscProperties(move);

      expect(result.isTake).toEqual(false);
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
});
