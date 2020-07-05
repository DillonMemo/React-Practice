/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** components */
import Header from './components/Header';
import Todo from './pages/Todo';
import Grid from './pages/Grid';
import Modals from './pages/Modals';
import Counter from './pages/Counter';
import Async from './pages/Async';

function App() {
  return (
    <Router>
      <div css={rootWrapper}>
        <Header />
        <Switch>
          <Route exact path="/Todo">
            <Todo />
          </Route>
          <Route path="/grid">
            <Grid />
          </Route>
          <Route path="/modals">
            <Modals />
          </Route>
          <Route path="/counter">
            <Counter />
          </Route>
          <Route path="/async">
            <Async />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const rootWrapper = css`
  margin: 0 1rem;
`;

export default App;
