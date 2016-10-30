import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter,
      incrementOnServer
    } = this.props;

    return (
      <p>
        Clicked: {counter} times
        {' '}
        <button className='btn btn-primary' onClick={increment}>+</button>
        {' '}
        <button className='btn btn-danger' onClick={decrement}>-</button>
        {' '}
        <button className='btn btn-warning' onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button className='btn btn-info' onClick={() => incrementAsync()}>Increment async</button>
        {' '}
        <button className='btn btn-info' onClick={incrementOnServer}>Increment serverside</button>
        {' '}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >
          modal
        </button>
      </p>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  incrementOnServer: PropTypes.func.isRequired
};

export default Counter;
