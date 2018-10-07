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
        <div class="container emp-profile">
          <form method="post">
            <div class="row">
              <div class="col-md-4">
                <div class="profile-img">
                  <img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />
                  <div class="file btn btn-lg btn-primary">
                    Cambiar foto
                                <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="profile-head">
                  <h5>
                    Brayan Esteban Garzon
                                    </h5>
                  <p class="proile-rating">RANKINGS : <span>4/5</span></p>
                  <div class="ratings">
                    <ul class="list-inline">
                      <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                      <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                      <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                      <li class="list-inline-item selected"><i class="fa fa-star"></i></li>
                      <li class="list-inline-item selected"><i class="fa fa-star-empty"></i></li>

                    </ul>
                  </div>
                  <div class="bottom bottom1">
                    <a class="btn2 btn-primary btn-twitter btn-sm" href="https://twitter.com/webmaniac">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a class="btn3 btn-danger btn-sm" rel="publisher"
                      href="https://plus.google.com/+ahmshahnuralam">
                      <i class="fa fa-google-plus"></i>
                    </a>
                    <a class="btn3 btn-primary btn-sm" rel="publisher"
                      href="https://plus.google.com/shahnuralam">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </div>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a style={{color:"#4d636f"}} class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Informacion</a>
                    </li>
                    <li class="nav-item">
                      <a style={{color:"#4d636f"}} class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Estadisticas</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-2">
                <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Editar Perfil" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="profile-work">
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
              <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <div class="row">
                      <div class="col-md-6">
                        <label>Usuario</label>
                      </div>
                      <div class="col-md-6">
                        <p>begarzonf</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Nombre</label>
                      </div>
                      <div class="col-md-6">
                        <p>Brayan Esteban Garzon</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Email</label>
                      </div>
                      <div class="col-md-6">
                        <p>begarzonf@unal.edu.co</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Contraseña</label>
                      </div>
                      <div class="col-md-6">
                        <p>************</p>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="row">
                      <div class="col-md-2 text-right">
                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>5
                    </div>
                      <div class="col-md-8">
                        <div class="progress progress-striped">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2 text-right">
                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>4
                    </div>
                      <div class="col-md-8">
                        <div class="progress progress-striped">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2 text-right">
                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>3
                    </div>
                      <div class="col-md-8">
                        <div class="progress progress-striped">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "40%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2 text-right">
                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>2
                    </div>
                      <div class="col-md-8">
                        <div class="progress progress-striped">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-2 text-right">
                        <li class="list-inline-item selected"><i class="fa fa-star"></i></li>1
                    </div>
                      <div class="col-md-8">
                        <div class="progress progress-striped">
                          <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="20"
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