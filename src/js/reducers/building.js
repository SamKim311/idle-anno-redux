import uuidv4 from 'uuid/v4';

import { ACTIONS as CONSTRUCTION_ACTIONS } from '../actions/construction';
import { ACTIONS as GAME_ACTIONS } from '../actions/game';
import { ACTIONS as warehouseActions } from '../actions/warehouse';
import BuildingDefinitions, { BUILDING_CATEGORY } from '../data/building-definitions';

const buildingStatus = {
  AWAITING_RESOURCES: 'AWAITING_RESOURCES',
  WORKING: 'WORKING',
  OUTBOX_FULL: 'OUTBOX_FULL',
  DISABLED: 'DISABLED'
}

const initialProducerState = {
  status: buildingStatus.AWAITING_RESOURCES,
  progress: 0,
  efficiency: 1,
  efficiencyTimer: 0,
  efficiencySupplied: false,
  inbox: {},
  outbox: {}
}

const EFFICIENCY_FACTOR = 1 / 100.0;
const EFFICIENCY_TIMER = 2;
const EFFICIENCY_MINIMUM = 1;
const BASE_EFFICIENCY_MAXIMUM = 100;
export const BASE_IN_OUT_BOX_CAPACITY = 5;

export default function(buildings = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case GAME_ACTIONS.TICK: {
      if (!buildings.owned) {
        return buildings;
      }
      const newState = Object.assign({}, buildings);
      const newOwned = Object.assign({}, newState.owned);
      newState.owned = newOwned;

      const timeIntervalS = payload.tickIntervalSeconds;
      Object.values(buildings.owned).forEach((building) => {
        let updatedBuilding = null;
        if (building.category === BUILDING_CATEGORY.PRODUCER) {
          updatedBuilding = doProductionTick(building, timeIntervalS);
        } else {
          updatedBuilding = building;
        }
        newOwned[updatedBuilding.id] = updatedBuilding;
      });
      return newState;
    }
    case warehouseActions.BUILD_WAREHOUSE:
    case CONSTRUCTION_ACTIONS.CONSTRUCT_BUILDING:
      const buildingToBuild = BuildingDefinitions[payload.toConstruct.id];
      let newBuilding = Object.assign({}, buildingToBuild, {id: uuidv4(), buildingId: payload.toConstruct.id});
      if (buildingToBuild.category === BUILDING_CATEGORY.PRODUCER) {
        newBuilding = Object.assign(newBuilding, initialProducerState);
        initializeInOutBox(newBuilding);
      }
      const newBuildings = Object.assign({}, buildings.owned);
      newBuildings[newBuilding.id] = newBuilding;
      return Object.assign({}, buildings, {owned: newBuildings});
    case CONSTRUCTION_ACTIONS.DESTROY_BUILDING:
      const buildingToDestroy = payload.toDestroy;
      const newOwned = {...buildings.owned};
      delete newOwned[buildingToDestroy.id];
      return {...buildings, owned: newOwned};
    default:
      return buildings;
  }
}

function initializeInOutBox(building) {
  building.inbox = {};
  for (let ingredient of Object.keys(building.consumes)) {
    building.inbox[ingredient] = 0;
  }

  building.outbox = {};
  for (let good of Object.keys(building.produces)) {
    building.outbox[good] = 0;
  }
}

function doProductionTick(building, timeIntervalS) {
  let buildingCopy = Object.assign({}, building);

  if (!canAfford(buildingCopy)) {
    buildingCopy.status = buildingStatus.AWAITING_RESOURCES;
    if (buildingCopy.efficiencySupplied) {
      buildingCopy.efficiencySupplied = false;
      buildingCopy.efficiencyTimer = 0;
    }
    buildingCopy = progressEfficiency(buildingCopy, timeIntervalS);

    return buildingCopy;
  }

  if (!outboxHasRoom(buildingCopy)) {
    buildingCopy.status = buildingStatus.OUTBOX_FULL;
    if (buildingCopy.efficiencySupplied) {
      buildingCopy.efficiencySupplied = false;
      buildingCopy.efficiencyTimer = 0;
    }
    buildingCopy = progressEfficiency(buildingCopy, timeIntervalS);

    return buildingCopy;
  }

  buildingCopy.status = buildingStatus.WORKING;
  if (!buildingCopy.efficiencySupplied) {
    buildingCopy.efficiencySupplied = true;
    buildingCopy.efficiencyTimer = 0;
  }
  buildingCopy = progressEfficiency(buildingCopy, timeIntervalS);

  buildingCopy.progress += timeIntervalS * buildingCopy.efficiency * EFFICIENCY_FACTOR;
  if (buildingCopy.progress > buildingCopy.produceTime) {
    buildingCopy.progress -= buildingCopy.produceTime;
    let inboxCopy = Object.assign({}, buildingCopy.inbox);
    let outboxCopy = Object.assign({}, buildingCopy.outbox);

    for (let [ingredient, consumed] of Object.entries(buildingCopy.consumes)) {
      inboxCopy[ingredient] -= consumed;
    }

    for (let [good, produced] of Object.entries(buildingCopy.produces)) {
      outboxCopy[good] += produced;
    }

    buildingCopy.inbox = inboxCopy;
    buildingCopy.outbox = outboxCopy;
  }

  return buildingCopy;
}

function canAfford(building) {
  for (let [ingredient, consumed] of Object.entries(building.consumes)) {
    if (building.inbox[ingredient] < consumed) {
      return false;
    }
  }
  return true;
}

function outboxHasRoom(building) {
  for (let [good, produced] of Object.entries(building.produces)) {
    let outboxGood = building.outbox[good];
    if (outboxGood + produced > BASE_IN_OUT_BOX_CAPACITY) {
      return false;
    }
  }
  return true;
}

function progressEfficiency(building, timeIntervalS) {
  building.efficiencyTimer += timeIntervalS;
  if (building.efficiencyTimer > EFFICIENCY_TIMER) {
    building.efficiencyTimer -= EFFICIENCY_TIMER;
    if (building.efficiencySupplied) {
      // efficiency going up
      building.efficiency = Math.min(BASE_EFFICIENCY_MAXIMUM, building.efficiency + 1);
    } else {
      // efficiency going down
      building.efficiency = Math.max(EFFICIENCY_MINIMUM, building.efficiency - 1);
    }
  }
  return building;
}
