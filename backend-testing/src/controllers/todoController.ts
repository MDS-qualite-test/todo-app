import { Request, Response } from 'express';
import * as TodoModel from '../model/todoModel';

export async function getTodos(_req: Request, res: Response) {
    try {
        const todos = await TodoModel.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
}

export async function getTodoById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid todo ID' });

        const todo = await TodoModel.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
}

export async function addTodo(req: Request, res: Response) {
    try {
        const { title, completed = false } = req.body;
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Title is required and must be a string' });
        }
        const todo = { title, completed: Boolean(completed) };
        const id = await TodoModel.create(todo);
        res.status(201).json({ id, ...todo });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid todo ID' });
        }

        const { title, completed } = req.body;
        if (title === undefined && completed === undefined) {
            return res.status(400).json({ error: 'No update data provided' });
        }

        const todo = await TodoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const updateData: Partial<TodoModel.Todo> = {};
        if (title !== undefined) updateData.title = title;
        if (completed !== undefined) updateData.completed = Boolean(completed);

        await TodoModel.update(id, updateData);

        const updatedTodo = await TodoModel.findById(id);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid todo ID' });
        }

        const todo = await TodoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        await TodoModel.remove(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
}