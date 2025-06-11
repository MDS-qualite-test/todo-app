import { Request, Response } from 'express';
import * as taskModel from '../model/taskModel';

export async function getTasks(req: Request, res: Response) {
    const tasks = await taskModel.findAll();
    res.json(tasks);
}

export async function addTask(req: Request, res: Response) {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Le titre est requis' });
    }
    await taskModel.create({ title, completed: false });
    res.status(201).end();
}
