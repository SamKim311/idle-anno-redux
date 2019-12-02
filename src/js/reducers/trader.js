import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS } from '../actions/trade';
import Traders from '../data/trader-info';
import ResourceDefinitions from './resource-definitions';

const BASE_TRADER_STAY_TIME_SECONDS = 240;

const INIT_STATE = {
  traderId: 0,
  timer: 0,
  timeToLeave: 300,
  wares: {}
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
    default:
      return trader;
  }
};

function newTrader(currentState) { // atm, more like "restock goods"
  const traders = Object.keys(Traders);
  const selectedTrader = traders[Math.floor(Math.random() * traders.length)];
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
      wares[good].held = maxCapacity;
    }
  }

  return newState;
}
