export const reduceTokenHuman = (n) => {
  return {
    type: "REDUCE_TOKEN_HUMAN",
    n: n,
  };
};

export const reduceTokenComputer = () => {
  return {
    type: "REDUCE_TOKEN_COMPUTER",
  };
};
