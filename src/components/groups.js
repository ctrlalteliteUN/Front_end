import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import Group_posts from './Posts';
import Navigation from './Navigation';
import '../styles/Home.css';
import { /*Link,*/ withRouter } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import Map from './Map';
import { loadState, saveState } from './localStorage.js';


class groups extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: -1,
      email:"",
      post_id: -1,
      file: "",
      namefile: "",
      pdfPreviewUrl: "",
      tag: {
        name: "",
      },
      post: {
        title: "",
        body: "",
        solicitud: 0,
        user_id: -1,
        lat:null,
        lng:null
      },
      groups: [],
      picture: "",
      loading: false,
      map: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.check = this.check.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this.handleLoc=this.handleLoc.bind(this);
    this.saveStateGroups=this.saveStateGroups.bind(this);


  }
saveStateGroups(){
    saveState(this.state,'groups');
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStateGroups)

    // saves if component has a chance to unmount
    this.saveStateGroups();
  }

  componentDidMount() {
    console.log(this.props);
    const state = loadState('groups');
    this.setState(state);
    window.addEventListener('beforeunload', this.saveStateGroups);
    this.setState({ loading: true }, () => {
      axios.get('https://knowledge-community-back-end.herokuapp.com/users')
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].email===this.props.user.email) {
              let post = Object.assign({}, this.state.post);
              post.user_id = res.data[i].id;
              this.setState({
                user_id: res.data[i].id,
                post: post,
                groups: res.data[i].groups,
              });
            }
          }
          this.setState({
            loading: false
          })
        }).catch(function (error) {
          console.error(error);
          console.error(error);
        })
    })
    
  }

  onSubmit(history) {
    this.setState({ loading: true }, () => {
      axios.post(`https://knowledge-community-back-end.herokuapp.com/posts`, this.state.post)
        .then(response => {
          alert("Publicacion Satisfactoria");
          this.setState({
            loading: false,
          })
          axios.post('https://knowledge-community-back-end.herokuapp.com/posts/' + response.data.id + '/tags', this.state.tag)
            .then(response => {

              this.forceUpdate();
            })
            .catch(function (error) {
              console.error(error);
            })
        })
        .catch(function (error) {
          console.error(error);
          this.setState({
            loading: false,
          })
        })
    })
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
  check(e) {
    let val= !this.state.map;
    this.setState({ map: val });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        pdfPreviewUrl: reader.result,
        namefile: file.name,
      });
    }
    reader.readAsDataURL(file);

  }

  handleLoc(marker) {    
    const { post }=this.state;
    post.lat=marker.lat;
    post.lng=marker.lng;
    this.setState({
        post:post
    });
}


  render() {
    /*const Pdfbutton = withRouter(({ history }) => (
      <button className="btn btn-default btn-lg posd"
        onClick={() => this.onPDF(history)}
        type="submit">Subir
      </button>
    ));*/
    const SubmitButton = withRouter(({ history }) => (
      <button className="btn btn-default btn-lg posd"
        onClick={() => this.onSubmit(history)}
        type="submit">Postear
      </button>
    ));
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
                      <h3>{this.props.location.params.name}</h3>
                      <h3>{this.props.location.params.group_id}</h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className='container-home'>
                    <div className="col-md-12">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3 className="panel-title">Integrantes<a className="items">
                            <i className="fas fa-users"></i>
                          </a></h3>
                        </div>
                        <div className="panel-body">
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
                      <select className="form-control sel" id="sel1" onChange={this.onChange}>
                        <option value="1">Solicitud</option>
                        <option value="0  ">Ofrecimiento</option>
                      </select>
                      <div className="posd" >
                        <label><input type="checkbox" name="map" onChange={this.check} value={!this.state.map} />Mapa?</label>
                      </div>
                      
                      {this.state.map !== false && <div className="map"><Map type='editar' onSelectLoc={this.handleLoc}/></div>}
                      <br></br>
                      <br></br>
                      
                      <SubmitButton />
                    </div>
                  </div>

                </div>
                <div className="row">
                </div>
                <Group_posts user_id={this.state.user_id} group_id={this.props.location.params.group_id} />
              </div>
            </div>
          </div>
        }
      </div>)
  }
}
const { object, bool } = PropTypes;

groups.propTypes = {
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

export default connect(mapState, mapDispatch)(groups);
