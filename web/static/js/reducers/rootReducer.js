import { combineReducers } from 'redux';
import counter from './counter';
import websocket from './websocket';

const rootReducer = combineReducers({
  counter, websocket
});

export default rootReducer;
