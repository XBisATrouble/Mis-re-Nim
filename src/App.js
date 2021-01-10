import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { reduceToken } from "./actions/reduceToken";
import { resetGame } from "./actions/resetGame";

class App extends React.Component {
  render() {
    const { firstPlayer, token, winCondition } = this.props;
    console.log("this.firstPlayer", firstPlayer);
    console.log("this.token", token);
    console.log("winCondition", winCondition);
    return (
      <div className="App">
        <div>Current Player: {firstPlayer ? "1" : "2"}</div>
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
              {" "}
              Spieler {firstPlayer ? "1" : "2"} hat gewonnen. Glückwunsch!{" "}
            </div>
            <button onClick={() => this.props.resetGame()}>Reset game</button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstPlayer: state.firstPlayer,
    token: state.token,
    winCondition: state.winCondition,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduceToken: (n) => {
      dispatch(reduceToken(n));
    },
    resetGame: () => {
      dispatch(resetGame());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
