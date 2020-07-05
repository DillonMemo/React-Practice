/** @jsx jsx */
import { memo } from 'react';
import { jsx, css } from '@emotion/core';
import { Link, useLocation } from 'react-router-dom';

/** Utils */
import Colors from '../utils/colors';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();

  return (
    <div css={headerWrapper}>
      <div css={navigator}>
        <ul className="horizontal">
          <li>
            <Link
              to="/todo"
              css={css`
                color: ${location.pathname === '/todo'
                  ? Colors.default.foreground
                  : Colors.default.accent3};
              `}
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/grid"
              css={css`
                color: ${location.pathname === '/grid'
                  ? Colors.default.foreground
                  : Colors.default.accent3};
              `}
            >
              Grid
            </Link>
          </li>
          <li>
            <Link
              to="/modals"
              css={css`
                color: ${location.pathname === '/modals'
                  ? Colors.default.foreground
                  : Colors.default.accent3};
              `}
            >
              Modals
            </Link>
          </li>
          <li>
            <Link
              to="/counter"
              css={css`
                color: ${location.pathname === '/counter'
                  ? Colors.default.foreground
                  : Colors.default.accent3};
              `}
            >
              Counter
            </Link>
          </li>
          <li>
            <Link
              to="/async"
              css={css`
                color: ${location.pathname === '/async'
                  ? Colors.default.foreground
                  : Colors.default.accent3};
              `}
            >
              Async
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const headerWrapper = css`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 3.25rem;
  border-bottom: 1px solid ${Colors.default.accent5};
`;
const navigator = css`
  width: 100%;
  height: 100%;

  display: flex;
  .horizontal {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    user-select: none;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    li {
      width: 100%;
      height: 100%;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 1.2rem;
        transition: color 0.5s ease;

        :hover {
          color: ${Colors.default.foreground};
        }
      }
    }
  }
`;

export default memo(Header);
