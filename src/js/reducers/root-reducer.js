import { ACTIONS } from '../actions/game';
import { combineReducers } from 'redux';
import island from './island';
import warehouse from './warehouse';
import construction from './construction';
import buildings from './building';
import couriers from './couriers';
import housing from './housing';
import population from './population';
import amenity from './amenities';
import consume from './consume';
import growth from './growth';
import finance from './finance';
import levelUp from './level-up';
import cheat from './cheat';
import trader from './trader';

const combinedReducer = combineReducers({
  cheat: (state = {}) => { return state },
  island: island,
  warehouse: warehouse,
  construction: construction,
  buildings: buildings,
  couriers: (state = {}) => { return state }, // no op
  housing: housing,
  population: population,
  trader: trader
});

function rootReducer(state, action) {
  if (action.type === ACTIONS.LOAD_GAME) {
    return action.payload.saveState;
  }
  if (action.type === ACTIONS.TICK) {
    let timeFactor = state.cheat.timeFactor;
    if (!timeFactor) {
      timeFactor = 1;
    }
    action.payload.tickIntervalSeconds *= timeFactor;
  }
  const cheatState = cheat(state, action);
  const intermediateState = combinedReducer(cheatState, action);
  const courierState = couriers(intermediateState, action);
  const amenityState = amenity(courierState, action);
  const consumptionState = consume(amenityState, action);
  const growthState = growth(consumptionState, action);
  const financeState = finance(growthState, action);
  const levelUpState = levelUp(financeState, action);
  return levelUpState;
}

export default rootReducer;
