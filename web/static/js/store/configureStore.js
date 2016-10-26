import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import socketMiddleware from '../middleware/socketMiddleware';

const createStoreWithMiddleware = compose(applyMiddleware(
  thunk, socketMiddleware
), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
