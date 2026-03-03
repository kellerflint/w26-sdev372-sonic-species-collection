import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import SpeciesPage from '../../pages/SpeciesPage';

describe('SpeciesPage unit', () => {
	it('shows initial instruction and loads species list', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: async () => [{ id: 1, name: 'Fox' }],
		});

		render(
			<MemoryRouter>
				<SpeciesPage />
			</MemoryRouter>
		);

		expect(screen.getByText(/Select a species to see its traits\./i)).toBeInTheDocument();

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith('/api/all');
		});
	});
});
