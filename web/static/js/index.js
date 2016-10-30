import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';

import {} from '../vendor/bootstrap.3.3.7.min.js';

import CounterApp from './containers/counterApp';
import RootApp from './containers/rootApp';

import configureStore from './store/configureStore';

import { wsConnect } from './actions/websocket';
import { setCounter } from './actions/counter';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

//
const Foo = () => <h3>Public</h3>;
//

export default class Root extends Component {
  componentWillMount() {
    store.dispatch(wsConnect());
    store.dispatch(setCounter(this.props.counter));
    store.dispatch(push(window.location.pathname));
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={RootApp}>
            <Route path='foo' component={Foo}/>
            <Route path='counter' component={CounterApp}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  counter: PropTypes.number.isRequired
};

render(
  <Root counter={10} />, document.getElementById('root')
);
