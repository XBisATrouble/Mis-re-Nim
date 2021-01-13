import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { reduceTokenHuman, reduceTokenComputer } from "./actions/reduceToken";
import { resetGame } from "./actions/resetGame";
import { changeStrategy } from "./actions/changeStrategy";
import "materialize-css";
import { Switch, Button } from "react-materialize";

class App extends React.Component {
  createButtons(n, token) {
    return [...Array(n).keys()].map((i) => {
      const buttonValue = i + 1;
      return (
        <Button
          key={i}
          disabled={token < buttonValue}
          node="button"
          onClick={() => this.props.reduceToken(buttonValue)}
          waves="light"
        >
          {buttonValue}
        </Button>
      );
    });
  }

  createToken(token) {
    // Create tokens
    return [...Array(token).keys()].map((token) => {
      return (
        <div className="token-element btn-floating btn-large" key={token}></div>
      );
    });
  }

  writeLog(log) {
    // Displays log entries, the current one at the top
    return log.map((logElement, index) => {
      const player = logElement.humanPlayer
        ? "Menschlicher Spieler"
        : "Computer";
      const matches = logElement.n === 1 ? "Spielstein" : "Spielsteine";
      return (
        <span key={index}>
          {player} hat {logElement.n} {matches} gezogen.
        </span>
      );
    });
  }

  render() {
    const {
      humanPlayer,
      token,
      winCondition,
      log,
      optimalStrategy,
    } = this.props;

    return (
      <div className="App">
        <h1>Nim Misère</h1>
        <Switch
          id="Switch-11"
          offLabel="Törichter Computer"
          onChange={this.props.changeStrategy}
          onLabel="Cleverer Computer"
          checked={optimalStrategy}
        />
        <div className="container row">
          <div className="col s12">
            <div className="card-panel teal lighten-5">
              <span className="flow-text">
                Verbleibende Spielsteine: {token}
              </span>
              <div className="token-wrapper">{this.createToken(token)}</div>
            </div>
          </div>
        </div>
        <div className="button-wrapper">{this.createButtons(3, token)}</div>
        {winCondition ? (
          <div>
            <div className="text-grey-darken-4 flow-text">
              {`Der${
                humanPlayer ? " menschliche Spieler " : " Computer "
              }hat gewonnen. Glückwunsch!`}
            </div>
            <Button onClick={() => this.props.resetGame()}>
              {"Reset game"}
            </Button>
          </div>
        ) : null}
        <p>{this.writeLog(log)}</p>
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
