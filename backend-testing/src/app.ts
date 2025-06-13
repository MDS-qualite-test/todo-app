import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { TodoRouter } from './features/todos/routers/todo.router';
import { initializeDb } from './shared/db/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const todoRouter = new TodoRouter();

app.use(todoRouter.getPrefix(), todoRouter.getRouter());

if (require.main === module) {
  initializeDb().then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  });
} else {
  initializeDb().catch(err => {
    console.error('Failed to initialize DB during testing', err);
    process.exit(1);
  });
}

export default app;