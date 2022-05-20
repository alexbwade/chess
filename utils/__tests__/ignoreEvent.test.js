import ignoreEvent from "../ignoreEvent";

describe("ignoreEvent", () => {
  it("prevents default event behavior", () => {
    const mockEvent = { preventDefault: jest.fn() };

    ignoreEvent(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});
