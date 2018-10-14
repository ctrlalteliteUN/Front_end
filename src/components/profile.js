import React, { Component } from 'react';
import '../styles/Log.css';
import Navigation from './Navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/profile.css';
import { Link, withRouter } from 'react-router-dom'

class profile extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />
                  <div className="file btn btn-lg btn-primary">
                    Cambiar foto
                                <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h5>
                    Brayan Esteban Garzon
                                    </h5>
                  <p className="proile-rating">RANKINGS : <span>4/5</span></p>
                  <div className="ratings">
                    <ul className="list-inline">
                      <li className="list-inline-item selected"><i className="fa fa-star"></i></li>
                      <li className="list-inline-item selected"><i className="fa fa-star"></i></li>
                      <li className="list-inline-item selected"><i className="fa fa-star"></i></li>
                      <li className="list-inline-item selected"><i className="fa fa-star"></i></li>
                      <li className="list-inline-item selected"><i className="fa fa-star-empty"></i></li>

                    </ul>
                  </div>
                  <div className="bottom bottom1">
                    <a className="btn2 btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a className="btn3 btn-danger btn-sm" rel="publisher"
                      href="https://plus.google.com/+ahmshahnuralam">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a className="btn3 btn-primary btn-sm" rel="publisher"
                      href="https://plus.google.com/shahnuralam">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </div>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a style={{color:"#4d636f"}} className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                    </li>
                    <li className="nav-item">
                      <a style={{color:"#4d636f"}} className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Estadisticas</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Editar Perfil" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <p>Grupos<a className="items">
                    <i className="fas fa-users"></i>
                  </a></p>
                  <a href="">Comida tailandesa</a><br />
                  <a href="">Programacion</a><br />
                  <a href="">Calculo integral</a>
                  <p>Habilidades</p>
                  <a href="">Guitarra Electrica</a><br />
                  <a href="">Java, python ,c++</a><br />
                  <a href="">Comida japonesa</a><br />
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Usuario</label>
                      </div>
                      <div className="col-md-6">
                        <p>begarzonf</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Nombre</label>
                      </div>
                      <div className="col-md-6">
                        <p>Brayan Esteban Garzon</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>begarzonf@unal.edu.co</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Contraseña</label>
                      </div>
                      <div className="col-md-6">
                        <p>************</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <li className="list-inline-item selected"><i className="fa fa-star"></i></li>5
                    </div>
                      <div className="col-md-8">
                        <div className="progress progress-striped">
                          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <li className="list-inline-item selected"><i className="fa fa-star"></i></li>4
                    </div>
                      <div className="col-md-8">
                        <div className="progress progress-striped">
                          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <li className="list-inline-item selected"><i className="fa fa-star"></i></li>3
                    </div>
                      <div className="col-md-8">
                        <div className="progress progress-striped">
                          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <li className="list-inline-item selected"><i className="fa fa-star"></i></li>2
                    </div>
                      <div className="col-md-8">
                        <div className="progress progress-striped">
                          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        <li className="list-inline-item selected"><i className="fa fa-star"></i></li>1
                    </div>
                      <div className="col-md-8">
                        <div className="progress progress-striped">
                          <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "10%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const { object, bool } = PropTypes;

profile.propTypes = {
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

export default connect(mapState, mapDispatch)(profile);