import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'
import Landingpage from './Landingpage';

class App extends Component {
  render() {
    return (
      <div>
      <Navigation/>
      <div className="container mt-5">
      <Landingpage/>
      </div>
      </div>
      
    );
  }
}

export default App;
