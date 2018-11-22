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

class Search_posts extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      posts: [],
      loading: false
    };
  };



  componentDidMount() {
    axios.get('https://knowledge-community-back-end.herokuapp.com/posts?body='+this.props.searchm)
      .then(res => {
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
/*const { object, bool } = PropTypes;

Posts.propTypes = {
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

export default connect(null, mapDispatch)(Posts);*/
export default Search_posts;