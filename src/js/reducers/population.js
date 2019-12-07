import { ACTIONS as housingActions } from '../actions/housing';
import { ACTIONS as gameActions } from '../actions/game';
import BuildingDefinitions from '../data/building-definitions';

const POP_ASCENSION_HAPPINESS_THRESHOLD = 97;

const initValues = {
  owned: 0,
  maxPopulation: 0,
  happiness: 0,
  canAscend: false,
  consumeInfo: ''
}

const beggarValues = {
  owned: 0,
  maxPopulation: 0,
  happiness: 0,
  unhoused: 0,
  beggarTimer: 0
}

export default function(populationState = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case gameActions.INIT: {
      const newState = Object.assign({}, populationState);

      for (let [popType, pop] of Object.entries(newState)) {
        if (popType === 'beggar') {
          newState[popType] = {...beggarValues, ...pop};
        } else {
          const newPop = Object.assign({}, pop, initValues);
          newState[popType] = newPop;
        }
      }

      return newState;
    }
    case housingActions.BUILD_HOUSE: {
      const houseBuilt = BuildingDefinitions[payload.toConstruct.id];
      const newState = Object.assign({}, populationState);

      const modifiedPop = Object.assign({}, newState[houseBuilt.populationCategory]);
      newState[modifiedPop.id] = modifiedPop;

      modifiedPop.maxPopulation += houseBuilt.populationCap;

      return newState;
    }
    case gameActions.TICK: {
      const population = Object.assign({}, populationState);
      const timeIntervalS = payload.tickIntervalSeconds;

      for (let [popType, pop] of Object.entries(population)) {
        if (pop.happiness > POP_ASCENSION_HAPPINESS_THRESHOLD && pop.owned === pop.maxPopulation) {
          population[popType] = { ...pop, canAscend: true };
        } else {
          population[popType] = { ...pop, canAscend: false}
        }
      }

      return population;
    }
    case housingActions.ASCEND_HOUSE: {
      const currentHouse = BuildingDefinitions[payload.fromHouse];
      const nextHouse = BuildingDefinitions[currentHouse.ascendsTo];

      const oldPop = {...populationState[currentHouse.populationCategory]};
      const nextPop = {...populationState[nextHouse.populationCategory]};

      oldPop.owned -= currentHouse.populationCap;
      nextPop.owned += currentHouse.populationCap;
      oldPop.maxPopulation -= currentHouse.populationCap;
      nextPop.maxPopulation += nextHouse.populationCap;

      const newState = {...populationState, [currentHouse.populationCategory]: oldPop, [nextHouse.populationCategory]: nextPop};

      // adjust max beggar population
      const maxBeggars = calculateBeggarCount(newState);
      newState['beggar'] = {...newState['beggar'], maxPopulation: maxBeggars};

      return newState;
    }
    default:
      return populationState;
  }
};

function calculateBeggarCount(population) {
  return Math.floor(population['citizen'].maxPopulation * 0.1);
}
