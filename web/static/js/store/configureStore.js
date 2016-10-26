import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const createStoreWithMiddleware = compose(applyMiddleware(
  thunk
), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
