import { render, screen } from "@testing-library/react";

import Home from "../Home";

jest.mock("~widgets/Game", () => global.componentMock("ChessGame"));

describe("<Home />", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it(`renders heading`, () => {
    expect(screen.getByRole("heading")).toHaveTextContent("Chess");
  });

  it(`renders a chess game`, () => {
    expect(screen.getByTestId("ChessGame")).toBeInTheDocument();
  });
});
