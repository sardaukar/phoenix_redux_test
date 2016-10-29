import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/counter';
import * as CounterActions from '../actions/counter';
import * as WsActions from '../actions/websocket';

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, CounterActions, WsActions),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
