import uuidv4 from 'uuid/v4';

import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS as warehouseActions } from '../actions/warehouse';
import { ACTIONS as constructionActions } from '../actions/construction';
import BuildingDefinitions, { BUILDING_CATEGORY } from '../data/building-definitions';
import { BASE_IN_OUT_BOX_CAPACITY } from './building';

const courierState = {
  IDLE: 'IDLE',
  PICKING_UP: 'PICKING_UP',
  EN_ROUTE: 'EN_ROUTE',
  DROPPING_OFF: 'DROPPING_OFF'
}

const BASE_TRAVEL_TIME_SECONDS = 20;
const BASE_PICK_UP_DROP_OFF_TIME_SECONDS = 8;

const initCourier = {
  status: courierState.IDLE,
  progress: 0,
  timeThreshold: 0,
  jobDescription: {},
  payload: {},
  markedForDeath: false
}

export default function(state = {}, action) {
  const payload = action.payload;
  const couriers = state.couriers;
  if (!couriers) {
    return state;
  }
  switch(action.type) {
    case gameActions.INIT:
      const startingWarehouse = BuildingDefinitions[state.warehouse.type];
      const courierArrayCopy = couriers.couriers.slice(0);
      addCouriers(courierArrayCopy, startingWarehouse.couriers);
      const courierObjCopy = Object.assign({}, couriers);
      courierObjCopy.couriers = courierArrayCopy;
      return Object.assign({}, state, {couriers: courierObjCopy});
    case warehouseActions.UPGRADE_STOREHOUSE: {
      const thisWarehouse = BuildingDefinitions[payload.toUpgrade.buildingId]
      const nextWarehouse = BuildingDefinitions[thisWarehouse.upgradesTo];
      const couriersToAdd = nextWarehouse.couriers - thisWarehouse.couriers;
      const courierList = [...state.couriers.couriers];
      addCouriers(courierList, couriersToAdd);
      const courierState = {...state.couriers, couriers: courierList};
      return {...state, couriers: courierState};
    }
    case warehouseActions.UPDGRADE_WAREHOUSE: {
      const nextWarehouse = BuildingDefinitions[payload.toUpgrade].upgradesTo;
      const courierList = [...state.couriers.couriers];
      addCouriers(courierList, nextWarehouse.couriers);
      const courierState = {...state.couriers, couriers: courierList};
      return {...state, couriers: courierState};
    }
    case warehouseActions.BUILD_WAREHOUSE: {
      const builtWarehouse = BuildingDefinitions[payload.toConstruct.id];
      const addedCouriers = builtWarehouse.couriers;
      const newState = Object.assign({}, state);
      const newCouriers = Object.assign({}, newState.couriers);
      newState.couriers = newCouriers;
      const newArray = newCouriers.couriers.slice(0);
      addCouriers(newArray, addedCouriers);
      newCouriers.couriers = newArray;
      return newState;
    }
    case constructionActions.DESTROY_BUILDING: {
      const toDestroy = BuildingDefinitions[payload.toDestroy.buildingId];
      if (toDestroy.category !== BUILDING_CATEGORY.WAREHOUSE) {
        return state;
      }

      const courierList = [...state.couriers.couriers];
      const couriers = {...state.couriers, couriers: courierList};
      const newState = {...state, couriers: couriers};

      const couriersToRemove = toDestroy.couriers;
      let couriersRemoved = 0;

      // try to find a courier that's idle
      for (let courierIndex = 0; courierIndex < courierList.length; courierIndex++) {
        const courier = courierList[courierIndex];
        if (courier.status === courierState.IDLE && !courier.markmarkedForDeath) {
          courierList.splice(courierIndex, 1);
          couriersRemoved++;
          if (couriersRemoved === couriersToRemove) {
            return newState;
          }
        }
      }

      // if not, mark the last one for death that isn't already marked
      for (let courierIndex = courierList.length-1; courierIndex >= 0; courierIndex--) {
        const courier = courierList[courierIndex];
        if (!courier.markmarkedForDeath) {
          courier.markedForDeath = true;
          couriersRemoved++;
          if (couriersRemoved === couriersToRemove) {
            return newState;
          }
        }
      }

      // no idle couriers, and all active ones are already marked for death so...uh...
      return newState;
    }
    case gameActions.TICK: {
      const stateCopy = Object.assign({}, state);
      const couriersCopy = Object.assign({}, stateCopy.couriers);
      const warehouse = Object.assign({}, stateCopy.warehouse);
      const warehouseMax = warehouse.totalCapacity;
      const resources = Object.assign({}, warehouse.resources);
      warehouse.resources = resources;
      const buildings = Object.assign({}, stateCopy.buildings);
      const buildingRefCopy = Object.assign({}, buildings.owned);
      buildings.owned = buildingRefCopy;
      stateCopy.warehouse = warehouse;
      stateCopy.buildings = buildings;
      stateCopy.couriers = couriersCopy;

      // add new jobs
      const newJobs = findJobs(couriers, warehouse, buildingRefCopy);
      let jobArrayCopy = couriers.jobQueue.slice(0).concat(newJobs.jobList);
      const jobRefCopy = Object.assign({}, couriers.jobQueueMap, newJobs.jobRef);

      // if any couriers are available, pick from the top of the queue
      const courierListCopy = couriersCopy.couriers.map((courier) => {
        if (courier.status === courierState.IDLE) {
          const newCourier = Object.assign({}, courier);

          let nextJobIndex = getNextAvailableJob(jobArrayCopy, buildingRefCopy);
          const nextJob = jobArrayCopy[nextJobIndex];
          jobArrayCopy = jobArrayCopy.slice(nextJobIndex+1);
          if (!nextJob) {
            return courier;
          }

          const pickupFromId = nextJob.from;
          const deliverToId = nextJob.to;
          const good = nextJob.carrying;
          let pickupFrom = null;
          let deliverTo = null;
          let amount = 0;

          if (pickupFromId !== 'warehouse') {
            pickupFrom = buildings.owned[pickupFromId];
          } else {
            pickupFrom = warehouse;
          }

          if (deliverToId !== 'warehouse') {
            deliverTo = buildings.owned[deliverToId];
          } else {
            deliverTo = warehouse;
          }

          if (pickupFromId === 'warehouse') {
            const inboxRoom = BASE_IN_OUT_BOX_CAPACITY - deliverTo.inbox[good];
            const currentSupply = Math.floor(resources[good].owned - resources[good].reserved);
            amount = Math.min(inboxRoom, currentSupply);
            const resourceCopy = Object.assign({}, resources[good]);
            resourceCopy.reserved += amount;
            resources[good] = resourceCopy;
          } else {
            const currentOutbox = pickupFrom.outbox[good];
            const warehouseRoom = Math.floor(warehouseMax - resources[good].owned - resources[good].pending);
            amount = Math.min(currentOutbox, warehouseRoom);
            const resourceCopy = Object.assign({}, resources[good]);
            resourceCopy.pending += amount;
            resources[good] = resourceCopy;
          }

          nextJob.amount = amount;

          newCourier.status = courierState.PICKING_UP;
          newCourier.timeThreshold = BASE_PICK_UP_DROP_OFF_TIME_SECONDS;
          newCourier.jobDescription = nextJob;

          return newCourier;
        } else {
          return courier;
        }
      });

      couriersCopy.jobQueue = jobArrayCopy;
      couriersCopy.jobQueueMap = jobRefCopy;

      // work the couriers already on the job (look into merging with the map function up above)
      const progressedCouriers = courierListCopy.map((courier) => {
        if (courier.status === courierState.IDLE) {
          return courier;
        }

        courier.progress += payload.tickIntervalSeconds;
        if (courier.progress >= courier.timeThreshold) {
          courier.progress -= courier.timeThreshold;
          const jobDescription = courier.jobDescription;
          const fromId = jobDescription.from;
          const toId = jobDescription.to;
          const product = jobDescription.carrying;
          const amount = jobDescription.amount;
          let pickupFrom = null;
          let deliverTo = null;

          if (fromId !== 'warehouse') {
            if (buildingRefCopy.hasOwnProperty(fromId)) {
              pickupFrom = Object.assign({}, buildingRefCopy[fromId]);
              buildingRefCopy[fromId] = pickupFrom;
            }
          } else {
            pickupFrom = warehouse;
          }

          if (toId !== 'warehouse') {
            if (buildingRefCopy.hasOwnProperty(toId)) {
              deliverTo = Object.assign({}, buildingRefCopy[toId]);
              buildingRefCopy[toId] = deliverTo;
            }
          } else {
            deliverTo = warehouse;
          }

          switch (courier.status) {
            case courierState.PICKING_UP: {
              const payload = Object.assign({}, courier.payload);
              courier.payload = payload;

              if (fromId === 'warehouse') {
                const resourceToTake = Object.assign({}, resources[product]);
                resources[product] = resourceToTake;
                resourceToTake.owned -= amount;
                resourceToTake.reserved -= amount;
                payload[product] = amount;
              } else {
                if (!pickupFrom) { // building got deleted...
                  courier.payload = {};
                  courier.status = courierState.IDLE;
                  courier.jobDescription = {};
                  courier.progress = 0;
                  courier.timeThreshold = 0;

                  delete jobRefCopy[courier.jobDescription.id];
                  break;
                }
                const outbox = Object.assign({}, pickupFrom.outbox);
                pickupFrom.outbox = outbox;
                outbox[product] -= amount;
                payload[product] = amount;
                delete jobRefCopy[courier.jobDescription.id];
              }

              courier.status = courierState.EN_ROUTE;
              courier.timeThreshold = BASE_TRAVEL_TIME_SECONDS;
              break;
            }
            case courierState.EN_ROUTE:
              courier.status = courierState.DROPPING_OFF;
              courier.timeThreshold = BASE_PICK_UP_DROP_OFF_TIME_SECONDS;
              break;
            case courierState.DROPPING_OFF: {
              // drop off goods
              const payload = Object.assign({}, courier.payload);

              if (toId === 'warehouse') {
                const resourceToDeliver = Object.assign({}, resources[product]);
                resources[product] = resourceToDeliver;
                resourceToDeliver.owned += payload[product];
                resourceToDeliver.pending -= amount;
              } else {
                if (!deliverTo) { // building got deleted...
                  // return to warehouse
                  const resourceToDeliver = Object.assign({}, resources[product]);
                  resources[product] = resourceToDeliver;
                  resourceToDeliver.owned += payload[product];
                } else {
                  const inbox = Object.assign({}, deliverTo.inbox);
                  deliverTo.inbox = inbox;
                  inbox[product] += amount;
                }
                delete jobRefCopy[courier.jobDescription.id];
              }

              courier.payload = {};
              courier.status = courierState.IDLE;
              courier.jobDescription = {};
              courier.progress = 0;
              courier.timeThreshold = 0;
              break;
            }
            default:
              break;
          }
        }
        return courier;
      });

      // check for any idle couriers marked for death
      const killedCouriers = courierListCopy.filter((courier) => courier.status !== courierState.IDLE || !courier.markedForDeath);

      couriersCopy.couriers = killedCouriers;

      stateCopy.couriers = couriersCopy;
      return stateCopy;
    }
    default:
      return state;
  }
}

