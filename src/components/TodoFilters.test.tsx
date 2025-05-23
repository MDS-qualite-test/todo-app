import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoFilters from './TodoFilters';

describe('TodoFilters', () => {
  it('appelle setFilter au clic', () => {
    const setFilter = jest.fn();
    render(<TodoFilters nom="Toutes" isPressed={false} setFilter={setFilter} />);
    fireEvent.click(screen.getByRole('button'));
    expect(setFilter).toHaveBeenCalledWith('Toutes');
  });

  it('affiche le nom du filtre', () => {
    render(<TodoFilters nom="En cours" isPressed={true} setFilter={jest.fn()} />);
    expect(screen.getByText('En cours')).toBeInTheDocument();
  });
});
