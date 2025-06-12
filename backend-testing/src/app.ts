import express from 'express';
import cors from 'cors';
import { initDb } from './db/index';
import todosRouter from './routes/todos';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add a simple hello endpoint for testing
app.get('/api/hello', (_req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

// Add a simple users endpoint for testing
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // In a real app, we would save to database
  res.status(201).json({ id: Date.now(), name, email });
});

// Mount the todos router
app.use('/api/todos', todosRouter);

// Only start the server if this file is run directly
if (require.main === module) {
  initDb()
    .then(() => {
      app.listen(PORT, () =>
        console.log(`Server running on http://localhost:${PORT}`)
      );
    })
    .catch(err => {
      console.error('Failed to initialize DB', err);
      process.exit(1);
    });
} else {
  // For testing purposes, initialize the DB but don't start the server
  initDb().catch(err => {
    console.error('Failed to initialize DB during testing', err);
  });
}

export default app;