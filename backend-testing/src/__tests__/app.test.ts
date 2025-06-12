import request from "supertest";
import app from "../app";
import * as TodoModel from "../model/todoModel";

// Mock the TodoModel to avoid actual database operations during tests
jest.mock("../model/todoModel");

describe("API Integration Tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GET /api/hello should return correct message", async () => {
    const response = await request(app).get("/api/hello");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Hello, World!" });
  });

  test("POST /api/users should create a user with valid data", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });

  test("POST /api/users should return 400 with invalid data", async () => {
    const userData = {
      name: "John Doe",
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Todos API Tests
  describe("Todos API", () => {
    test("GET /api/todos should return all todos", async () => {
      const mockTodos = [
        { id: 1, title: "Todo 1", completed: false },
        { id: 2, title: "Todo 2", completed: true },
      ];

      (TodoModel.findAll as jest.Mock).mockResolvedValue(mockTodos);

      const response = await request(app).get("/api/todos");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodos);
      expect(TodoModel.findAll).toHaveBeenCalledTimes(1);
    });

    test("GET /api/todos/:id should return a single todo", async () => {
      const mockTodo = { id: 1, title: "Todo 1", completed: false };

      (TodoModel.findById as jest.Mock).mockResolvedValue(mockTodo);

      const response = await request(app).get("/api/todos/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTodo);
      expect(TodoModel.findById).toHaveBeenCalledWith(1);
    });

    test("GET /api/todos/:id should return 404 for non-existent todo", async () => {
      (TodoModel.findById as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).get("/api/todos/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(TodoModel.findById).toHaveBeenCalledWith(999);
    });

    test("POST /api/todos should create a new todo", async () => {
      const newTodo = { title: "New Todo", completed: false };
      const todoId = 1;

      (TodoModel.create as jest.Mock).mockResolvedValue(todoId);

      const response = await request(app)
        .post("/api/todos")
        .send(newTodo)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: todoId, ...newTodo });
      expect(TodoModel.create).toHaveBeenCalledWith(newTodo);
    });

    test("POST /api/todos should return 400 with invalid data", async () => {
      const invalidTodo = { completed: true };

      const response = await request(app)
        .post("/api/todos")
        .send(invalidTodo)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(TodoModel.create).not.toHaveBeenCalled();
    });

    test("PUT /api/todos/:id should update a todo", async () => {
      const todoId = 1;
      const existingTodo = { id: todoId, title: "Old Title", completed: false };
      const updateData = { title: "Updated Title", completed: true };
      const updatedTodo = { ...existingTodo, ...updateData };

      (TodoModel.findById as jest.Mock)
        .mockResolvedValueOnce(existingTodo)
        .mockResolvedValueOnce(updatedTodo);

      (TodoModel.update as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put(`/api/todos/${todoId}`)
        .send(updateData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTodo);
      expect(TodoModel.findById).toHaveBeenCalledWith(todoId);
      expect(TodoModel.update).toHaveBeenCalledWith(todoId, updateData);
    });

    test("DELETE /api/todos/:id should delete a todo", async () => {
      const todoId = 1;
      const existingTodo = { id: todoId, title: "Todo to Delete", completed: false };

      (TodoModel.findById as jest.Mock).mockResolvedValue(existingTodo);
      (TodoModel.remove as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete(`/api/todos/${todoId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(TodoModel.findById).toHaveBeenCalledWith(todoId);
      expect(TodoModel.remove).toHaveBeenCalledWith(todoId);
    });
  });
});