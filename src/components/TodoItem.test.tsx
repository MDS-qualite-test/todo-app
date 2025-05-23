import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  const baseProps = {
    id: '1',
    nom: 'Tâche test',
    description: 'Desc',
    localisation: 'Paris',
    dateHeure: '23/05/2025, 12:00',
    completed: false,
    majTacheCompletee: jest.fn(),
    suppTache: jest.fn(),
    modifTache: jest.fn(),
  };

  it('affiche les infos de la tâche', () => {
    render(<TodoItem {...baseProps} />);
    expect(screen.getByText('Tâche test')).toBeInTheDocument();
    expect(screen.getByText(/Paris/)).toBeInTheDocument();
  });

  it('coche/décoche la tâche', () => {
    render(<TodoItem {...baseProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(baseProps.majTacheCompletee).toHaveBeenCalledWith('1');
  });

  it('ouvre le mode modification et sauvegarde', () => {
    render(<TodoItem {...baseProps} />);
    fireEvent.click(screen.getByText(/modifier/i));
    fireEvent.change(screen.getByPlaceholderText(/nouveau nom/i), { target: { value: 'Nouveau nom' } });
    fireEvent.click(screen.getByText(/sauvegarder/i));
    expect(baseProps.modifTache).toHaveBeenCalledWith('1', 'Nouveau nom', 'Desc', 'Paris', '23/05/2025, 12:00');
  });

  it('demande confirmation avant suppression', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoItem {...baseProps} />);
    fireEvent.click(screen.getByText(/supprimer/i));
    expect(window.confirm).toHaveBeenCalled();
    expect(baseProps.suppTache).toHaveBeenCalledWith('1');
  });
});
