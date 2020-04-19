import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from '@/data/rootReducer';

const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const logActionMiddleware = (store) => (dispatch) => (action) => {
  console.log('logging...', action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware(history), logActionMiddleware, thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  );

  return {
    store,
    history,
  };
}
