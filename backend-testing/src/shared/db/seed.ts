import { getDb } from './db';

export async function seedTestData() {
  const db = await getDb();
  
  await db.run('DELETE FROM todos');
  
  await db.run(`
    INSERT INTO todos (id, nom, description, localisation, dateHeure, completed) VALUES
    (1, 'Todo 1', 'Description 1', 'Localisation 1', '20/06/2025, 12:00', 0),
    (2, 'Todo 2', 'Description 2', 'Localisation 2', '21/06/2025, 13:00', 1),
    (3, 'Todo 3', 'Description 3', 'Localisation 3', '22/06/2025, 14:00', 0)
  `);
  
  return db;
} 