import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/rootReducer';
import socketMiddleware from '../middleware/socketMiddleware';

const routerMiddlewareWithHistory = routerMiddleware(browserHistory);

const createStoreWithMiddleware = compose(applyMiddleware(
  thunk, socketMiddleware, routerMiddlewareWithHistory
), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
