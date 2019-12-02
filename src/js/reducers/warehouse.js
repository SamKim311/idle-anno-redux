import { ACTIONS } from '../actions/warehouse';
import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS as constructionActions } from '../actions/construction';
import { ACTIONS as housingActions } from '../actions/housing';
import { ACTIONS as tradeActions } from '../actions/trade';
import BuildingDefinitions from './building-definitions';

const resourceDecorations = {
  reserved: 0,
  pending: 0
}

export default function(warehouse = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case gameActions.INIT: {
      // go through each resource and add the decorator, because I don't wanna copy and paste it a billion times
      const warehouseCopy = Object.assign({}, warehouse);
      const newResources = Object.entries(warehouseCopy.resources).reduce((accumulator, [resourceId, resource]) => {
        const newResource = Object.assign({}, resource, resourceDecorations);
        accumulator[resourceId] = newResource;
        return accumulator;
      }, {});
      warehouseCopy.resources = newResources;
      return warehouseCopy;
    }
    case housingActions.BUILD_HOUSE:
    case housingActions.ASCEND_HOUSE:
    case constructionActions.CONSTRUCT_BUILDING: {
      const warehouseCopy = Object.assign({}, warehouse);
      let cost = payload.toConstruct.cost;
      let newResources = deductCost(warehouseCopy.resources, cost);
      warehouseCopy.resources = newResources;
      return warehouseCopy;
    }
    case ACTIONS.BUILD_WAREHOUSE: {
      const warehouseCopy = Object.assign({}, warehouse);
      let cost = payload.toConstruct.cost;
      let newResources = deductCost(warehouseCopy.resources, cost);
      warehouseCopy.resources = newResources;

      const warehouseToBuild = BuildingDefinitions[payload.toConstruct.id];

      warehouseCopy.totalCapacity += warehouseToBuild.capacity;

      return warehouseCopy;
    }
    case tradeActions.BUY_GOODS: {
      const good = payload.product;
      const amount = payload.amount;
      const atPrice = payload.atPrice;

      const gold = {...warehouse.resources.gold};
      gold.owned -= amount * atPrice;

      const goodBought = {...warehouse.resources[good]};
      goodBought.owned += amount;

      const resources = {...warehouse.resources, gold: gold, [good]: goodBought};
      return {...warehouse, resources: resources};
    }
    case tradeActions.SELL_GOODS: {
      const good = payload.product;
      const amount = payload.amount;
      const atPrice = payload.atPrice;

      const gold = {...warehouse.resources.gold};
      gold.owned += amount * atPrice;

      const goodBought = {...warehouse.resources[good]};
      goodBought.owned -= amount;

      const resources = {...warehouse.resources, gold: gold, [good]: goodBought};
      return {...warehouse, resources: resources};
    }
    default:
      return warehouse;
  }
}

function deductCost(resources, cost) {
  let resourceCopy = Object.assign({}, resources);
  for (let [ingredient, amount] of Object.entries(cost)) {
    let ingredientCopy = Object.assign({}, resourceCopy[ingredient]);
    ingredientCopy.owned -= amount;
    resourceCopy[ingredient] = ingredientCopy;
  }
  return resourceCopy;
}
