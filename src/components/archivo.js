import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import '../styles/Home.css';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Archivo extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: [],
            picture: "",
        };


    }

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <h6>
                        {this.props.titulo}
                    </h6>
                </div>
                <div className="row">
                    <iframe src={this.props.ruta} width="600px" height="300px" seamless webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
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
export default Archivo;