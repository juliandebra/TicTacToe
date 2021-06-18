import React, { Component, Fragment } from 'react';
import './App.css'

export default class Casillero extends Component {

render(){
  const props = this.props;
    return <Fragment>
              
              <button   
                onClick={props.onClick} 
                className="Casillero"> {props.value}
              </button>
            </Fragment>
  }
}