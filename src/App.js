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

  handleResetClick() {
    console.log(Date.now())
  };

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
        ? "You"
        : "Bob";
      const matches = logElement.n === 1 ? "Stone" : "Stones";
      return (
        <span key={index}>
          {player} have taken {logElement.n} {matches}.
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
        
        <h3>Pick Up Stones</h3>
        <h4>Xubin Chen</h4>
        <h4>1001991315</h4>
        {/* <Switch
          id="Switch-11"
          offLabel="Törichter Computer"
          onChange={this.props.changeStrategy}
          onLabel="Cleverer Computer"
          checked={optimalStrategy}
        /> */}
        <div className="container row">
          <div className="col s12">
            <div className="card-panel teal lighten-5">
              <span className="flow-text">
                Total Stones: {token}
              </span>
              <div className="token-wrapper">{this.createToken(token)}</div>
            </div>
          </div>
        </div>
        <div className="button-wrapper">{this.createButtons(4, token)}</div>
        {winCondition ? (
          <div>
            <div className="text-grey-darken-4 flow-text">
              {`${
                humanPlayer ? " p1 " : " Bob "
              }won this game. Good Game!`}
            </div>
            <Button onClick={() => {this.props.resetGame(); this.handleResetClick()}}>
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
