import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  it('affiche le composant', () => {
    render(<TodoList />);
    expect(screen.getByText('TodoList')).toBeInTheDocument();
  });
});
