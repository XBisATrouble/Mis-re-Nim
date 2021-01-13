import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { reduceTokenHuman, reduceTokenComputer } from "./actions/reduceToken";
import { resetGame } from "./actions/resetGame";
import { changeStrategy } from "./actions/changeStrategy";
import "materialize-css";
import { Switch, Button } from "react-materialize";

class App extends React.Component {
  render() {
    const {
      humanPlayer,
      token,
      winCondition,
      log,
      optimalStrategy,
    } = this.props;

    // Creates 13 tokens
    let tokenNumber = [...Array(token).keys()].map((token) => {
      return (
        <div className="token-element btn-floating btn-large" key={token}></div>
      );
    });

    // Displays log entries, the current one at the top
    const writeLog = log.map((logElement, index) => {
      const player = logElement.humanPlayer
        ? "Menschlicher Spieler"
        : "Computer";
      const matches = logElement.n === 1 ? "Streichholz" : "Streichhölzer";
      return (
        <span key={index}>
          {player} hat {logElement.n} {matches} gezogen.
        </span>
      );
    });

    return (
      <div className="App">
        <h1>Nim Misère</h1>
        <Switch
          id="Switch-11"
          offLabel="Smart Computer Off"
          onChange={this.props.changeStrategy}
          onLabel="Smart Computer On"
          checked={optimalStrategy}
        />
        <div className="container row">
          <div className="col s12">
            <div className="card-panel teal lighten-5">
              <div className="text-grey-darken-4 flow-text">
                Aktueller Spieler: {humanPlayer ? "Mensch" : "Computer"}
              </div>
              <div className="token-wrapper">{tokenNumber}</div>
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          <Button
            disabled={token < 1}
            node="button"
            onClick={() => this.props.reduceToken(1)}
            waves="light"
          >
            {"1"}
          </Button>
          <Button
            className="button-2"
            disabled={token < 2}
            node="button"
            onClick={() => this.props.reduceToken(2)}
            waves="light"
          >
            {"2"}
          </Button>
          <Button
            disabled={token < 3}
            node="button"
            onClick={() => this.props.reduceToken(3)}
            waves="light"
          >
            {"3"}
          </Button>
        </div>
        {winCondition ? (
          <div>
            <div className="text-grey-darken-4 flow-text">
              {`Der${
                humanPlayer === true ? " menschliche Spieler " : " Computer "
              }hat gewonnen. Glückwunsch!`}
            </div>
            <Button onClick={() => this.props.resetGame()}>
              {"Reset game"}
            </Button>
          </div>
        ) : null}
        <p>{writeLog}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    humanPlayer: state.humanPlayer,
    token: state.token,
    winCondition: state.winCondition,
    log: state.log,
    optimalStrategy: state.optimalStrategy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduceToken: (n) => {
      dispatch(reduceTokenHuman(n));
      // No usage of thunks necessary;dispatches are synchron = sequential (neede for computer move)
      dispatch(reduceTokenComputer());
    },
    resetGame: () => {
      dispatch(resetGame());
    },
    changeStrategy: () => {
      dispatch(changeStrategy());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
