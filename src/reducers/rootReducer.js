const initialState = {
  humanPlayer: true,
  token: 13,
  winCondition: false,
  log: [],
  // Makes switch between win orientated and random computer possible
  optimalStrategy: true,
};

// Function for random computer move (number between 1 and 3) for normal computer opponent
export const reduceTokenComputer = (token) => {
  return Math.floor(Math.random() * Math.min(token, 3) + 1);
};

// Function for smart computer that leads to win
export const reduceTokenSmartComputer = (token) => {
  const n = (token - 1) % 4;
  if (n === 0) {
    return reduceTokenComputer(token);
  } else {
    return n;
  }
};

// Function that handles the switch of human and computer moves
export const rootReducer = (state = initialState, action) => {
  const { humanPlayer, token, log, optimalStrategy } = state;
  switch (action.type) {
    case "REDUCE_TOKEN_HUMAN":
      if (token === 0) {
        return { ...state, winCondition: true };
      } else {
        let newTokenValue = token - action.n;
        return {
          ...state,
          humanPlayer: !humanPlayer,
          token: newTokenValue,
          log: [{ humanPlayer, n: action.n }, ...log],
        };
      }
    case "REDUCE_TOKEN_COMPUTER":
      if (token === 0) {
        return { ...state, winCondition: true };
      } else {
        // Makes switch between an win orientated and and random computer possible; not yet implemented
        const computerN = state.optimalStrategy
          ? reduceTokenSmartComputer(token)
          : reduceTokenComputer(token);
        let newTokenValue = token - computerN;
        return {
          ...state,
          humanPlayer: !humanPlayer,
          token: newTokenValue,
          log: [{ humanPlayer, n: computerN }, ...log],
        };
      }
    case "CHANGE_STRATEGY":
      return { ...state, optimalStrategy: !optimalStrategy };

    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
