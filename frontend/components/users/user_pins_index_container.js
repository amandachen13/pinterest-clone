import { connect } from 'react-redux';
import UserPinsIndex from './user_pins_index';
import { requestAllPins } from './../../actions/pin_actions';
import { open } from './../../actions/modal_actions';

const mapStateToProps = ({ session, users, boards, pins }) => {
  return {
    currentUser: session.currentUser,
    users,
    boards: boards.boards,
    pins: pins.pins
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // requestSingleBoard: id => dispatch(requestSingleBoard(id)),
    // requestUser: username => dispatch(requestUser(username)),
    requestAllPins: () => dispatch(requestAllPins()),
    open: component => dispatch(open(component))
  }
};

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(UserPinsIndex);
