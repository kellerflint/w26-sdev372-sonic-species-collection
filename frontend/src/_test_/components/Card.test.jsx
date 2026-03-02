// __tests__/Card.test.jsx

import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card component', () => {
  it('renders name', () => {
    render(<Card name="Fox" />);
    expect(screen.getByText('Fox')).toBeInTheDocument();
  });

  it('renders image only if imageUrl exists', () => {
    render(<Card name="Fox" imageUrl="/fox.png" />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Fox');
  });

  it('does NOT render image if imageUrl missing', () => {
    render(<Card name="Fox" />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});