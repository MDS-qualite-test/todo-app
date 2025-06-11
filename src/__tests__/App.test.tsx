import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('nanoid');

const taches = [
  {
    id: 'todo-1',
    nom: 'Exemple',
    description: 'Description',
    localisation: 'Paris',
    dateHeure: '2025-05-23T10:00',
    completed: false,
  },
];

test('affiche le composant App', () => {
  render(<App taches={taches} />);
  expect(screen.getAllByText(/FujiTask/i).length).toBeGreaterThan(0);
});
