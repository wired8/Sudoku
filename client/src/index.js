import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import App from './components/app';

const initial = { board: {currentBoard: [], startBoard: [], solutionBoard: [], startTime: null, solved: false} };
const store = createStore(rootReducer, initial, applyMiddleware(thunk));

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);