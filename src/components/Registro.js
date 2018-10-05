import React, { Component } from 'react';
import '../styles/Log.css';
import Navigation from './NavigationLog';
import {Link, Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';

class Registro extends Component {
  render() {
    if (this.props.authenticated) {
      return(
      <Redirect to={{
        pathname: '/',
      }} />);
    }

    return (
      <div>
        <Navigation/>
          <div  className="body-login">
            <div className="container">
            <div className="container container-login">
              <div className="row">
                <div className="col-sm-12 log-text">
                <h2>Registrate</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8 offset-sm-2 myform-cont">
                  <form role="form" actions="" method="post" className="">
                    <div className="form-group">
                      <input type="text" name="form-name" placeholder="Nombre" className="form-control" id="form-name"/>
                    </div>
                    <div className="form-group">
                      <input type="text" name="form-lastname" placeholder="Apellido" className="form-control" id="form-lastname"/>
                    </div>
                    <div className="form-group">
                      <input type="text" name="form-username" placeholder="Usuario" className="form-control" id="form-username"/>
                    </div>
                    <div className="form-group">
                      <input type="text" name="form-email" placeholder="Email" className="form-control" id="form-email"/>
                    </div>
                    <div className="form-group">
                      <input type="password" name="form-password" placeholder="Contraseña" className="form-control" id="form-password"/>
                    </div>
                    <button type="submit" className="mybtn">Registrar</button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 mysocial-login log-text">
                  <h3> Ó registrate con: </h3>                  
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
                <Link to="/login">
                <button type="submit" className="mybtn">Iniciar Sesion</button>
                </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
    );
  }
}

const { object, bool } = PropTypes;

Registro.propTypes = {
  authenticated: bool.isRequired
};

const mapState = (state) => ({
  authenticated: state.session.authenticated
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(Registro);