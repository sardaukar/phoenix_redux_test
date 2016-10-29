import { Socket } from 'phoenix';
import * as CounterActions from '../actions/counter';
import * as WsActions from '../actions/websocket';

const socketMiddleware = (function(){
  var socket = null;
  var channel = null;

  const onIncrementFromServer = (msg,store) => evt => {
    store.dispatch(CounterActions.incrementFromServer());
  }

  return store => next => action => {

    switch(action.type) {
      case WsActions.CONNECT:
        if(socket != null) {
          socket.close();
        }

        socket = new Socket('/ws', {
          logger: (kind, msg, data) => {
            console.log(`${kind.toUpperCase()} msg: ${msg}`);
            console.log('data:', data);
          }
        });

        socket.connect();
        channel = socket.channel('counter:1');

        channel.on('counter:incrementFromServer', msg => {
          onIncrementFromServer(msg,store)();
        });

        channel.join()
          .receive('ok', messages => console.log('catching up', messages))
          .receive('error', reason => console.log('failed join', reason))
          .receive('timeout', () => console.log('Networking issue. Still waiting...'));

        break;

      case WsActions.DISCONNECT:
        if(socket != null) {
          socket.close();
        }
        socket = null;

        break;

      case CounterActions.INCREMENT_ON_SERVER:
        console.log('sending action to server...');
        channel.push('counter:async', {text: 'meh'})
          .receive('ok', _resp => {
            //
          })
          .receive('error', error => {
            console.log('server errored out', error);
            //store.dispatch(serverError(error));
          })
        return next(action);

      default:
        return next(action);
    }
  }
})();

export default socketMiddleware;
