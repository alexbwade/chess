import handleLegacyDrag from "../handleLegacyDrag";

describe("handleLegacyDrag", () => {
  it("prevents default event behavior", () => {
    const mockEvent = { preventDefault: jest.fn() };

    handleLegacyDrag.onDragEnter(mockEvent);
    handleLegacyDrag.onDragOver(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(2);
  });
});
