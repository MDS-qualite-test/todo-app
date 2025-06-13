import request from "supertest";
import app from "../app";
import { initializeDb, closeDb } from "../shared/db/db";
import { seedTestData } from "../shared/db/seed";
import { TodoRouter } from "../features/todos/routers/todo.router";
import { todoSchema } from "../features/todos/helpers/todo";
import z from "zod";

describe("Todos API", () => {
  beforeAll(async () => {
    await initializeDb();
  });

  afterAll(async () => {
    await closeDb();
  });

  beforeEach(async () => {
    await seedTestData();
  });

  const todoRouter = new TodoRouter();

  test("GET /api/todos should return all todos", async () => {
    const response = await request(app).get(todoRouter.getTodosLink());

    const todos = response.body;

    const schema = z.array(todoSchema);
    const valid = schema.safeParse(todos);
    expect(valid.success).toBe(true);
  });

  test("GET /api/todos/:id should return a single todo", async () => {
    const response = await request(app).get(todoRouter.getTodoByIdLink(1));

    const todo = response.body;

    const valid = todoSchema.safeParse(todo);
    expect(valid.success).toBe(true);
  });

  test("GET /api/todos/:id should return 404 for non-existent todo", async () => {
    const response = await request(app).get(todoRouter.getTodoByIdLink(999));

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Todo non trouvé');
  });

  test("POST /api/todos should create a new todo", async () => {
    const body = {
      nom: "Nouveau Todo",
      description: "Description du nouveau todo",
      localisation: "Localisation du nouveau todo",
      dateHeure: "23/06/2025, 15:00",
      completed: false
    };

    const response = await request(app)
      .post(todoRouter.getTodosLink())
      .send(body)
      .set("Content-Type", "application/json");

    const newTodo = await request(app).get(todoRouter.getTodoByIdLink(4));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Todo créé avec succès');
    expect(newTodo.body).toEqual({id: 4, ...body});
  });

  test("POST /api/todos should return 400 with invalid data", async () => {
    const invalidTodo = { completed: true };

    const response = await request(app)
      .post(todoRouter.getTodosLink())
      .send(invalidTodo)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Données invalides');
    expect(response.body.errors).toHaveLength(4);
    expect(response.body.errors[0].message).toBe('Required');
    expect(response.body.errors[1].message).toBe('Required');
    expect(response.body.errors[2].message).toBe('Required');
    expect(response.body.errors[3].message).toBe('Required');
  });

  test("PATCH /api/todos/:id should update a todo", async () => {
    const updateData = {
      nom: "Todo Modifié",
      description: "Description modifiée",
      localisation: "Localisation modifiée",
      dateHeure: "24/06/2025, 16:00",
      completed: true
    };

    const response = await request(app)
      .patch(todoRouter.getTodoByIdLink(1))
      .send(updateData)
      .set("Content-Type", "application/json");

    const updatedTodo = await request(app).get(todoRouter.getTodoByIdLink(1));

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Todo mis à jour avec succès');
    expect(updatedTodo.body).toEqual({ id: 1, ...updateData});
  });

  test("DELETE /api/todos/:id should delete a todo", async () => {
    const response = await request(app).delete(todoRouter.getTodoByIdLink(1));

    expect(response.status).toBe(204);  

    const getResponse = await request(app).get(todoRouter.getTodoByIdLink(1));
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toHaveProperty('message', 'Todo non trouvé');
  });
});   