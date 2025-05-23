import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const taches = [
	{
		id: '1',
		nom: 'Tâche 1',
		description: 'Desc 1',
		localisation: 'Paris',
		dateHeure: '23/05/2025, 12:00',
		completed: false,
	},
	{
		id: '2',
		nom: 'Tâche 2',
		description: 'Desc 2',
		localisation: 'Lyon',
		dateHeure: '24/05/2025, 14:00',
		completed: true,
	},
];

describe('App intégration', () => {
	beforeEach(() => {
		window.alert = jest.fn();
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ features: [{ place_name: 'Paris, France' }] }),
			}),
		) as jest.Mock;
	});

	afterEach(() => {
		(global.fetch as jest.Mock).mockRestore?.();
	});

	it('affiche la liste et permet de filtrer', () => {
		render(<App taches={taches} />);
		expect(screen.getByText('Tâche 1')).toBeInTheDocument();
		expect(screen.getByText('Tâche 2')).toBeInTheDocument();
		fireEvent.click(screen.getByText('En cours'));
		expect(screen.getByText('Tâche 1')).toBeInTheDocument();
		expect(screen.queryByText('Tâche 2')).not.toBeInTheDocument();
		fireEvent.click(screen.getByText('Realisées'));
		expect(screen.getByText('Tâche 2')).toBeInTheDocument();
		expect(screen.queryByText('Tâche 1')).not.toBeInTheDocument();
	});

	it('ajoute une tâche via TodoForm', async () => {
		const { getByTestId } = render(<App taches={[]} />);
		fireEvent.click(screen.getByTitle('Ajouter une nouvelle tâche'));
		fireEvent.change(screen.getByPlaceholderText(/tâche à réaliser/i), {
			target: { value: 'Nouvelle tâche' },
		});
		fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
		fireEvent.change(screen.getByPlaceholderText(/description/i), {
			target: { value: 'Desc' },
		});
		fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
		fireEvent.change(screen.getByPlaceholderText(/localisation/i), {
			target: { value: 'Par' },
		});
		await waitFor(() => screen.getByText('Paris, France'));
		fireEvent.click(screen.getByText('Paris, France'));
		fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
		fireEvent.change(screen.getByPlaceholderText(/date/i), {
			target: { value: '25/05/2025, 10:00' },
		});
		fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
		fireEvent.click(screen.getByRole('button', { name: /ajouter/i }));
		expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument();
	});
});
