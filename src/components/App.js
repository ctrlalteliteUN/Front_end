// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

import Login from './Login';
import Error from './Error';
import Registro from './Registro';
import groups from './groups';
import search from './search';
import members from './members';
import msgs from './msgs';
import profile from './profile';
import Landingpage from './Landingpage';
import Home from './Home';

const App = ({ authenticated, checked }) => (
  <Router>
    {checked &&
      <div>
        <PrivateRoute exact path="/" component={Home} authenticated={authenticated} />
        <Route path="/login" component={Login} exact />
        <Route path="/welcome" component={Landingpage} exact />
        <Route path="/signup" component={Registro} exact />
        <Route path='/groups' component={groups} exact />
        <Route path='/search' component={search} exact />
        <Route path='/members' component={members} exact />
        <Route path='/msgs' component={msgs} exact />
        <Route path='/profile' component={profile} exact />
        <Route component={Error} exact/>
      </div>
    }
  </Router>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(App);