import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

class App extends Component {
  render() {
    const { store } = this.context;

    return (
      <div>
        <header>
          Links:
          {' '}
          <Link to="/">Home</Link>
          {' '}
          <Link to="/foo">Foo</Link>
          {' '}
          <Link to="/counter">Counter</Link>
        </header>
        <div>
          <button
            className='btn btn-primary'
            onClick={() => store.dispatch(push('/foo'))}
          >
            Go to /foo
          </button>
        </div>
        <div style={{ marginTop: '1.5em' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

App.contextTypes = {
  store: PropTypes.object
};

export default App;
