import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import store from '../store';
import { loadState, saveState } from './localStorage.js';

class Search_posts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      posts: [],
      loading: false,
      user:{}
    };
    this.saveStateProfile = this.saveStatePost.bind(this);
  }

  saveStatePost() {
    saveState(this.state, 'post');
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStatePost)

    // saves if component has a chance to unmount
    this.saveStatePost();
  }

  componentDidMount() {
    const state = loadState('post');
    this.setState(state);
    window.addEventListener('beforeunload', this.saveStatePost);
    if (store.getState().session.user.email != undefined) {
      this.setState({ user: store.getState().session.user })
    }
    this.setState({ loading: true }, () => {
      axios.get('https://knowledge-community-back-end.herokuapp.com/posts?body=' + this.props.searchm)
        .then(res => {
          console.log(this.state)
          this.setState({
            posts: res.data,
            loading: false,
          });
        }).catch(function (error) {
          console.error(error);
          console.error(error);
          this.setState({
            loading: false,
          })
        })
    })
  }
  getPosts() {

    for (let i = 0; i < this.state.posts.length; i++) {
      <Post id={this.state.posts[i].id} user_id={this.props.user_id} />
    }
  }
  render() {

    const listItems = this.state.posts.map((d) => <Post id={d.id} user_id={this.props.user_id}>{d.title}</Post>);
    return (
      <div>
        {listItems}
      </div>
    )
  }

}
const { object, bool } = PropTypes;

Search_posts.propTypes = {
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

export default connect(null, mapDispatch)(Search_posts);
//export default Search_posts;