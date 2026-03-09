import { render, screen } from '@testing-library/react';
import CharacterStrip from '../../components/CharacterStrip';

describe('CharacterStrip', () => {
  it('renders all expected character images with correct alt text', () => {
    const characters = ['Amy', 'Blaze', 'Cream', 'Eggman', 'Knuckles', 'Shadow', 'Tails'];

    render(<CharacterStrip />);

    characters.forEach((char) => {
      const img = screen.getByAltText(char);
      expect(img).toBeInTheDocument();
    });
  });
});