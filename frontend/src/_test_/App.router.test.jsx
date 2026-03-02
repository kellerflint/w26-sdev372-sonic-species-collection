import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App routing', () => {
	it('renders the home page route', () => {
		window.history.pushState({}, '', '/w26-sdev372-sonic-species-collection/');
		render(<App />);
		expect(screen.getByText(/SONIC SPECIES COLLECTION/i)).toBeInTheDocument();
	});
});
