import React, { Component } from 'react';
import '../styles/Log.css';
import Navigation from './NavigationLog';
import { Link, withRouter } from 'react-router-dom'
import { Redirect} from 'react-router-dom'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';

class Registro extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);


  }
  onSubmit(history) {
    const { user } = this.state;
    const { signup } = this.props.actions;
    signup(user, history);
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const SubmitButton = withRouter(({ history }) => (
      <button className="mybtn"
        onClick={() => this.onSubmit(history)}
        type="submit">Registrar
      </button>
    ));
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
                    <div className="form-group">
                      <input type="text" name="name" placeholder="Nombre" className="form-control" id="form-name" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <input type="text" name="email" placeholder="Email" className="form-control" id="form-email" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <input type="password" name="password" placeholder="Contraseña" className="form-control" id="form-password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <input type="password" name="password_confirmation" placeholder="Confirmar contraseña" className="form-control" id="form-password" onChange={this.onChange}/>
                    </div>
                    <SubmitButton />
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