import { ACTIONS } from '../actions/warehouse';
import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS as constructionActions } from '../actions/construction';
import { ACTIONS as housingActions } from '../actions/housing';
import { ACTIONS as tradeActions } from '../actions/trade';
import { ACTIONS as foreignTradeActions } from '../actions/foreign-trade';
import BuildingDefinitions from '../data/building-definitions';
import Resources from '../data/resource-definitions';

const resourceDecorations = {
  reserved: 0,
  pending: 0
}

const initResourceState = {
  owned: 0,
  unlocked: false
}

export default function(warehouse = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case gameActions.INIT: {
      const warehouseCopy = Object.assign({}, warehouse);
      const resources = {...warehouseCopy.resources};

      // Add each resource and add it to the warehouse if not already added
      Object.keys(Resources).forEach(resourceId => {
        if (!resources.hasOwnProperty(resourceId)) {
          resources[resourceId] = {...initResourceState, id: resourceId};
        }
      });

      // go through each resource and add the decorator, because I don't wanna copy and paste it a billion times
      const newResources = Object.entries(resources).reduce((accumulator, [resourceId, resource]) => {
        const newResource = Object.assign({}, resource, resourceDecorations);
        accumulator[resourceId] = newResource;
        return accumulator;
      }, resources);
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
    case ACTIONS.UPDGRADE_WAREHOUSE: {
      const warehouseCopy = Object.assign({}, warehouse);
      const currentWarehouse = BuildingDefinitions[warehouse.type];
      const nextWarehouse = BuildingDefinitions[currentWarehouse.upgradesTo];
      if (!nextWarehouse) {
        return warehouse;
      }

      const cost = currentWarehouse.upgradeCost;
      const newResources = deductCost(warehouseCopy.resources, cost);
      warehouseCopy.resources = newResources;

      warehouseCopy.totalCapacity += nextWarehouse.capacity;
      warehouseCopy.type = BuildingDefinitions[warehouse.type].upgradesTo;

      return warehouseCopy;
    }
    case ACTIONS.UPGRADE_STOREHOUSE: {
      const warehouseCopy = Object.assign({}, warehouse);
      const currentWarehouse = BuildingDefinitions[payload.toUpgrade.buildingId];
      const nextWarehouse = BuildingDefinitions[currentWarehouse.upgradesTo];
      if (!nextWarehouse) {
        return warehouse;
      }

      const cost = currentWarehouse.upgradeCost;
      const newResources = deductCost(warehouseCopy.resources, cost);
      warehouseCopy.resources = newResources;

      warehouseCopy.totalCapacity += nextWarehouse.capacity;

      return warehouseCopy;
    }
    case tradeActions.DISMISS_TRADER: {
      const cost = payload.cost;
      const updatedResources = deductCost(warehouse.resources, cost);
      return {...warehouse, resources: updatedResources};
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
    case foreignTradeActions.CONFIRM: {
      const balance = payload.cost;

      const resources = {...warehouse.resources};

      const gold = {...warehouse.resources.gold};
      gold.owned += balance;

      const toLoad = payload.toLoad;
      Object.entries(toLoad).forEach(([resourceId, amount]) => {
        if (!resources[resourceId]) {
          console.error(resourceId + ' not found in the warehouse');
          return;
        }

        const resource = {...resources[resourceId]};
        resource.owned -= amount;
        resources[resourceId] = resource;
      });

      const toUnload = payload.toUnload;
      Object.entries(toUnload).forEach(([resourceId, amount]) => {
        if (!resources[resourceId]) {
          console.error(resourceId + ' not found in the warehouse');
          return;
        }

        const resource = {...resources[resourceId]};
        resource.owned += amount;
        resources[resourceId] = resource;
      });

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
