import express from 'express';
import tasksRouter from './routes/tasks';
import { initDb } from './db';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/tasks', tasksRouter);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

export default app;
