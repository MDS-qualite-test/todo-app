import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initDb = async () => {
  const db = await open({
    filename: "./todo.db",
    driver: sqlite3.Database,
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      dueDate TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    )
  `);

  return db;
};