function addCouriers(courierArray, numToAdd) {
  for (let i=0; i<numToAdd; i++) {
    const newCourier = Object.assign({}, initCourier, {id: uuidv4()});
    courierArray.push(newCourier);
  }
}

const SUPPLY_SUFFIX = '_SUPPLY';
const PICKUP_SUFFIX = '_PICKUP';
function findJobs(courier, warehouse, buildings) {
  const existingJobs = courier.jobQueueMap;
  const warehouseMax = warehouse.totalCapacity;
  const resources = warehouse.resources;

  // check buildings that need input fed
  const supplies = {
    jobList: [],
    jobRef: {}
  }
  for (let building of Object.values(buildings)) {
    const buildingInfo = BuildingDefinitions[building.buildingId];
    if (buildingInfo.category !== BUILDING_CATEGORY.PRODUCER) {
      continue;
    }
    for (let [ingredient, amount] of Object.entries(building.inbox)) {
      const supplyKey = building.id + '_' + ingredient + '_' + SUPPLY_SUFFIX;
      if (amount < BASE_IN_OUT_BOX_CAPACITY && !existingJobs[supplyKey]) {
        const resource = resources[ingredient];
        const supplyRemaining = Math.floor(resource.owned - resource.reserved);
        if (supplyRemaining > 0) {
          const newJob = {
            id: supplyKey,
            from: 'warehouse',
            to: building.id,
            carrying: ingredient
          };
          supplies.jobList.push(newJob);
          supplies.jobRef[supplyKey] = newJob;
        }
      }
    }
  }

  // check buildings that need outbox picked up
  const pickups = Object.values(buildings).reduce((accumulator, building) => {
    const buildingInfo = BuildingDefinitions[building.buildingId];
    if (buildingInfo.category !== BUILDING_CATEGORY.PRODUCER) {
      return accumulator;
    }
    for (let [product, amount] of Object.entries(building.outbox)) {
      const pickupKey = building.id + PICKUP_SUFFIX;
      if (amount > 0 && !existingJobs[pickupKey]) {
        const resource = resources[product];
        const spaceRemaining = Math.floor(warehouseMax - resource.owned - resource.pending);
        if (spaceRemaining > 0) {
          const newJob = {
            id: pickupKey,
            from: building.id,
            to: 'warehouse',
            carrying: product
          };
          accumulator.jobList.push(newJob);
          accumulator.jobRef[pickupKey] = newJob;
        }
      }
    }
    return accumulator;
  }, {jobList: [], jobRef: {}});

  const jobList = supplies.jobList.concat(pickups.jobList);
  const jobRefs = Object.assign({}, supplies.jobRef, pickups.jobRef);
  return {jobList: jobList, jobRef: jobRefs}; // TODO, this will need to be changed to include supply jobs
}

// The way a job is invalid is if one of the buildings has since been destroyed
function getNextAvailableJob(jobArray, buildings) {
  for (let jobIndex = 0; jobIndex < jobArray.length; jobIndex++) {
    const nextJob = jobArray[jobIndex];

    const pickupFromId = nextJob.from;
    const deliverToId = nextJob.to;

    if (pickupFromId !== 'warehouse' && !buildings.hasOwnProperty(pickupFromId)) {
      continue;
    }

    if (deliverToId !== 'warehouse' && !buildings.hasOwnProperty(deliverToId)) {
      continue;
    }

    return jobIndex;
  }
}
