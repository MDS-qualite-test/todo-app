// src/components/Counter.tsx
import React, { useState } from "react";

interface CounterProps {
  initialCount: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
};

export default Counter;
