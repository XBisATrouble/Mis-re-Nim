import { reduceTokenComputer, reduceTokenSmartComputer } from "./rootReducer";
import rootReducer from "./rootReducer";

it("check if smart strategy works correct", () => {
  expect(reduceTokenSmartComputer(12)).toEqual(3);
  expect(reduceTokenSmartComputer(11)).toEqual(2);
  expect(reduceTokenSmartComputer(6)).toEqual(1);
  expect(reduceTokenSmartComputer(2)).toEqual(1);
});

it("check if creating random n works", () => {
  expect(reduceTokenComputer(1)).toEqual(1);
  expect(reduceTokenComputer(13)).toBeLessThan(4);
  expect(reduceTokenComputer(13)).toBeGreaterThan(0);
});

it("check win conditions and correct state update", () => {
  expect(
    rootReducer({ token: 0 }, { type: "REDUCE_TOKEN_HUMAN", n: 3 })
  ).toEqual({ token: 0, winCondition: true });
  expect(rootReducer({ token: 0 }, { type: "REDUCE_TOKEN_COMPUTER" })).toEqual({
    token: 0,
    winCondition: true,
  });

  expect(
    rootReducer(
      { token: 13, humanPlayer: true, log: [], winCondition: false },
      { type: "REDUCE_TOKEN_HUMAN", n: 3 }
    )
  ).toEqual({
    token: 10,
    winCondition: false,
    humanPlayer: false,
    log: [{ humanPlayer: true, n: 3 }],
  });
  expect(
    rootReducer(
      {
        token: 12,
        humanPlayer: false,
        log: [],
        winCondition: false,
        optimalStrategy: true,
      },
      { type: "REDUCE_TOKEN_COMPUTER" }
    )
  ).toEqual({
    token: 9,
    winCondition: false,
    humanPlayer: true,
    optimalStrategy: true,
    log: [{ humanPlayer: false, n: 3 }],
  });
});
