import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'
import Loginbody from './Loginbody';

class Login extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <div  className="body-login">
        <Loginbody/>
        </div>
        </div>
    );
  }
}

export default Login;