import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {} from '../vendor/bootstrap.3.3.7.min.js';

import CounterApp from './containers/counterApp';
import configureStore from './store/configureStore';
import { setCounter } from './actions/counter';
import { wsConnect, wsDisconnect } from './actions/websocket';

const store = configureStore();

export default class Root extends Component {
  componentWillMount() {
    store.dispatch(wsConnect());
    store.dispatch(setCounter(this.props.counter));
  }

  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    );
  }
}

render(
  <Root counter={10}/>, document.getElementById('root')
);
