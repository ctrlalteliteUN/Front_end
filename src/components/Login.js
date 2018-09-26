import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './NavigationLog';
import logo from '../resources/kc.png';

class Login extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <div className="container">
          <div  className="container-login">
          </div>
        </div>
      </div>
    );
  }
}

export default Login;