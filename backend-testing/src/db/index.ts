import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function initDb() {
    db = await open({
        filename: './tasks.db',
        driver: sqlite3.Database
    });

    // Exemple : création de la table tasks si nécessaire
    await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    );
  `);
}

export function getDb() {
    if (!db) {
        throw new Error('DB non initialisée');
    }
    return db;
}
