import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Log.css';


class Loginbody extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);


  }
  onSubmit(history) {
    const { user } = this.state;
    const { login } = this.props.actions;
    login(user, history);
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const { user: { email, password } } = this.state;
    const SubmitButton = withRouter(({ history }) => (
      <button className="mybtn"
        onClick={() => this.onSubmit(history)}
        type="submit">Ingresar
      </button>
    ));

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
                <div className="form-group">
                  <input
                    className="form-control"
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="e-mail"
                    onChange={this.onChange}
                  />

                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={this.onChange}
                  />
                </div>
                <SubmitButton />
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

const { object } = PropTypes;

Loginbody.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Loginbody);