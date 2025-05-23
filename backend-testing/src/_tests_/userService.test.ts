// src/__tests__/userService.test.ts
import axios from "axios";
import { getUsers } from "../services/userService";

// Mock axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("User Service", () => {
  test("getUsers should return user data", async () => {
    const mockUsers = [
      { id: 1, name: "John", email: "john@example.com" },
      { id: 2, name: "Jane", email: "jane@example.com" },
    ];

    // Setup the mock
    mockedAxios.get.mockResolvedValue({ data: mockUsers });

    // Call the function
    const users = await getUsers();

    // Assert the results
    expect(users).toEqual(mockUsers);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.example.com/users"
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test("getUsers should handle errors", async () => {
    // Setup the mock to throw an error
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    // Call the function and expect it to throw
    await expect(getUsers()).rejects.toThrow(errorMessage);
  });
});
