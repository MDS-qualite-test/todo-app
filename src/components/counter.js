import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    console.log(count);
  };

  return (
    <button style={{ fontSize: 100 }} onClick={increment}>{count}</button>
  );
}

export default Counter;
