import { getDb } from '../db';

export interface Task {
    id?: number;
    title: string;
    completed: boolean;
}

export async function findAll(): Promise<Task[]> {
    return getDb().all<Task[]>('SELECT * FROM tasks');
}

export async function create(task: Task): Promise<void> {
    await getDb().run(
        'INSERT INTO tasks (title, completed) VALUES (?, ?)',
        task.title, task.completed ? 1 : 0
    );
}

// Ajoutez update, delete, etc.
