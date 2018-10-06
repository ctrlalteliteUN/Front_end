import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import LogoutButton from './LogoutButton';
import Navigation from './Navigation';

class Home extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <h3>Welcome {this.props.user.email}</h3>
        <h5>{this.props.authenticated ? 'You are authenticated :)' : 'Error'}</h5>
        <LogoutButton />
      </div>
    )
  }
}
const { object, bool } = PropTypes;

Home.propTypes = {
  actions: object.isRequired,
  user: object.isRequired,
  authenticated: bool.isRequired
};

const mapState = (state) => ({
  user: state.session.user,
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(Home);
