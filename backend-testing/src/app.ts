import express from 'express';
import cors from 'cors';
import { initDb } from './db/index';
import tasksRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

initDb()
    .then(() => {
      app.listen(PORT, () =>
          console.log(`Server running on http://localhost:${PORT}`)
      );
    })
    .catch(err => {
      console.error('Échec de l\'initialisation de la DB', err);
      process.exit(1);
    });
