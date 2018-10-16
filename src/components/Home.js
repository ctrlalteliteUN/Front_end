import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import Posts from './Posts';
import Navigation from './Navigation';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';

class Home extends Component {
  state = {
    groups:[],
  }

  componentDidMount() {
    axios.get('https://knowledge-community-back-end.herokuapp.com/users')
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].email==this.props.user.email){
            this.setState({ groups:res.data[i].groups,})
          }
        }
      })
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className='container'>
          <div className="row">
            <div className="col-6 col-md-4 ">
              <div className="row">
              <div className='container-home'>
                  <div className="col-md-12">
                    <Link to="/profile">
                      <div className="profile "></div>
                    </Link>
                    <p>{this.props.user.email}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='container-home'>
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3 className="panel-title">Grupos<a className="items">
                          <i className="fas fa-users"></i>
                        </a></h3>
                      </div>
                      <div className="panel-body">
                      { this.state.groups.map(person => <p>{person.name}</p>)}
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div className="row">
                <div className=' container-home2'>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        className="form-control in-pos"
                        name="busqueda"
                        label="Busqueda"
                        type="busqueda"
                        placeholder="¿Qué te interesa aprender o enseñar?"
                        onChange={this.onChange}
                      />
                    </div>
                      <button className="btn btn-default btn-lg dropdown-toggle"
                        type="button" data-toggle="dropdown">
                        Etiquetas <span className="caret"></span>
                      </button>

                      <ul className="dropdown-menu">
                        <li><a href="#">Matematicas</a></li>
                        <li><a href="#">Programacion</a></li>
                        <li><a href="#">Comida</a></li>
                      </ul>
                      <button type="button" className="btn btn-default btn-lg posd">Postear</button>
                  </div>
                </div>

              </div>
              <div className="row">
              </div>
              <Posts/>
            </div>
          </div>
        </div>
      </div>)
    {/*<div className=' container-home'>
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
          <div style={{ width: "50%" }} className="btn-group">
            <button className="btn btn-default btn-lg dropdown-toggle"
              type="button" data-toggle="dropdown">
              Etiquetas <span className="caret"></span>
            </button>

            <ul className="dropdown-menu">
              <li><a href="#">Matematicas</a></li>
              <li><a href="#">Programacion</a></li>
              <li><a href="#">Comida</a></li>
            </ul>

            <button type="button" className="btn btn-default btn-lg offset-sm-10 posd">Postear</button>
          </div>
        </div>
      </div>
      <div className="col-sm">
        <div className='container-home'>
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Grupos<a className="items">
                  <i className="fas fa-users"></i>
                </a></h3>
              </div>
              <div className="panel-body">
                Lista de grupos
                  </div>
            </div>
          </div>
        </div>
        <div className=' container-home2'>
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ float: "left" }} className="profile2 mnp"></div>
                <h3 style={{ marginRight: "0%" }} className="panel-title ">{this.props.user.email} quiere aprender programacion en c++</h3>
              </div>
              <div className="col-md-12 log-text">
                <hr></hr>
              </div>
              <div className="panel-body">
                Hola comunidad, estoy buscando alguien para que me enseñe programacion en c++, a cambio puedo enseñar a tocar la guitarra
                  </div>
              <div className="btn-group">
                <div className="col-md-6">
                  <button type="button" className="btn btn-default btn-lg  ">Comentar</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-default btn-lg row-10">Contactar</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="row">
        <div className=' container-home3'>
          <div className="col-md-12"></div>
        </div>
        <div className=' container-home2'>
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div style={{ float: "left" }} className="profile2 mnp"></div>
                <h3 style={{ marginRight: "0%" }} className="panel-title ">dduartec@unal.edu.co ofrece clases de bateria a cambio de aprender a cocinar comida tailandesa</h3>
              </div>
              <div className="col-md-12 log-text">
                <hr></hr>
              </div>
              <div className="panel-body">
                Hola comunidad, alguien que me enseñe a cocinar comida tailandesa y este interesado aprender a tocar la bateria
                  </div>
              <div className="btn-group">
                <div className="col-md-6">
                  <button type="button" className="btn btn-default btn-lg  ">Comentar</button>
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-default btn-lg row-10">Contactar</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
          </div >
      <LogoutButton />
    </div >*/}
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
