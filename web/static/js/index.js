import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {} from '../vendor/bootstrap.3.3.7.min.js';

import CounterApp from './containers/counterApp';
import configureStore from './store/configureStore';
import { setCounter } from './actions/counter';
import { wsConnect } from './actions/websocket';

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

Root.propTypes = {
  counter: PropTypes.number.isRequired,
};

render(
  <Root counter={10}/>, document.getElementById('root')
);
