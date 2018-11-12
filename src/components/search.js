import React, { Component } from 'react';
import '../styles/Log.css';
import '../styles/App.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom'

class search extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.search) //undefined
  }
  render() {
    return (
      <div>
        <Navigation />
        <p>{this.props.location.state.search}</p>
      </div>
    )
  }
}
export default search;