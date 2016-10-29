import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CounterApp from './containers/counterApp';
import configureStore from './store/configureStore';
import {setCounter} from './actions/counter';
import { configureChannel } from './channel';

import {} from '../vendor/bootstrap.3.3.7.min.js';

const store = configureStore();
configureChannel(store);

export default class Root extends Component {
  componentWillMount() {
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
