import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

let db: Database | null = null;

export async function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

export async function initializeDb() {
  db = await open({
    filename: process.env.NODE_ENV === 'test' ? ':memory:' : 'todo.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      description TEXT NOT NULL,
      localisation TEXT NOT NULL,
      dateHeure TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    )
  `);
  
  return db;
}

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
} 