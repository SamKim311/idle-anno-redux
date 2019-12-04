import { ACTIONS } from '../actions/game';
import BuildingDefinitions from '../data/building-definitions';
import PopulationDefinitions from '../data/population-definitions';

const TIME_FACTOR = 1/60.0;
const TAX_HAPPINESS_FACTOR = 1 / 100.0;
const TAX_HAPPINESS_MINIMUM = 0.01;

export default function(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.TICK:
      const timeIntervalS = payload.tickIntervalSeconds;
      const newState = Object.assign({}, state);
      const warehouse = Object.assign({}, newState.warehouse);
      const resources = Object.assign({}, warehouse.resources);
      const gold = Object.assign({}, resources.gold);
      newState.warehouse = warehouse;
      warehouse.resources = resources;
      resources.gold = gold;

      const financeInfo = {
        maintenanceCost: 0,
        taxRevenue: 0
      }

      // start with Warehouse maintenance
      const warehouseMaintenance = BuildingDefinitions[warehouse.type].upkeep * timeIntervalS * TIME_FACTOR;
      const totalMaintenance = Object.values(state.construction).reduce((sum, construction) => {
        return sum + (BuildingDefinitions[construction.id].upkeep * construction.owned * timeIntervalS * TIME_FACTOR);
      }, warehouseMaintenance);

      const totalTaxes = Object.values(state.population).reduce((sum, population) => {
        let happinessFactor = population.happiness * TAX_HAPPINESS_FACTOR;
        if (happinessFactor < TAX_HAPPINESS_MINIMUM) {
          happinessFactor = TAX_HAPPINESS_MINIMUM;
        }
        return sum + (PopulationDefinitions[population.id].taxRate * population.owned * timeIntervalS * TIME_FACTOR * happinessFactor);
      }, 0);

      financeInfo.maintenanceCost = totalMaintenance;
      financeInfo.taxRevenue = totalTaxes;
      newState.financeInfo = financeInfo;

      gold.owned = gold.owned + totalTaxes - totalMaintenance;

      return newState;
    default:
      return state;
  }
}
