import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import LogoutButton from './LogoutButton';
import Navigation from './Navigation';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className='container-fluid'>
          <div className="row">
            <div className=' container-home'>
              <div className="col-md-12">
              <Link to="/profile">
                <div className="profile "></div>
              </Link>  
                <p>{this.props.user.email}</p>
              </div>
            </div>
            <div className=' container-home2'>
              <div className="col-md-12">
                <p></p>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="busqueda"
                    label="Busqueda"
                    type="busqueda"
                    placeholder="¿Qué te interesa aprender o enseñar?"
                    onChange={this.onChange}
                  />
                </div>
                <div style={{ width: "50%" }} class="btn-group">
                  <button class="btn btn-default btn-lg dropdown-toggle"
                    type="button" data-toggle="dropdown">
                    Etiquetas <span class="caret"></span>
                  </button>

                  <ul class="dropdown-menu">
                    <li><a href="#">Matematicas</a></li>
                    <li><a href="#">Programacion</a></li>
                    <li><a href="#">Comida</a></li>
                  </ul>

                  <button type="button" class="btn btn-default btn-lg offset-sm-10 posd">Postear</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className='container-home'>
              <div className="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Grupos<a className="items">
                      <i className="fas fa-users"></i>
                    </a></h3>
                  </div>
                  <div class="panel-body">
                    Lista de grupos
                  </div>
                </div>
              </div>
            </div>
            <div className=' container-home2'>
              <div className="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div style={{ float: "left" }} className="profile2 mnp"></div>
                    <h3 style={{ marginRight: "0%" }} class="panel-title ">{this.props.user.email} quiere aprender programacion en c++</h3>
                  </div>
                  <div className="col-md-12 log-text">
                    <hr></hr>
                  </div>
                  <div class="panel-body">
                    Hola comunidad, estoy buscando alguien para que me enseñe programacion en c++, a cambio puedo enseñar a tocar la guitarra
                  </div>
                  <div class="btn-group">
                    <div class="col-md-6">
                      <button type="button" class="btn btn-default btn-lg  ">Comentar</button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" class="btn btn-default btn-lg row-10">Contactar</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="row">
          <div className=' container-home3'>
            <div class="col-md-12"></div>
          </div>  
            <div className=' container-home2'>
              <div className="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <div style={{ float: "left" }} className="profile2 mnp"></div>
                    <h3 style={{ marginRight: "0%" }} class="panel-title ">dduartec@unal.edu.co ofrece clases de bateria a cambio de aprender a cocinar comida tailandesa</h3>
                  </div>
                  <div className="col-md-12 log-text">
                    <hr></hr>
                  </div>
                  <div class="panel-body">
                    Hola comunidad, alguien que me enseñe a cocinar comida tailandesa y este interesado aprender a tocar la bateria
                  </div>
                  <div class="btn-group">
                    <div class="col-md-6">
                      <button type="button" class="btn btn-default btn-lg  ">Comentar</button>
                    </div>
                    <div class="col-md-6">
                      <button type="button" class="btn btn-default btn-lg row-10">Contactar</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
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
