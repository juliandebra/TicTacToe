import React, {Component} from 'react';
import Casillero from './Casilleros.js';
import './App.css'

export default class Tablero extends Component {
    renderCasillero(i) {
        return (
          <Casillero //Se pasan los valores al componente
            value={this.props.casilleros[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
      }

  render(){
    return  (
      // Identificador de cada casilla que servirá para determinar cuando termina el juego
     <div>
        <div className="Filas">
          {this.renderCasillero(0)}
          {this.renderCasillero(1)}
          {this.renderCasillero(2)}
        </div>
        <div className="Filas">
          {this.renderCasillero(3)}
          {this.renderCasillero(4)}
          {this.renderCasillero(5)}
        </div>
        <div className="Filas">
          {this.renderCasillero(6)}
          {this.renderCasillero(7)}
          {this.renderCasillero(8)}
        </div>
      </div>
    )
  }

}