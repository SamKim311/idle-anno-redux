import { ACTIONS } from '../actions/game';
import Buildings from '../data/building-definitions';

const POP_GROWTH_TIME_SECONDS = 10;
const POP_GROWTH_THRESHOLD = 40;
const POP_DECLINE_THRESHOLD = 20;

export default function(state = {}, action) {
  let payload = action.payload;
  switch(action.type) {
    case ACTIONS.TICK:
      const timeIntervalS = payload.tickIntervalSeconds;
      const newState = Object.assign({}, state);
      const houses = Object.assign({}, newState.housing);
      const population = Object.assign({}, newState.population);
      newState.housing = houses;
      newState.population = population;

      const populationCounts = {};
      // go house by house, increment growth timer
      const newAbodes = houses.abodes.map((abodeOriginal) => {
        const abode = Object.assign({}, abodeOriginal);
        const curHappiness = population[Buildings[abode.houseId].populationCategory].happiness;
        let growthFactor = 0;

        if (curHappiness >= POP_GROWTH_THRESHOLD && abode.currentPop < abode.populationCap) {
          growthFactor = 1;
        }
        if (curHappiness <= POP_DECLINE_THRESHOLD && abode.currentPop > 0) {
          growthFactor = -1;
        }

        abode.popProgress += timeIntervalS * growthFactor;
        if (abode.popProgress > POP_GROWTH_TIME_SECONDS || abode.popProgress < -POP_GROWTH_TIME_SECONDS) {
          abode.popProgress -= POP_GROWTH_TIME_SECONDS * growthFactor;
          abode.currentPop += growthFactor;
        }

        if (abode.currentPop < 1) {
          abode.currentPop = 1;
        }

        const popCategory = Buildings[abode.houseId].populationCategory;
        if (!populationCounts[popCategory]) {
          populationCounts[popCategory] = 0;
        }

        populationCounts[popCategory] += abode.currentPop;

        return abode;
      });
      houses.abodes = newAbodes;

      for (let [popType, popCount] of Object.entries(populationCounts)) {
        const newPop = Object.assign({}, population[popType]);
        newPop.owned = popCount;
        population[popType] = newPop;
      }

      return newState;
    default:
      return state;
  }
}
