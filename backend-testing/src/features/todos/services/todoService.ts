import { getDb } from '../../../shared/db/db';
import { Todo, TodoCreateInput, TodoUpdateInput } from '../helpers/todo';

export class TodoService {
    private async getDb() {
        return await getDb();
    }

    async findAll(): Promise<Todo[]> {
        const db = await this.getDb();
        const todos = await db.all('SELECT * FROM todos');
        return todos.map(todo => ({
            ...todo,
            completed: todo.completed === 1
        }));
    }

    async findById(id: number): Promise<Todo | undefined> {
        const db = await this.getDb();
        const todo = await db.get('SELECT * FROM todos WHERE id = ?', id);
        return todo ? {
            ...todo,
            completed: todo.completed === 1
        } : undefined;
    }

    async create(todo: TodoCreateInput): Promise<void> {
        const db = await this.getDb();
        await db.run(
            'INSERT INTO todos (nom, description, localisation, dateHeure, completed) VALUES (?, ?, ?, ?, ?)',
            todo.nom,
            todo.description,
            todo.localisation,
            todo.dateHeure,
            todo.completed ? 1 : 0
        );
    }

    async update(id: number, todo: TodoUpdateInput): Promise<void> {
        const updateFields = [];
        const params = [];

        if (todo.nom !== undefined) {
            updateFields.push('nom = ?');
            params.push(todo.nom);
        }

        if (todo.description !== undefined) {
            updateFields.push('description = ?');
            params.push(todo.description);
        }

        if (todo.localisation !== undefined) {
            updateFields.push('localisation = ?');
            params.push(todo.localisation);
        }

        if (todo.completed !== undefined) {
            updateFields.push('completed = ?');
            params.push(todo.completed ? 1 : 0);
        }

        if (todo.dateHeure !== undefined) {
            updateFields.push('dateHeure = ?');
            params.push(todo.dateHeure);
        }

        if (updateFields.length === 0) {
            return;
        }

        params.push(id);

        const db = await this.getDb();
        await db.run(
            `UPDATE todos SET ${updateFields.join(', ')} WHERE id = ?`,
            ...params
        );
    }

    async delete(id: number): Promise<void> {
        const db = await this.getDb();
        await db.run('DELETE FROM todos WHERE id = ?', id);
    }
} 