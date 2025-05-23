// src/__tests__/calculator.test.ts
import { add, subtract } from "../services/calculator";

describe("Calculator service", () => {
  test("should add two numbers correctly", () => {
    expect(add(1, 2)).toBe(3);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test("should subtract two numbers correctly", () => {
    expect(subtract(3, 2)).toBe(1);
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(10, 10)).toBe(0);
  });
});
