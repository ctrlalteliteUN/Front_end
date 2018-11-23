import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment.js'
import Map from './Map';
import store from '../store';
import { loadState, saveState } from './localStorage.js';


class Post extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading:false,
            body: "",
            title: "",
            user: [],
            picture: "",
            comments: [],
            comment: {
                user_id: this.props.user_id,
                body: "",
            },
            tags: [],
            lat: '',
            lng: '',
            session:{}

        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.saveStateProfile = this.saveStatePost.bind(this);
    }

    saveStatePost() {
        saveState(this.state, 'post'+this.state.user.id);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.saveStatePost)

        // saves if component has a chance to unmount
        this.saveStatePost();
    }

    componentDidMount() {
        const state = loadState('post'+this.state.user.id);
        this.setState(state);
        window.addEventListener('beforeunload', this.saveStatePost);
        if (store.getState().session.user.email != undefined) {
            this.setState({ session: store.getState().session.user })
        }
        this.setState({ loading: true }, () => {
            axios.get('https://knowledge-community-back-end.herokuapp.com/posts/' + this.props.id)
                .then(res => {
                    this.setState({
                        body: res.data.body,
                        title: res.data.title,
                        user: res.data.user,
                        comments: res.data.comments,
                        tags: res.data.tags,
                        lat: res.data.lat,
                        lng: res.data.lng
                    });
                    axios.get('https://knowledge-community-back-end.herokuapp.com/app_files?ProfilePhoto=1&user_id=' + this.state.user.id)
                        .then(response => {
                            this.setState({ picture: response.data })
                        })
                })
        })
    }

    onSubmit(history) {
                const { comment } = this.state;
                comment.user_id = this.props.user_id;
                axios.post('https://knowledge-community-back-end.herokuapp.com/posts/' + this.props.id + '/comments', this.state.comment)
                    .then(function (response) {
                        alert("Comentario publicado");
                        history.push('/');
                    })
                    .catch(function (error) {
                        console.error(error);
                        console.error(error);
                    })
            }

    onChange(e) {
                const { value, name } = e.target;
                const { comment } = this.state;
                comment[name] = value;
                this.setState({ name });
            }




    render() {

                const ComentarButton = withRouter(({ history }) => (
                    <button className="btn btn-default btn-lg posd"
                        onClick={() => this.onSubmit(history)}
                        type="submit">Comentar
            </button>
                ));

                let { lat, lng, picture } = this.state;
                let $picture = null;
                if(!picture.error) {
                    $picture = (<img src={picture.ruta} />);
                } else {
                    $picture = (<img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />);
                }
        const listItems = this.state.comments.map((d) => <Comment user_id={d.user_id} body={d.body}></Comment>);
                const center = { lat: parseFloat(lat), lng: parseFloat(lng) };

                return(

            <div className = 'container-home2' >
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <div className="post-profile-img">
                                    {$picture}
                                </div>
                                <div className="title">
                                    <h3 className="panel-title">
                                        <Link className="link" to={{ pathname: '/profile', params: { email: this.state.user.email } }}>
                                            {this.state.user.name}
                                        </Link> : {this.state.title} {this.state.tags.map(person => <p>{person.name}</p>)} </h3>

                                </div>
                            </div>
                            <div className="container panel-body pb">
                                {this.state.body}
                            </div>
                            <hr></hr>
                            <div className="buttons test">
                                <input
                                    className="form-control comment-txt"
                                    name="body"
                                    label="Body"
                                    type="body"
                                    placeholder="Comenta algo"
                                    onChange={this.onChange}
                                />
                                <button type="button" className="btn btn-default btn-lg">Contactar</button>
                                <ComentarButton></ComentarButton>
                            </div>

                        </div>
                { this.state.comments.length > 0 &&
            <div>
                <br></br>
                <hr></hr>
                <h5>Comentarios</h5>
            </div>
                }
                <div>
    {lat != null && lat != '' && <Map center={center} username={this.state.user.name} type='vista' />}

</div>
    <div className="container">
        {listItems}
    </div>
            </div >
        )
    }

}
const { object, bool } = PropTypes;

Post.propTypes = {
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

export default connect(mapState, mapDispatch)(Post);
//export default Post;