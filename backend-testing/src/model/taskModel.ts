import { getDb } from '../db';

export interface Task {
    id?: number;
    title: string;
    completed: boolean;
}

export async function findAll(): Promise<Task[]> {
    return getDb().all<Task[]>('SELECT * FROM tasks');
}

export async function findById(id: number): Promise<Task | undefined> {
    return getDb().get<Task>('SELECT * FROM tasks WHERE id = ?', id);
}

export async function create(task: Task): Promise<number> {
    const result = await getDb().run(
        'INSERT INTO tasks (title, completed) VALUES (?, ?)',
        task.title, task.completed ? 1 : 0
    );
    return result.lastID;
}

export async function update(id: number, task: Partial<Task>): Promise<void> {
    const updateFields = [];
    const params = [];

    if (task.title !== undefined) {
        updateFields.push('title = ?');
        params.push(task.title);
    }

    if (task.completed !== undefined) {
        updateFields.push('completed = ?');
        params.push(task.completed ? 1 : 0);
    }

    if (updateFields.length === 0) {
        return; // Nothing to update
    }

    params.push(id);
    await getDb().run(
        `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`,
        ...params
    );
}

export async function remove(id: number): Promise<void> {
    await getDb().run('DELETE FROM tasks WHERE id = ?', id);
}
