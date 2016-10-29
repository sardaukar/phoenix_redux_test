import { Socket } from 'phoenix';
import * as CounterActions from '../actions/counter';

const socketMiddleware = (function(){
  var socket = null;
  var channel = null;

  const onOpen = (ws,store,token) => evt => {
    //Send a handshake, or authenticate with remote end

    console.log("ON OPEN");
    //Tell the store we're connected
    //store.dispatch(actions.connected());
  }

  const onClose = (ws,store) => evt => {
    //Tell the store we've disconnected
    //store.dispatch(actions.disconnected());
    console.log("ON CLOSE");
  }

  const onIncrementFromServer = (msg,store) => evt => {
    console.log('OM: ', msg);
    store.dispatch(CounterActions.incrementFromServer());
  }

  const onChannelMessage = (evt, cb, store) => evt => {
    console.log("OCM", evt, cb, store);
  }

  return store => next => action => {

    switch(action.type) {
      case 'CONNECT':
        //Start a new connection to the server
        if(socket != null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        //store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new Socket('/ws', {
          logger: (kind, msg, data) => {
            console.log(`${kind.toUpperCase()} msg: ${msg}`);
            console.log('data:', data);
          }
        });

        socket.onClose = onClose(socket,store);
        socket.onOpen = onOpen(socket,store,action); // FIXME: action.token

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
      //The user wants us to disconnect
      case 'DISCONNECT':
        if(socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        //store.dispatch(actions.disconnected());
        break;

      case 'INCREMENT_ON_SERVER':
        console.log('sending action to server...');
        channel.push('counter:async', {text: 'meh'})
          .receive('ok', _resp => {
            //
          })
          .receive('error', error => {
            console.log('server errored out', error);
            //store.dispatch(CounterActions.serverError(error));
          })
        return next(action);;

      default:
        return next(action);
    }
  }
})();

export default socketMiddleware;
