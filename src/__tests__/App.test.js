import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

const taches = [
  { id: 1, nom: 'Tâche 1', description: 'Description de la tâche 1' },
  { id: 2, nom: 'Tâche 2', description: 'Description de la tâche 2' },
  { id: 3, nom: 'FujiTask', description: 'Description de la tâche FujiTask' },
];

test('affiche le composant App', () => {
  render(<App taches={taches} />);
  expect(screen.getAllByText(/FujiTask/i).length).toBeGreaterThan(0);
});
