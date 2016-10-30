import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './counter';
import websocket from './websocket';

const rootReducer = combineReducers({
  counter, websocket,
  routing: routerReducer
});

export default rootReducer;
