import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import Posts from './Posts';
import Navigation from './Navigation';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom'
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: -1,
      post_id: -1,
      file: "",
      pdfPreviewUrl: "",
      tag: {
        name: "",
      },
      post: {
        title: "",
        body: "",
        solicitud: 0,
        user_id: -1,
      },
      groups: [],
      picture: "",
      loading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);



  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get('https://knowledge-community-back-end.herokuapp.com/users')
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email == this.props.user.email) {
              let post = Object.assign({}, this.state.post);
              post.user_id = res.data[i].id;
              this.setState({
                user_id: res.data[i].id,
                post: post,
                groups: res.data[i].groups,
                loading: false
              });
              axios.get('https://knowledge-community-back-end.herokuapp.com/app_files?ProfilePhoto=1&user_id=' + this.state.user_id)
                .then(response => {
                  this.setState({ picture: response.data,
                    loading: false })
                })
            }
          }
        }).catch(function (error) {
          console.log(error);
          console.log(error);
          this.setState({
            loading: false,
          })
        })
    })
  }

  onSubmit(history) {
    this.setState({ loading: true }, () => {
    axios.post(`https://knowledge-community-back-end.herokuapp.com/posts`, this.state.post)
      .then(response => {
        alert("Publicacion Satisfactoria");
        console.log(response);
        console.log(this.state.tag);
        history.push('/');
        this.forceUpdate();
        this.setState({
          loading: false,
        })        
        axios.post('https://knowledge-community-back-end.herokuapp.com/posts/' + response.data.id + '/tags', this.state.tag)
          .then(response => {
            console.log(response);
            this.forceUpdate();
          })
          .catch(function (error) {
            console.log(error);
            console.log(error);
          })
      })
      .catch(function (error) {
        console.log(error);
        console.log(error);
        this.setState({
          loading: false,
        })
      })
    })
  }
  onPDF(history) {
    let { pdfPreviewUrl } = this.state;
    if (pdfPreviewUrl) {
      console.log(pdfPreviewUrl);
      console.log(this.state.user_id)
      axios.post(`https://knowledge-community-back-end.herokuapp.com/app_files`, { ruta: pdfPreviewUrl, file_type_id: 2, user_id: this.state.user_id, post_id: "", description: "pdf", titulo: "archivo.pdf" })
        .then(response => {
          console.log(response)
          history.push('/')
        })
    }
  }

  onChange(e) {
    const { value, name } = e.target;
    const { post } = this.state;
    const { tag } = this.state;
    post[name] = value;
    tag[name] = value;
    this.setState({ post });
    this.setState({ tag });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        pdfPreviewUrl: reader.result,
      });
      console.log(reader.result)
    }
    reader.readAsDataURL(file);

  }
  render() {
    const Pdfbutton = withRouter(({ history }) => (
      <button className="btn btn-default btn-lg posd"
        onClick={() => this.onPDF(history)}
        type="submit">Subir
      </button>
    ));
    const SubmitButton = withRouter(({ history }) => (
      <button className="btn btn-default btn-lg posd"
        onClick={() => this.onSubmit(history)}
        type="submit">Postear
      </button>
    ));
    let { picture } = this.state;
    let $picture = null;
    if (!picture.error) {
      $picture = (<img src={picture.ruta} />);
    } else {
      $picture = (<img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />);
    }
    return (
      <div>
        <Navigation />
        {this.state.loading ? <LoadingSpinner /> : 
        <div className='container'>
          <div className="row">
            <div className="col-6 col-md-4 ">
              <div className="row">
                <div className='container-home'>
                  <div className="col-md-12">
                    <Link to="/profile">
                      <div className="home-profile-img">
                        {$picture}
                      </div>
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
                        {this.state.groups.map(group => <p>{group.name}</p>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='container-home'>
                  <div>
                    <h4>Subir PDF</h4>
                    <div>
                      <input type="file" onChange={this._handleImageChange} />
                      <Pdfbutton />
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
                        name="title"
                        label="Title"
                        type="title"
                        placeholder="¿Qué te interesa aprender o enseñar?"
                        onChange={this.onChange}
                      />
                      <textarea
                        className="form-control in-pos"
                        name="body"
                        label="Body"
                        type="body"
                        placeholder="Detalla lo que requieres u ofreces"
                        onChange={this.onChange}
                      />
                      <textarea
                        className="form-control in-pos"
                        name="name"
                        label="name"
                        type="name"
                        placeholder="Agregar etiqueta"
                        onChange={this.onChange}
                      />

                    </div>
                    {/*<button className="btn btn-default btn-lg dropdown-toggle"
                        type="button" data-toggle="dropdown">
                        Etiquetas <span className="caret"></span>
                      </button>

                      <ul className="dropdown-menu">
                        <li><a href="#">Matematicas</a></li>
                        <li><a href="#">Programacion</a></li>
                        <li><a href="#">Comida</a></li>
    </ul>*/}
                    <select className="form-control sel" id="sel1" onChange={this.onChange}>
                      <option value="1">Solicitud</option>
                      <option value="0  ">Ofrecimiento</option>
                    </select>
                    <SubmitButton />
                  </div>
                </div>

              </div>
              <div className="row">
              </div>
              <Posts user_id={this.state.user_id} />
            </div>
          </div>
        </div>
        }
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
