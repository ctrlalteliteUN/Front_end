import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'

class profile extends Component {
    render() {
        return (
          <div>
            <Navigation/>
            <p>Ruta perfil</p>
          </div>
        )
    }  
}
export default profile;