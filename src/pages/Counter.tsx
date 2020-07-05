/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useCallback } from 'react';

/** utils */
import Colors from '../utils/colors';

export interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState<Count>({ count: 0, state: 'waiting...' });

  const handleIncrease = useCallback(
    (): void => setCount({ count: count.count + 1, state: 'increment' }),
    [count],
  );
  const handleDecrease = useCallback(
    (): void => setCount({ count: count.count - 1, state: 'decrement' }),
    [count],
  );

  return (
    <div css={CounterWrapper}>
      <h2>Counter</h2>
      <button className="increaseBtn" css={Button} onClick={handleIncrease}>
        +
      </button>
      <span css={CountValue}>{count.count}</span>
      <button className="decreaseeBtn" css={Button} onClick={handleDecrease}>
        -
      </button>
      <div>
        Count title : <span>{count.state}</span>
      </div>
    </div>
  );
};

/** styles */
const CounterWrapper = css`
  position: relative;
  widows: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;
const CountValue = css`
  display: inline-block;
  width: 6.25rem;
  font-size: 1.5rem;
`;

const Button = css`
  border: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  background: ${Colors.default.default};

  width: 3.125rem;
  height: 3.125rem;
  border-radius: 0.5rem;
  margin: 3.125rem 0.75rem;

  :hover {
    background: ${Colors.default.accent6};
  }

  :active {
    background: ${Colors.default.accent8};
  }
`;

/** types */
type Count = {
  count: number;
  state: string;
};

export default Counter;
