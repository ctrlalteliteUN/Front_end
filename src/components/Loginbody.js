import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'

class Loginbody extends Component {
  render() {
    return (
      <div>          
            <div className="container">
            <div className="container container-login">
              <div className="row">
                <div className="col-sm-12 log-text">
                <h2>Ingresa</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 offset-sm-2 myform-cont">
                  <form role="form" actions="" method="post" className="">
                    <div className="form-group">
                      <input type="text" name="form-username" placeholder="Usuario" className="form-control" id="form-username"/>
                    </div>
                    <div className="form-group">
                      <input type="password" name="form-password" placeholder="Contraseña" className="form-control" id="form-password"/>
                    </div>
                    <button type="submit" className="mybtn">Login</button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 mysocial-login log-text">
                  <h3> Ó ingresa con: </h3>                  
                  <div className="mysocial-login-buttons">
                    <a className="mybtn-social">
                      <i className="fab fa-google"></i>
                    </a>
                    <a className="mybtn-social">
                      <i className="fab fa-facebook-f"></i>
                    </a>                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 log-text">
                <hr></hr>
                </div>
                <div className="col-sm-8 offset-sm-2 myform-cont">
                  <Link to="/signup">
                  <button type="submit" className="mybtn">Registrate</button>
                  </Link>
                  </div>
              </div>
            </div>
            </div>
          </div>
    );
  }
}

export default Loginbody;