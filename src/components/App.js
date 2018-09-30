import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from './NavigationLog';
import {Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
      <Navigation/>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="left ">
              <div className="container">
              <div className="container container-info">
                <h1> Unete a la nueva comunidad para compartir conocimiento!!</h1>
                <div className="container container-items">
                  <div className="mt-5 mb-3">
                  <a className="items">
                    <i className="fas fa-search"></i>   Busca nuevas disciplinas o habilidades que desees aprender
                  </a><br></br>
                  </div>
                  <div className="mt-3 mb-3">
                  <a className="items">
                    <i className="fas fa-poll-h"></i>   Publica lo que quieras aprender o enseñar
                  </a>
                  </div>
                  <div className="mt-3 mb-3">
                  <a className="items">
                    <i className="fas fa-users"></i>   Unete a grupos con tus mismos intereses de aprendizaje y enseñanza
                  </a>
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
            <div className="col">
              <div className="right">
              <div className="container container-login mt-5">
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
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
