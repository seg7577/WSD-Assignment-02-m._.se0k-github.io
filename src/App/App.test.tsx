import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Header/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders Home component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Home/i);
  expect(linkElement).toBeInTheDocument();
});
