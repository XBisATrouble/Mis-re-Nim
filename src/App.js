import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { reduceTokenHuman, reduceTokenComputer } from "./actions/reduceToken";
import { resetGame } from "./actions/resetGame";

class App extends React.Component {
  render() {
    const { humanPlayer, token, winCondition, log } = this.props;

    // Displays log entries, the curent one at the top
    const writeLog = log.map((logElement, index) => {
      const player = logElement.humanPlayer
        ? "Menschlicher Spieler"
        : "Computer";
      const matches = logElement.n === 1 ? "Streichholz" : "Streichhölzer";
      return (
        <p key={index}>
          {player} hat {logElement.n} {matches} gezogen.
        </p>
      );
    });

    return (
      <div className="App">
        <div>Current Player: {humanPlayer ? "1" : "2"}</div>
        <div>{token}</div>
        <button disabled={token < 1} onClick={() => this.props.reduceToken(1)}>
          1
        </button>
        <button disabled={token < 2} onClick={() => this.props.reduceToken(2)}>
          2
        </button>
        <button disabled={token < 3} onClick={() => this.props.reduceToken(3)}>
          3
        </button>
        {winCondition ? (
          <div>
            <div>
              {humanPlayer ? "Menschlicher Spieler" : "Computer"} hat gewonnen.
              Glückwunsch!
            </div>
            <button onClick={() => this.props.resetGame()}>Reset game</button>
          </div>
        ) : null}
        {writeLog}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
