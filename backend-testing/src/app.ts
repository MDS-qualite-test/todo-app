// src/app.ts
import express from "express";

const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Dans une application réelle, vous enregistreriez l'utilisateur dans la base de données
  return res.status(201).json({ id: 1, name, email });
});

export default app;
