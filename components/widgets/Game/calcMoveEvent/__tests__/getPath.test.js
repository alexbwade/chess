import getDeltas from "../getDeltas";
import getDirection from "../getDirection";

import getPath from "../getPath";

const getArgs = ({ start, end }) => {
  const deltas = getDeltas({ start, end });
  const direction = getDirection(deltas);

  return [deltas, direction];
};

describe("getPath", () => {
  it("should calculate spaces properly for: 1a -> 3c", () => {
    const args = getArgs({ start: "1a", end: "3c" });
    const result = getPath(...args);

    expect(result).toEqual(["2b"]);
  });

  it("should calculate spaces properly for: 2d -> 6d", () => {
    const args = getArgs({ start: "2d", end: "6d" });
    const result = getPath(...args);

    expect(result).toEqual(["3d", "4d", "5d"]);
  });

  it("should calculate spaces properly for: 4a -> 4f", () => {
    const args = getArgs({ start: "4a", end: "4f" });
    const result = getPath(...args);

    expect(result).toEqual(["4b", "4c", "4d", "4e"]);
  });

  it("should return empty array if it is an l-shaped path", () => {
    const args = getArgs({ start: "1a", end: "3b" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should return empty array if it is non-standard path", () => {
    const args = getArgs({ start: "8a", end: "2c" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should return empty array if there are no spaces between (moving 1 space)", () => {
    const args = getArgs({ start: "1a", end: "2b" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should catch infinite loops", () => {
    const args = getArgs({ start: "1a", end: "7c" });
    args.direction = "invalid";

    expect(() => {
      getPath(args);
    }).toThrow(Error);
  });
});
