import { render, screen } from '@testing-library/react';

import Board from '../Board';

const NUM_SQUARES = 64;

test(`renders ${NUM_SQUARES} squares`, () => {
  render(<Board />);

  const grid = screen.getByTestId('grid');
  const squareCount = grid.childNodes.length;

  expect(squareCount).toBe(NUM_SQUARES);
});
