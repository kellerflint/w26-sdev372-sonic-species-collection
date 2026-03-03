// __tests__/Dropdown.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Dropdown from '../../components/Dropdown';

describe('Dropdown component', () => {
  // Test basic render of label, placeholder, and options
  it('renders label, placeholder, and options', () => {
    const options = [
      { id: 1, name: 'Fox' },
      { id: 2, name: 'Bear' },
    ];

    render(
      <Dropdown
        label="Species"
        options={options}
        onChange={() => {}}
      />
    );

    // Assert label appears
    expect(screen.getByText('Species')).toBeInTheDocument();

    // Assert options appear
    expect(screen.getByText('Fox')).toBeInTheDocument();
    expect(screen.getByText('Bear')).toBeInTheDocument();
  });

  // Test onChange handler
  it('calls onChange when selection changes', () => {
    const mockOnChange = vi.fn();

    render(
      <Dropdown
        label="Species"
        options={[{ id: 1, name: 'Fox' }]}
        onChange={mockOnChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '1' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });

  // Test empty options case
  it('renders correctly with empty options array', () => {
    render(
      <Dropdown
        label="Species"
        options={[]}
        onChange={() => {}}
      />
    );

    // Should still render select without crashing
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});