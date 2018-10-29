import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user:[],
            picture: "",
        };


    }

    componentDidMount() {
        axios.get('https://knowledge-community-back-end.herokuapp.com/users/'+this.props.user_id)
        .then(response => {
            this.setState({ user: response.data })
        })
        axios.get('https://knowledge-community-back-end.herokuapp.com/app_files?ProfilePhoto=1&user_id=' + this.props.user_id)
            .then(response => {
                this.setState({ picture: response.data })
            })
    }
    render() {
        let { picture } = this.state;
        let $picture = null;
        if (!picture.error) {
            $picture = (<img src={picture.ruta} />);
        } else {
            $picture = (<img src="http://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg" alt="" />);
        }
        return (
            <div className='container-comments'>
                <div className="panel-heading">
                    <div className="post-profile-img">
                        {$picture}
                    </div>
                    <div className="title">
                        <h3 className="panel-title">{this.state.user.name}</h3>
                        </div>
                </div>
                <div className="container panel-body pb">
                    {this.props.body}
                </div>
            </div>
        )
    }

}
/*const { object, bool } = PropTypes;

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

export default connect(null, mapDispatch)(Post);*/
export default Comment;