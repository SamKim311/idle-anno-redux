import { ACTIONS } from '../actions/game';
import { unlockThresholds, unlocks } from '../data/level-up-definitions'

export default function(state = {}, action) {
  switch (action.type) {
    case ACTIONS.TICK: {
      const [unlockPopType, popRequired] = unlockThresholds[state.island.level - 1];
      const currentPop = state.population[unlockPopType].owned;
      if (currentPop >= popRequired) {
        const newState = Object.assign({}, state);
        const island = Object.assign({}, newState.island);
        newState.island = island;
        island.level++;

        const unlocked = unlocks[island.level - 1];
        if (unlocked.title) {
          island.title = unlocked.title;
        }
        if (unlocked.buildings) {
          const constructions = Object.assign({}, newState.construction);
          newState.construction = constructions;
          unlocked.buildings.forEach(conId => {
            const construction = Object.assign({}, constructions[conId]);
            construction.unlocked = true;
            constructions[conId] = construction;
          });
        }
        if (unlocked.resources) {
          const warehouse = Object.assign({}, newState.warehouse);
          const resources = Object.assign({}, warehouse.resources);
          newState.warehouse = warehouse;
          warehouse.resources = resources;
          unlocked.resources.forEach(resId => {
            const resource = Object.assign({}, resources[resId]);
            resources[resId] = resource;
            resource.unlocked = true;
          });
        }
        if (unlocked.population) {
          const population = Object.assign({}, newState.population);
          newState.population = population;
          const popUnlocked = Object.assign({}, population[unlocked.population]);
          popUnlocked.unlocked = true;
          population[unlocked.population] = popUnlocked;
        }
        if (unlocked.housing) {
          const types = {...newState.housing.types}
          const housing = {...newState.housing, types: types};
          newState.housing = housing;
          unlocked.housing.forEach(houseId => {
            const unlockedHouse = {...types[houseId], unlocked: true};
            types[houseId] = unlockedHouse;
          });
        }

        return newState;
      }
      return state;
    }
    default:
      return state;
  }
}
