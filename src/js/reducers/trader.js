import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS } from '../actions/trade';
import Traders from '../data/trader-info';
import ResourceDefinitions from '../data/resource-definitions';

const BASE_TRADER_STAY_TIME_SECONDS = 360;
const BASE_TRADER_VACANCY_TIME_SECONDS = 180;
const BASE_DISMISS_COST = 100;

const INIT_STATE = {
  traderId: 0,
  timer: 0,
  timeToLeave: BASE_TRADER_STAY_TIME_SECONDS,
  wares: {},
  newGame: true,
  dismissCost: BASE_DISMISS_COST
};

export default function(trader=INIT_STATE, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.BUY_GOODS: {
      const toBuy = payload.product;
      const amount = payload.amount;
      const wares = {...trader.wares};
      const newState = {...trader, wares: wares};

      wares[toBuy].held -= amount;

      return newState;
    }
    case ACTIONS.SELL_GOODS: {
      const toBuy = payload.product;
      const amount = payload.amount;
      const wares = {...trader.wares};
      const newState = {...trader, wares: wares};

      wares[toBuy].held += amount;

      return newState;
    }
    case gameActions.TICK:
      const timeIntervalS = payload.tickIntervalSeconds;
      const newState = {...trader};
      newState.timer += timeIntervalS;
      if (newState.timer > newState.timeToLeave) {
        newState.timer -= newState.timeToLeave;
        return newTrader(newState);
      }
      return newState;
    case ACTIONS.DISMISS_TRADER: {
      const newState = {...trader};
      newState.traderId = 0;
      newState.wares = {};
      newState.time = 0;
      newState.timeToLeave = BASE_TRADER_VACANCY_TIME_SECONDS;
      return newState;
    }
    default:
      return trader;
  }
};

function newTrader(currentState) { // atm, more like "restock goods"
  const traders = Object.keys(Traders);
  let selectedTrader = traders[Math.floor(Math.random() * traders.length)];
  if (currentState.newGame) {
    currentState.newGame = false;
    selectedTrader = 'lord';
  }
  const traderInfo = Traders[selectedTrader];
  const wares = {};
  const maxCapacity = traderInfo.baseCapacity;
  const timeToLeave = BASE_TRADER_STAY_TIME_SECONDS;
  const newState = {
    ...currentState,
    traderId: selectedTrader,
    wares: wares,
    maxCapacity: maxCapacity,
    timeToLeave: timeToLeave
  };

  for (let [good, rates] of Object.entries(traderInfo.rates)) {
    const goodBasePrice = ResourceDefinitions[good].baseTradePrice;
    const buyPrice = rates.buy * goodBasePrice;
    const sellPrice = rates.sell * goodBasePrice;

    wares[good] = {
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      held: 0
    }
    if (sellPrice > 0) {
      wares[good].held = Math.floor(maxCapacity * 0.75);
    }
  }

  return newState;
}
