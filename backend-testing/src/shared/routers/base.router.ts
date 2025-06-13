import { Router } from 'express';

export abstract class BaseRouter {
  protected router: Router;
  protected prefix: string;

  constructor(prefix: string) {
    this.router = Router();
    this.prefix = prefix;
  }

  protected abstract setupRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }

  public getPrefix(): string {
    return this.prefix;
  }
} 