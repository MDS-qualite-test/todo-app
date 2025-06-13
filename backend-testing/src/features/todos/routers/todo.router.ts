import { BaseRouter } from '../../../shared/routers/base.router';
import { TodoController } from '../controllers/todoController';

export class TodoRouter extends BaseRouter {
  private todoController: TodoController;

  constructor() {
    super('/todos');
    this.todoController = new TodoController();
    this.setupRoutes();
  }

  protected setupRoutes(): void {
    this.router.get('/', this.todoController.getAllTodos);
    this.router.post('/', this.todoController.createTodo);
    this.router.get('/:id', this.todoController.getTodoById);
    this.router.patch('/:id', this.todoController.updateTodo);
    this.router.delete('/:id', this.todoController.deleteTodo);
  }

  public getTodosLink(): string {
    return `${this.prefix}`;
  }

  public getTodoByIdLink(id: string | number): string {
    return `${this.prefix}/${id}`; 
  }
} 