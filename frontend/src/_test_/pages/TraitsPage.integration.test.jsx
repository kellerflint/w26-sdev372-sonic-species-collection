import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import TraitsPage from '../../pages/TraitsPage';

describe('TraitsPage integration', () => {
	it('loads traits and renders species after user selection', async () => {
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce({
				json: async () => [{ id: 1, name: 'Fast' }],
			})
			.mockResolvedValueOnce({
				json: async () => ({ species: [{ id: 3, name: 'Fox' }] }),
			});

		render(
			<MemoryRouter>
				<TraitsPage />
			</MemoryRouter>
		);

		await screen.findByRole('option', { name: 'Fast' });

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: '1' },
		});

		expect(await screen.findByText('Species with: Fast')).toBeInTheDocument();
		expect(await screen.findByText('Fox')).toBeInTheDocument();
	});
});
