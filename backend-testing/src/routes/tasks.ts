import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const router = express.Router();

const getDb = async () => open({ filename: './todo.db', driver: sqlite3.Database });

router.get('/', async (_req, res) => {
  const db = await getDb();
  const tasks = await db.all('SELECT * FROM tasks');
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const db = await getDb();
  const { title } = req.body;
  const result = await db.run('INSERT INTO tasks (title) VALUES (?)', title);
  res.status(201).json({ id: result.lastID, title, completed: 0 });
});

router.put('/:id', async (req, res) => {
  const db = await getDb();
  const { id } = req.params;
  await db.run('UPDATE tasks SET completed = 1 WHERE id = ?', id);
  res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
  const db = await getDb();
  const { id } = req.params;
  await db.run('DELETE FROM tasks WHERE id = ?', id);
  res.sendStatus(204);
});

export default router;
