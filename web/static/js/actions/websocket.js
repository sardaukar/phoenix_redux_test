export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';

export function connect(url, token) {
  return {
    type: CONNECT,
    url: url,
    token: token
  };
}

export function disconnect() {
  return {
    type: DISCONNECT
  };
}

export function send_chat_message(msg) {
  return {
    type: DISCONNECT,
    msg: msg
  };
}

export const WS_CONNECTED = 'WS_CONNECTED';
export const WS_CONNECTING = 'WS_CONNECTING';
export const WS_DISCONNECTED = 'WS_DISCONNECTED';
export const WS_MESSAGE = 'WS_MESSAGE';

export function connected() {
  return {
    type: WS_CONNECTED
  };
}

export function connecting() {
  return {
    type: WS_CONNECTING
  };
}

export function disconnected() {
  return {
    type: WS_DISCONNECTED
  };
}

export function messageReceived(msg) {
  return {
    type: WS_MESSAGE,
    content: msg
  };
}
