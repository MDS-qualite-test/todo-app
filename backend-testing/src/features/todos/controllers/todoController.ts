import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';
import { todoCreateSchema, todoUpdateSchema } from '../helpers/todo';
import { z } from 'zod';

export class TodoController {
  private todoService: TodoService = new TodoService();

  public getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await this.todoService.findAll();
      res.status(200).json(todos);
    } catch {
      res.status(500).json({ message: 'Erreur lors de la récupération des todos' });
    }
  };

  public getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const todo = await this.todoService.findById(id);
      
      if (!todo) {
        res.status(404).json({ message: 'Todo non trouvé' });
        return;
      }

      res.status(200).json(todo);
    } catch {
      res.status(500).json({ message: 'Erreur lors de la récupération du todo' });
    }
  };

  public createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todo = todoCreateSchema.parse(req.body);
      await this.todoService.create(todo);
      res.status(201).json({ message: 'Todo créé avec succès' });
    } catch (error) {
      if(error instanceof z.ZodError) {
        res.status(400).json({ message: 'Données invalides', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Erreur lors de la création du todo' });
      }
    }
  };

  public updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const todo = todoUpdateSchema.parse(req.body);
      await this.todoService.update(id, todo);
      res.status(200).json({ message: 'Todo mis à jour avec succès'});
    } catch (error) {
      if(error instanceof z.ZodError) {
        res.status(400).json({ message: 'Données invalides', errors: error.errors });
      } else {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du todo' });
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      await this.todoService.delete(id);

      res.status(204).send();
    } catch {
      res.status(500).json({ message: 'Erreur lors de la suppression du todo' });
    }
  };
} 