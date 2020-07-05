/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useCallback, useState, useEffect } from 'react';

/** utils */
import Colors from '../utils/colors';

export interface AsyncProps {}

const Async: React.FC<AsyncProps> = () => {
  const url = 'https://api.randomuser.me/';
  const [state, setState] = useState<{ data: any; loading: boolean }>({
    data: null,
    loading: true,
  });

  const handleFetch = useCallback((): void => {
    setState({ data: null, loading: true });
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setTimeout(() => setState({ data: y, loading: false }), 2000);
      });
  }, []);

  useEffect(() => {
    fetch(url)
      .then((x) => x.json())
      .then((y) => {
        setTimeout(() => {
          setState({ data: y, loading: false });
        }, 2000);
      });
  }, []);

  return (
    <div css={AsyncWrapper}>
      <h2>Async Actions</h2>
      <button type="button" css={Button} onClick={handleFetch}>
        Get Random User
      </button>
      <div css={Container}>
        {state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <p>
              Name :{' '}
              {`${state.data.results[0].name.title}. ${state.data.results[0].name.first} ${state.data.results[0].name.last}`}
            </p>
            <p>Email : {`${state.data.results[0].email}`}</p>
            <p>Phone : {`${state.data.results[0].phone}`}</p>
            <img
              src={state.data.results[0].picture.thumbnail}
              alt="thumbnail"
              width="250"
              height="250"
            />
          </div>
        )}
      </div>
    </div>
  );
};

/** styles */
const AsyncWrapper = css`
  position: relative;
  widows: 100%;
  height: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
`;
const Container = css``;
const Button = css`
  border: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  background: ${Colors.default.default};

  width: 9.375rem;
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

export default Async;
