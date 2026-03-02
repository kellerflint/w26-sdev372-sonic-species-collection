import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import SpeciesPage from '../../pages/SpeciesPage';

describe('SpeciesPage integration', () => {
	it('loads species and renders traits after user selection', async () => {
		global.fetch = vi
			.fn()
			.mockResolvedValueOnce({
				json: async () => [{ id: 1, name: 'Fox' }],
			})
			.mockResolvedValueOnce({
				json: async () => ({ traits: [{ id: 11, name: 'Fast' }] }),
			});

		render(
			<MemoryRouter>
				<SpeciesPage />
			</MemoryRouter>
		);

		await screen.findByRole('option', { name: 'Fox' });

		fireEvent.change(screen.getByRole('combobox'), {
			target: { value: '1' },
		});

		expect(await screen.findByText('Fox Traits')).toBeInTheDocument();
		expect(await screen.findByText('Fast')).toBeInTheDocument();
	});
});
