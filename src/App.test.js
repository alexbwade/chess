import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chess link', () => {
  render(<App />);
  const linkElement = screen.getByText(/chess/i);
  expect(linkElement).toBeInTheDocument();
});
