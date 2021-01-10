const initialState = {
  firstPlayer: true,
  token: 13,
  winCondition: false,
  log: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REDUCE_TOKEN":
      const { firstPlayer, token, log } = state;
      const newTokenValue = token - action.n;

      // Gewinnbedingung überprüfen
      // wenn WAHR, dann hat der Computer gewonnen; State entsprechend zurückgeben

      // sonst: Funktion aufrufen, die n für Computer berechnet
      // state aktualisieren und zurückgeben (auch hier noch mal Gewinnbedingung prüfen)

      return {
        firstPlayer: !firstPlayer,
        token: newTokenValue,
        winCondition: newTokenValue === 0,
        log: [{ firstPlayer, n: action.n }, ...log],
      };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
