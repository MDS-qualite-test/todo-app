// src/__tests__/app.test.ts
import request from "supertest";
import app from "../app";
import * as TaskModel from "../model/taskModel";

// Mock the TaskModel to avoid actual database operations during tests
jest.mock("../model/taskModel");

describe("API Integration Tests", () => {
  // Reset mocks before each test
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
      // email is missing
    };

    const response = await request(app)
      .post("/api/users")
      .send(userData)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  // Task API Tests
  describe("Tasks API", () => {
    test("GET /api/tasks should return all tasks", async () => {
      const mockTasks = [
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
      ];

      // Mock the findAll method to return our test data
      (TaskModel.findAll as jest.Mock).mockResolvedValue(mockTasks);

      const response = await request(app).get("/api/tasks");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTasks);
      expect(TaskModel.findAll).toHaveBeenCalledTimes(1);
    });

    test("GET /api/tasks/:id should return a single task", async () => {
      const mockTask = { id: 1, title: "Task 1", completed: false };

      // Mock the findById method to return our test data
      (TaskModel.findById as jest.Mock).mockResolvedValue(mockTask);

      const response = await request(app).get("/api/tasks/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTask);
      expect(TaskModel.findById).toHaveBeenCalledWith(1);
    });

    test("GET /api/tasks/:id should return 404 for non-existent task", async () => {
      // Mock the findById method to return undefined (task not found)
      (TaskModel.findById as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).get("/api/tasks/999");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(TaskModel.findById).toHaveBeenCalledWith(999);
    });

    test("POST /api/tasks should create a new task", async () => {
      const newTask = { title: "New Task", completed: false };
      const taskId = 1;

      // Mock the create method to return an ID
      (TaskModel.create as jest.Mock).mockResolvedValue(taskId);

      const response = await request(app)
        .post("/api/tasks")
        .send(newTask)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ id: taskId, ...newTask });
      expect(TaskModel.create).toHaveBeenCalledWith(newTask);
    });

    test("POST /api/tasks should return 400 with invalid data", async () => {
      const invalidTask = { completed: true }; // Missing title

      const response = await request(app)
        .post("/api/tasks")
        .send(invalidTask)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(TaskModel.create).not.toHaveBeenCalled();
    });

    test("PUT /api/tasks/:id should update a task", async () => {
      const taskId = 1;
      const existingTask = { id: taskId, title: "Old Title", completed: false };
      const updateData = { title: "Updated Title", completed: true };
      const updatedTask = { ...existingTask, ...updateData };

      // Mock the findById method to return our test data
      (TaskModel.findById as jest.Mock)
        .mockResolvedValueOnce(existingTask) // First call (check if task exists)
        .mockResolvedValueOnce(updatedTask); // Second call (get updated task)

      // Mock the update method
      (TaskModel.update as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updateData)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTask);
      expect(TaskModel.findById).toHaveBeenCalledWith(taskId);
      expect(TaskModel.update).toHaveBeenCalledWith(taskId, updateData);
    });

    test("DELETE /api/tasks/:id should delete a task", async () => {
      const taskId = 1;
      const existingTask = { id: taskId, title: "Task to Delete", completed: false };

      // Mock the findById method to return our test data
      (TaskModel.findById as jest.Mock).mockResolvedValue(existingTask);

      // Mock the remove method
      (TaskModel.remove as jest.Mock).mockResolvedValue(undefined);

      const response = await request(app).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(TaskModel.findById).toHaveBeenCalledWith(taskId);
      expect(TaskModel.remove).toHaveBeenCalledWith(taskId);
    });
  });
});
