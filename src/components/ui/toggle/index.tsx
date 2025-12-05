import { useState } from 'react';

export const Toggle = () => {
  const [on, setOn] = useState(false);

  return (
    <button onClick={() => setOn((prev) => !prev)}>
      <span>{on}</span>
    </button>
  );
};
