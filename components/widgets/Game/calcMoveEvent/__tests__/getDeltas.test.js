import getDeltas from "../getDeltas";

describe("getDeltas", () => {
  it("should calculate expected properties for move: 1a -> 1b", () => {
    expect(getDeltas({ start: "1a", end: "1b" })).toEqual(
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

  it("should calculate expected properties for move: 7a -> 4c", () => {
    expect(getDeltas({ start: "7a", end: "4c" })).toEqual(
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

  it("should calculate expected properties for move: 6h -> 2a", () => {
    expect(getDeltas({ start: "6h", end: "2a" })).toEqual(
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

  it("should calculate expected properties for move: 1h -> 8a", () => {
    expect(getDeltas({ start: "1h", end: "8a" })).toEqual(
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
