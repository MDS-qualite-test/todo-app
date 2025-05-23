// src/__tests__/app.test.ts
import request from "supertest";
import app from "../app";

describe("API Integration Tests", () => {
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
});
