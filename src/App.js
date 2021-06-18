import React, { Component } from "react";
import './App.css';
import Tablero from './Tablero.js';
// FontAwesome e iconos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

 // Iconos pasados a variables
const cross = <FontAwesomeIcon icon={faTimes} />;
const circle = <FontAwesomeIcon icon={faCircleNotch} />;


export default class App extends Component { 
  // Inicialización del estado:
  //   - El array de los casilleros dentro del historial para así tener registro de cada movimiento
  //   - Cantidad de movimientos realizados
  //   - Booleano para determinar si es el turno de X o de O
  constructor(props) {
    super(props);
    this.state = {
      historial: [
        {
          casilleros: Array(9).fill(null)
        }
      ],
      jugadas: 0,
      turn: true
    };
  }

    
  
  makeMove(i) {
    const historial = this.state.historial.slice(0, this.state.jugadas + 1);
    const actual = historial[historial.length - 1];
    const casilleros = actual.casilleros.slice();

    // If que evita las jugadas despues de que endGame() devolviera true o para evitar que se vuelva a jugar sobre la misma casilla
    if (endGame(casilleros) || casilleros[i]) {
      return Promise.resolve();
    }
    // Determina que valor colocar dentro del casillero según el estado de turn
    casilleros[i] = this.state.turn ? cross : circle;

    // Detea el nuevo State
    const nextState = {
      historial: historial.concat([
        {
          casilleros: casilleros
        }
      ]),
      jugadas: historial.length,
      turn: !this.state.turn
    };
  
    // Devuelve una Promise una vez que setState esté resuelto.
    return new Promise((resolve) => {
      this.setState(nextState, resolve);
    });
  }
  // Función async para esperar a que resuelva todas las operaciones de makeMove() y así lograr la sincronización
  async handleClick(i) { 
    await this.makeMove(i);
  }
  
  // Función en caso de que el jugador quiera volver a un movimiento anterior
  jumpTo(step) {
    this.setState({
      jugadas: step,
      turn: (step%2) === 0
    });
  };
  
render(){
  const historial = this.state.historial;
  const actual = historial[this.state.jugadas];
  const ganador = endGame(actual.casilleros);

  // Función para generar los botones del historial
  const moves = historial.map((i, move) => {
    const desc = move ? 'Jugada #' + move : 'Comenzar de nuevo';
    return (
      <li key={move}>
        <button className="moves" onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  // If que devuelve el estado actual del partido. Cambia en caso de que se cumpla la función endGame() o sinJugadas()
  let info;
  if (ganador) {
    info = "Ganador: " + (this.state.turn ? "O" : "X");
  }
  else if (sinJugadas(actual.casilleros)) {
    info = "Empate!";
  } else {
    info = "Turno del jugador " + (this.state.turn ? "X" : "O");
  }

  
  return (
        <div className="Tablero">
          <div className="Bloque">
            <Tablero //Paso los valores a Tablero y luego a Casillero
              casilleros={actual.casilleros}
              onClick={i => this.handleClick(i)}
            />
            <div className="info">
               <p> {info}</p>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
          
      );
}
}
  // Función para corroborar si matchea al menos un array de lines y así terminar el juego
function endGame(casilleros) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (casilleros[a] && casilleros[a] === casilleros[b] && casilleros[a] === casilleros[c]) {
      return 1;
    }
  }
  return null;
}

  // Función para corroborar si aún hay casilleros sin valores
function sinJugadas(casilleros) {
  for (let i = 0; i < casilleros.length; i++) {
    if (casilleros[i] === null) {
      return false;
    }
  }
  return true;
}
