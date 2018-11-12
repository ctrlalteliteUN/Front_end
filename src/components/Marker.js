import React, { Component } from 'react';

const marker = ({ text }) => <div>{text}</div>;

class Marker extends Component {

    render() {

        return (
            <div>
                <div className="pin">
                    <i class="fas fa-map-marker-alt"></i>                    
                </div>
                <h4>{this.props.text}</h4>
            </div>
        );
    }
}


export default Marker;