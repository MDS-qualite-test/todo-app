import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ features: [{ place_name: 'Paris, France' }] })
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore?.();
  });

  it('affiche le bouton d’ajout initial', () => {
    render(<TodoForm ajtTache={jest.fn()} />);
    expect(screen.getByTitle('Ajouter une nouvelle tâche')).toBeInTheDocument();
  });

  it('permet de saisir et soumettre une tâche complète', async () => {
    const ajtTache = jest.fn();
    const { getByTestId } = render(<TodoForm ajtTache={ajtTache} />);
    fireEvent.click(screen.getByTitle('Ajouter une nouvelle tâche'));
    fireEvent.change(screen.getByPlaceholderText(/tâche à réaliser/i), { target: { value: 'Ma tâche' } });
    fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
    fireEvent.change(screen.getByPlaceholderText(/description/i), { target: { value: 'Une description' } });
    fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
    fireEvent.change(screen.getByPlaceholderText(/localisation/i), { target: { value: 'Par' } });
    await waitFor(() => expect(screen.getByText('Paris, France')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Paris, France'));
    fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
    fireEvent.change(screen.getByPlaceholderText(/date/i), { target: { value: '23/05/2025, 12:00' } });
    fireEvent.keyDown(getByTestId('todo-form'), { key: 'Tab' });
    fireEvent.click(screen.getByRole('button', { name: /ajouter/i }));
    expect(ajtTache).toHaveBeenCalledWith('Ma tâche', 'Une description', 'Paris, France', '23/05/2025, 12:00');
  });

  it('affiche un message d’erreur si on soumet sans remplir', () => {
    render(<TodoForm ajtTache={jest.fn()} />);
    fireEvent.click(screen.getByTitle('Ajouter une nouvelle tâche'));
    // Passe à l'étape finale sans remplir
    fireEvent.submit(screen.getByTestId('todo-form'));
    expect(window.alert).toHaveBeenCalled();
  });
});
