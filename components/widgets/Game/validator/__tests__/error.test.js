import IllegalMoveError from "../error";

describe("IllegalMoveError", () => {
  it("creates a special error type", () => {
    const message = "test message";
    const error = new IllegalMoveError(message);

    expect(error.message).toBe(message);
  });
});
