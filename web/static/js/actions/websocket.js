export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export function wsDisconnect() {
  return {
    type: DISCONNECT
  };
}

export function wsConnect() {
  return {
    type: CONNECT
  };
}

