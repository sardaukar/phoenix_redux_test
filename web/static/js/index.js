import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';

import {} from '../vendor/bootstrap.3.3.7.min.js';

import CounterApp from './containers/counterApp';
import configureStore from './store/configureStore';
import { setCounter } from './actions/counter';
import { wsConnect } from './actions/websocket';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const Foo = () => <h3>Public</h3>;

export default class Root extends Component {
  componentWillMount() {
    store.dispatch(push(window.location.pathname));
    store.dispatch(wsConnect());
    store.dispatch(setCounter(this.props.counter));
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={CounterApp}>
            <Route path='foo' component={Foo}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  counter: PropTypes.number.isRequired,
};

render(
  <Root counter={10} />, document.getElementById('root')
);
