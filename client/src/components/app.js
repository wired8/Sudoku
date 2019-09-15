import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import SudokuGame from './game';

const App = ({ store }) => {
  return (
    <div>
      <Provider store={store} >
        <Router history={browserHistory}>
          <Route exact path="/" component={ SudokuGame } />
        </Router>
      </Provider>
    </div>
  );
};

export default App;