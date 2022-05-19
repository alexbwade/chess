import getCoreProperties from "../getCoreProperties";
import getDirection from "../getDirection";

import getSpacesInPath from "../getSpacesInPath";

const getMove = ({ start, end }) => getDirection(getCoreProperties({ start, end }));

describe("getSpacesInPath", () => {
  it("should calculate spaces properly for: 1a -> 3c", () => {
    const move = getMove({ start: "1a", end: "3c" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual(["2b"]);
  });

  it("should calculate spaces properly for: 2d -> 6d", () => {
    const move = getMove({ start: "2d", end: "6d" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual(["3d", "4d", "5d"]);
  });

  it("should calculate spaces properly for: 4a -> 4f", () => {
    const move = getMove({ start: "4a", end: "4f" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual(["4b", "4c", "4d", "4e"]);
  });

  it("should return empty array if it is an l-shaped path", () => {
    const move = getMove({ start: "1a", end: "3b" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual([]);
  });

  it("should return empty array if it is non-standard path", () => {
    const move = getMove({ start: "8a", end: "2c" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual([]);
  });

  it("should return empty array if there are no spaces between (moving 1 space)", () => {
    const move = getMove({ start: "1a", end: "2b" });
    const result = getSpacesInPath(move);

    expect(result.spacesInPath).toEqual([]);
  });
});
