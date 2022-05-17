import getCoreProperties from "../getCoreProperties";

describe("getCoreProperties", () => {
  test("should calculate expected properties for move: 1a -> 1b", () => {
    expect(getCoreProperties({ start: "1a", end: "1b" })).toEqual(
      expect.objectContaining({
        colDiff: 1,
        rowDiff: 0,
        currentColIndex: 0,
        currentRowIndex: 7,
        targetColIndex: 1,
        targetRowIndex: 7,
      })
    );
  });

  test("should calculate expected properties for move: 7a -> 4c", () => {
    expect(getCoreProperties({ start: "7a", end: "4c" })).toEqual(
      expect.objectContaining({
        colDiff: 2,
        rowDiff: 3,
        currentColIndex: 0,
        currentRowIndex: 1,
        targetColIndex: 2,
        targetRowIndex: 4,
      })
    );
  });

  test("should calculate expected properties for move: 6h -> 2a", () => {
    expect(getCoreProperties({ start: "6h", end: "2a" })).toEqual(
      expect.objectContaining({
        colDiff: -7,
        rowDiff: 4,
        currentColIndex: 7,
        currentRowIndex: 2,
        targetColIndex: 0,
        targetRowIndex: 6,
      })
    );
  });

  test("should calculate expected properties for move: 1h -> 8a", () => {
    expect(getCoreProperties({ start: "1h", end: "8a" })).toEqual(
      expect.objectContaining({
        colDiff: -7,
        rowDiff: -7,
        currentColIndex: 7,
        currentRowIndex: 7,
        targetColIndex: 0,
        targetRowIndex: 0,
      })
    );
  });
});
