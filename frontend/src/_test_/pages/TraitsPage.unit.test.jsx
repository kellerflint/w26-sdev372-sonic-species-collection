import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import TraitsPage from '../../pages/TraitsPage';

describe('TraitsPage unit', () => {
	it('shows initial instruction and loads trait list', async () => {
		global.fetch = vi.fn().mockResolvedValue({
			json: async () => [{ id: 1, name: 'Fast' }],
		});

		render(
			<MemoryRouter>
				<TraitsPage />
			</MemoryRouter>
		);

		expect(screen.getByText(/Select a trait to see which species have it\./i)).toBeInTheDocument();

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith('/api/traits');
		});
	});
});
