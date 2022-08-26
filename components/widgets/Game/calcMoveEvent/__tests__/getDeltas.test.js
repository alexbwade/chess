import getDeltas from "../getDeltas";

describe("getDeltas", () => {
  it("should calculate expected properties for move: a1 -> b1", () => {
    expect(getDeltas({ start: "a1", end: "b1" })).toEqual(
      expect.objectContaining({
        colDelta: 1,
        rowDelta: 0,
        prevColIndex: 0,
        prevRowIndex: 7,
        nextColIndex: 1,
        nextRowIndex: 7,
      })
    );
  });

  it("should calculate expected properties for move: a7 -> c4", () => {
    expect(getDeltas({ start: "a7", end: "c4" })).toEqual(
      expect.objectContaining({
        colDelta: 2,
        rowDelta: 3,
        prevColIndex: 0,
        prevRowIndex: 1,
        nextColIndex: 2,
        nextRowIndex: 4,
      })
    );
  });

  it("should calculate expected properties for move: h6 -> a2", () => {
    expect(getDeltas({ start: "h6", end: "a2" })).toEqual(
      expect.objectContaining({
        colDelta: -7,
        colChange: 7,
        rowDelta: 4,
        rowChange: 4,
        prevColIndex: 7,
        prevRowIndex: 2,
        nextColIndex: 0,
        nextRowIndex: 6,
      })
    );
  });

  it("should calculate expected properties for move: h1 -> a8", () => {
    expect(getDeltas({ start: "h1", end: "a8" })).toEqual(
      expect.objectContaining({
        colDelta: -7,
        colChange: 7,
        rowDelta: -7,
        rowChange: 7,
        prevColIndex: 7,
        prevRowIndex: 7,
        nextColIndex: 0,
        nextRowIndex: 0,
      })
    );
  });
});
