import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);

  expect(getByText(/Answers Headless React Test/i)).toBeInTheDocument();
});
