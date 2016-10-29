import {
  CONNECT,
  DISCONNECT
} from '../actions/websocket';

export default function websocket(state = {}, action) {
  switch (action.type) {
  case CONNECT:
    return state;
  case DISCONNECT:
    return state;
  default:
    return state;
  }
}
