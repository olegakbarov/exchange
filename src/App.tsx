import * as React from 'react';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import Exchange from './routes/Exchange' 
import { Provider } from 'react-redux';

const middleware =
  process.env.NODE_ENV === 'production'
    ? [thunk]
    : [
        thunk,
        createLogger({ collapsed: true, duration: true, diff: true }),
      ];

const store = createStore(
  combineReducers(reducers), 
  applyMiddleware(...middleware)
)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Exchange />
    </Provider>
  );
}

export default App;
