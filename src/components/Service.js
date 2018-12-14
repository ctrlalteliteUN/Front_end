import React, { Component } from 'react';
import '../styles/Log.css';
import Navigation from './Navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/profile.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { loadState, saveState } from './localStorage.js';
import LoadingSpinner from './LoadingSpinner';
import store from '../store';
import Post from './Post';

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: {},
            loading: false,
            solicitud: {
                post_id: -1,
                score: 5,
                state: 0,
                users: []
            },
            picture: "",
            lat: "",
            lng: "",
            service: {
                post: {
                    body: "",
                    title: "",
                    user: {
                        id: -1
                    },
                    comments: [],
                    comment: {
                        user_id: this.props.user_id,
                        body: "",
                    },
                    tags: [],
                    lat: 4.6381938,
                    lng: -74.0840464,
                },
                users: [{
                    id: -1,
                    email: "",
                    name: ""
                }]
            },
            post: {
                comments: [],
                tags: []
            },
            admitido: false,
        };
        this.saveStateService = this.saveStateService.bind(this);
        this.startsChange = this.startsChange.bind(this);
        this.onSubmitScore = this.onSubmitScore.bind(this);
    }

    saveStateService() {
        saveState(this.state, 'service'+this.props.match.params.service_id);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveStateService)

        // saves if component has a chance to unmount
        this.saveStateService();
    }

    componentDidMount() {
        //console.log(this.props);
        const state = loadState('service'+this.props.match.params.service_id);
        this.setState(state);
        window.addEventListener('beforeunload', this.saveStateService);
        if (store.getState().session.user.email !== undefined) {
            this.setState({ session: store.getState().session.user }, () => {
                axios.defaults.headers.common['Authorization'] = `${this.state.session.authentication_token}`;
                axios.defaults.headers.common['ID'] = `${this.state.session.id}`;
            })
        }
        this.setState({ loading: true }, () => {
            setTimeout(() => this.setState({ loading: false }), 500);
        })
        this.setState({ loading: true }, () => {
            //console.log(data);
            axios.get('https://knowledge-community-back-end.herokuapp.com/services/' + this.props.match.params.service_id)
                .then(response => {
                    this.setState({
                        service: response.data,
                    })
                    axios.get('https://knowledge-community-back-end.herokuapp.com/posts/' + response.data.post.id)
                        .then(res => {
                            this.setState({
                                post: res.data,
                                loading: false,
                            });
                        })
                    this.state.service.users.forEach(element => {
                        if (element.id == this.state.session.id) {
                            this.setState({ admitido: true });
                        } else {
                            this.setState({ user: element });
                        }
                    });
                })


        })
        this.setState({ loading: true }, () => {

            setTimeout(() => this.setState({ loading: false }), 5000);
        })

    }

    /*componentWillReceiveProps() {
        console.log(store.getState());
        
    }*/
    startsChange(e) {
        let solicitud = this.state.solicitud;
        solicitud.score = e.target.value;
        this.setState({ solicitud: solicitud })
    }

    onSubmitScore() {
        let service = {
            post_id: this.state.post.id,
            user_id: this.state.post.user_id,
            user_service_id: -1,
            score_post: 0,
            score_service: 0,
            state: 0,
        }
        if (this.state.post.user_id == this.state.session.id) {
            service.score_post = this.state.solicitud.score;
            this.state.service.users.forEach(element => {
                if (element.id != this.state.session.id) {
                    service.score_service = element.score;
                }
            });
        } else {
            service.score_service = this.state.solicitud.score;
            this.state.service.users.forEach(element => {
                if (element.id != this.state.session.id) {
                    service.score_post= element.score;
                }
            });
        }
        this.state.service.users.forEach(element => {
            if (element.id != this.state.post.user_id) {
                service.user_service_id = element.id;
            }
        });
        axios.put('https://knowledge-community-back-end.herokuapp.com/services/' + this.state.service.id, service)
            .then(response => {
                alert("Se ha guardado la calificación");
                this.setState({
                    loading: false,
                })
            })
            .catch(function (error) {
                console.error(error);
            })
    }

    render() {
        const ScoreButton = () => (
            <button className="btn btn-default btn-lg posd"
                onClick={() => this.onSubmitScore()}
                type="submit">Finalizar
            </button>
        );
        let aux = <div></div>;
        if (this.state.post && this.state.admitido && this.state.user) {
            aux = <div className="container">
                <br></br><br></br>
                <h2>Este es el usuario con el que intercambiaras conocimiento: </h2>
                <div className="container">
                    <p>Nombre: {this.state.user.name}</p>
                    <p>Correo: {this.state.user.email}</p>
                </div>
                <h2>Este es el post por el que intercambian conocimiento: </h2>
                <Post id={this.state.service.post.id} user_id={this.state.service.post.user_id} post={this.state.post} ></Post>
                <div className="container cal-panel">
                    <h3>¿Qué tal fue el intercambio de conocimiento con {this.state.user.name}?</h3>
                    <p className="clasificacion" >
                        <input id="radio1" type="radio" name="estrellas" value="5" checked={this.state.solicitud.score === "5"} onChange={this.startsChange} />
                        <label className="lb" for="radio1">★</label>
                        <input id="radio2" type="radio" name="estrellas" value="4" checked={this.state.solicitud.score === "4"} onChange={this.startsChange} />
                        <label className="lb" for="radio2">★</label>
                        <input id="radio3" type="radio" name="estrellas" value="3" checked={this.state.solicitud.score === "3"} onChange={this.startsChange} />
                        <label className="lb" for="radio3">★</label>
                        <input id="radio4" type="radio" name="estrellas" value="2" checked={this.state.solicitud.score === "2"} onChange={this.startsChange} />
                        <label className="lb" for="radio4">★</label>
                        <input id="radio5" type="radio" name="estrellas" value="1" checked={this.state.solicitud.score === "1"} onChange={this.startsChange} />
                        <label className="lb" for="radio5">★</label>
                    </p>
                    <h3>Finaliza el servicio una vez hayan intercambiado conocimiento!</h3>
                    <ScoreButton></ScoreButton>
                </div>
            </div>
        } else {
            aux = <div>Este no es tu servicio!!!!</div>
        }

        return (
            <div>
                <Navigation />
                {this.state.loading ? <LoadingSpinner /> :
                    aux
                }

            </div >

        )
    }
}
const { object, bool } = PropTypes;

Service.propTypes = {
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

export default connect(mapState, mapDispatch)(Service);