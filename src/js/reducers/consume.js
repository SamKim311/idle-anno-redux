import { ACTIONS } from '../actions/game';
import PopulationDefinitions from '../data/population-definitions';

const TIME_FACTOR = 1 / 60.0;
const CONSUME_FACTOR = 1 / 100.0;
const MIN_HAPPINESS_DELTA = 0.001;

export default function(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.TICK:
      const timeIntervalS = payload.tickIntervalSeconds;
      const newState = Object.assign({}, state);
      const warehouse = Object.assign({}, newState.warehouse);
      const resources = Object.assign({}, warehouse.resources);
      warehouse.resources = resources;
      const amenities = newState.amenities;
      const population = Object.assign({}, newState.population);
      newState.warehouse = warehouse;
      newState.population = population;

      for (const [popType, popOriginal] of Object.entries(state.population)) {
        const pop = Object.assign({}, popOriginal);
        pop.consumeInfo = null;
        let currentHappiness = 0;
        if (popOriginal.owned !== 0) {
          for (const [product, consumeInfo] of Object.entries(PopulationDefinitions[popType].consumes)) {
            const consumed = consumeInfo.quantity * pop.owned * timeIntervalS * TIME_FACTOR * CONSUME_FACTOR;
            let pctSatisfied = 1;

            if (amenities[product]) {
              if (amenities[product] < consumed) {
                pctSatisfied = amenities[product] / consumed;
                if (!pop.consumeInfo) {
                  pop.consumeInfo = 'Need ' + product;
                }
              }
              amenities[product] -= consumed;
              if (amenities[product] < 0) {
                amenities[product] = 0;
              }
            } else if (resources[product]) {
              const resource = Object.assign({}, resources[product]);
              resources[product] = resource;

              if (resource.owned < consumed) {
                pctSatisfied = resource.owned / consumed
                if (!pop.consumeInfo) {
                  pop.consumeInfo = 'Need ' + product;
                }
              }
              resource.owned -= consumed;
              if (resource.owned < 0) {
                resource.owned = 0;
              }
            } else {
              pctSatisfied = 0;
              if (!pop.consumeInfo) {
                pop.consumeInfo = 'Need ' + product;
              }
            }

            currentHappiness += consumeInfo.weight * pctSatisfied;
          }
        }

        let happinessDiff = (currentHappiness - pop.happiness) / 100.0;
        if (Math.abs(happinessDiff) < MIN_HAPPINESS_DELTA) {
          happinessDiff = MIN_HAPPINESS_DELTA;
        }
        pop.happiness += happinessDiff;
        population[popType] = pop;
      }

      return newState;
    default:
      return state;
  }
}
