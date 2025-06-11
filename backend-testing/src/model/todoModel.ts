import { getDb } from '../db';

export interface Todo {
    id?: number;
    title: string;
    completed: boolean;
}

export async function findAll(): Promise<Todo[]> {
    return getDb().all<Todo[]>('SELECT * FROM todo');
}

export async function findById(id: number): Promise<Todo | undefined> {
    return getDb().get<Todo>('SELECT * FROM todo WHERE id = ?', id);
}

export async function create(todo: Todo): Promise<number> {
    const result = await getDb().run(
        'INSERT INTO todo (title, completed) VALUES (?, ?)',
        todo.title, todo.completed ? 1 : 0
    );
    return result.lastID;
}

export async function update(id: number, todo: Partial<Todo>): Promise<void> {
    const updateFields = [];
    const params = [];

    if (todo.title !== undefined) {
        updateFields.push('title = ?');
        params.push(todo.title);
    }

    if (todo.completed !== undefined) {
        updateFields.push('completed = ?');
        params.push(todo.completed ? 1 : 0);
    }

    if (updateFields.length === 0) {
        return;
    }

    params.push(id);
    await getDb().run(
        `UPDATE todo SET ${updateFields.join(', ')} WHERE id = ?`,
        ...params
    );
}

export async function remove(id: number): Promise<void> {
    await getDb().run('DELETE FROM todo WHERE id = ?', id);
}