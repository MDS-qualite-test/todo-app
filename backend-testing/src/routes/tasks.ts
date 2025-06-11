import express from 'express';
import * as TaskModel from '../model/taskModel';

const router = express.Router();

// GET all tasks
router.get('/', async (_req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const { title, completed = false } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    const task = { title, completed: Boolean(completed) };
    const id = await TaskModel.create(task);

    res.status(201).json({ id, ...task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT (update) a task
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const { title, completed } = req.body;
    if (title === undefined && completed === undefined) {
      return res.status(400).json({ error: 'No update data provided' });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updateData: Partial<TaskModel.Task> = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = Boolean(completed);

    await TaskModel.update(id, updateData);

    const updatedTask = await TaskModel.findById(id);
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await TaskModel.remove(id);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
