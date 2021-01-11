const initialState = {
  humanPlayer: true,
  token: 13,
  winCondition: false,
  log: [],
  optimalStrategy: true,
};

const reduceTokenComputer = (token) => {
  return Math.floor(Math.random() * Math.min(token, 3) + 1);
};

const reduceTokenSmartComputer = (token) => {
  const n = (token - 1) % 4;
  if (n === 0) {
    return reduceTokenComputer(token);
  } else {
    return n;
  }
};

const rootReducer = (state = initialState, action) => {
  const { humanPlayer, token, log } = state;
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

    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
