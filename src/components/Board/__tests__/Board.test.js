import { render, screen } from '@testing-library/react';

import Board from '../Board';

test('renders 52 squares', () => {
  render(<Board />);

  const grid = screen.getByTestId('grid');
  const squareCount = grid.childNodes.length;

  expect(squareCount).toBe(64);
});
