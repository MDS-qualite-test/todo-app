// src/services/userService.ts
import axios from "axios";

export interface User {
  id: number;
  name: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await axios.get("https://api.example.com/users");
  return response.data;
}
