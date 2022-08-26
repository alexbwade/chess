import getDeltas from "../getDeltas";
import getDirection from "../getDirection";

import getPath from "../getPath";

const getArgs = ({ start, end }) => {
  const deltas = getDeltas({ start, end });
  const direction = getDirection(deltas);

  return [deltas, direction];
};

describe("getPath", () => {
  it("should calculate spaces properly for: a1 -> c3", () => {
    const args = getArgs({ start: "a1", end: "c3" });
    const result = getPath(...args);

    expect(result).toEqual(["b2"]);
  });

  it("should calculate spaces properly for: d2 -> d6", () => {
    const args = getArgs({ start: "d2", end: "d6" });
    const result = getPath(...args);

    expect(result).toEqual(["d3", "d4", "d5"]);
  });

  it("should calculate spaces properly for: a4 -> f4", () => {
    const args = getArgs({ start: "a4", end: "f4" });
    const result = getPath(...args);

    expect(result).toEqual(["b4", "c4", "d4", "e4"]);
  });

  it("should return empty array if it is an l-shaped path", () => {
    const args = getArgs({ start: "a1", end: "b3" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should return empty array if it is non-standard path", () => {
    const args = getArgs({ start: "a8", end: "c2" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should return empty array if there are no spaces between (moving 1 space)", () => {
    const args = getArgs({ start: "a1", end: "b2" });
    const result = getPath(...args);

    expect(result).toEqual([]);
  });

  it("should catch infinite loops", () => {
    const args = getArgs({ start: "a1", end: "c7" });
    args.direction = "invalid";

    expect(() => {
      getPath(args);
    }).toThrow(Error);
  });
});
