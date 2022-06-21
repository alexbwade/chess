import { BOARD_NEW_GAME, STATUSES, PLAYERS } from "~constants";
import calcMoveEvent from "../../calcMoveEvent";

import getValidationObject from "../getValidationObject";

const { PLAYER_1, PLAYER_2 } = PLAYERS;
const { CLEAR } = STATUSES;

const getMockEvent = (moveProps, boardProps) => {
  const defaultBoard = { config: { ...BOARD_NEW_GAME }, status: CLEAR, turn: PLAYER_1 };
  const defaultMove = { start: "2c", end: "3c", player: PLAYER_1 };

  const board = { ...defaultBoard, ...boardProps };
  const move = { ...defaultMove, ...moveProps };

  return calcMoveEvent(board, move);
};

describe("getValidationObject", () => {
  it("includes piece in object", () => {
    const event = getMockEvent({ start: "2c", end: "3c" });
    const piece = event.prevConfig[event.start];

    expect(getValidationObject(event).piece).toEqual(piece);
  });

  describe("player", () => {
    describe("isYourTurn", () => {
      it("should correctly validate player turn", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isYourTurn).toBe(true);
      });

      it("should correctly validate NOT player turn", () => {
        const event = getMockEvent({ start: "2c", end: "3c" }, { turn: PLAYER_2 });

        expect(getValidationObject(event).isYourTurn).toBe(false);
      });
    });

    describe("isYourPiece", () => {
      it("should correctly validate player piece", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isYourPiece).toBe(true);
      });

      it("should correctly validate NOT player piece", () => {
        const event = getMockEvent({ start: "2c", end: "3c", player: PLAYER_2 });

        expect(getValidationObject(event).isYourPiece).toBe(false);
      });
    });
  });

  // describe("status", () => {
  // wereChecked,
  // areChecked,
  // stillChecked,
  // });

  describe("movement", () => {
    describe("isSameSpace", () => {
      it("should correctly validate same space", () => {
        const event = getMockEvent({ start: "2c", end: "2c" });

        expect(getValidationObject(event).isSameSpace).toBe(true);
      });

      it("should correctly validate NOT same space", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isSameSpace).toBe(false);
      });
    });

    describe("isSingleSpace", () => {
      it("should correctly validate single space", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isSingleSpace).toBe(true);
      });

      it("should correctly validate NOT single space", () => {
        const event = getMockEvent({ start: "2c", end: "4c" });

        expect(getValidationObject(event).isSingleSpace).toBe(false);
      });
    });

    describe("isTwoSpaces", () => {
      it("should correctly validate two spaces", () => {
        const event = getMockEvent({ start: "2c", end: "4c" });

        expect(getValidationObject(event).isTwoSpaces).toBe(true);
      });

      it("should correctly validate NOT two spaces", () => {
        const event = getMockEvent({ start: "2c", end: "6c" });

        expect(getValidationObject(event).isTwoSpaces).toBe(false);
      });
    });

    describe("isForward", () => {
      it("should correctly validate forward movement", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isForward).toBe(true);
      });

      it("should correctly validate NOT forward movement", () => {
        const event = getMockEvent({ start: "2c", end: "1c" });

        expect(getValidationObject(event).isForward).toBe(false);
      });
    });

    describe("isClearPath", () => {
      it("should correctly validate a clear path", () => {
        const event = getMockEvent({ start: "2c", end: "4c" });

        expect(getValidationObject(event).isClearPath).toBe(true);
      });

      it("should correctly validate a path with an obstructing piece", () => {
        const event = getMockEvent({ start: "1c", end: "3a" });

        expect(getValidationObject(event).isClearPath).toBe(false);
      });
    });
  });

  describe("direction", () => {
    describe("isVertical", () => {
      it("should correctly validate a vertical direction", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isVertical).toBe(true);
      });

      it("should correctly validate a non-vertical direction", () => {
        const event = getMockEvent({ start: "2c", end: "2b" });

        expect(getValidationObject(event).isVertical).toBe(false);
      });
    });

    describe("isHorizontal", () => {
      it("should correctly validate a horizontal direction", () => {
        const event = getMockEvent({ start: "2c", end: "2b" });

        expect(getValidationObject(event).isHorizontal).toBe(true);
      });

      it("should correctly validate a non-horizontal direction", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isHorizontal).toBe(false);
      });
    });

    describe("isDiagonal", () => {
      it("should correctly validate a diagonal direction", () => {
        const event = getMockEvent({ start: "2c", end: "3b" });

        expect(getValidationObject(event).isDiagonal).toBe(true);
      });

      it("should correctly validate a non-diagonal direction", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isDiagonal).toBe(false);
      });
    });

    describe("isLShaped", () => {
      it("should correctly validate an l-shaped direction", () => {
        const event = getMockEvent({ start: "1b", end: "3c" });

        expect(getValidationObject(event).isLShaped).toBe(true);
      });

      it("should correctly validate a non-l-shaped direction", () => {
        const event = getMockEvent({ start: "2c", end: "3c" });

        expect(getValidationObject(event).isLShaped).toBe(false);
      });
    });
  });

  describe("piece interactions", () => {
    describe("isOccupied", () => {
      it("should correctly identify a move destination occupied by a friendly piece", () => {
        const event = getMockEvent({ start: "1b", end: "2d" });

        expect(getValidationObject(event).isOccupied).toBe(true);
      });

      it("should correctly identify a move destination that is NOT occupied by a friendly piece", () => {
        const event = getMockEvent({ start: "1b", end: "3c" });

        expect(getValidationObject(event).isOccupied).toBe(false);
      });
    });

    describe("isTake", () => {
      it("should correctly identify a take/capture of an enemy piece", () => {
        const event = getMockEvent({ start: "1b", end: "7c" });

        expect(getValidationObject(event).isTake).toBe(true);
      });

      it("should correctly identify a move that is NOT a take/capture of an enemy piece", () => {
        const event = getMockEvent({ start: "1b", end: "3c" });

        expect(getValidationObject(event).isTake).toBe(false);
      });
    });
  });
});
