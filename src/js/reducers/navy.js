import uuidv4 from 'uuid/v4';
import { ACTIONS as gameActions } from '../actions/game';
import { ACTIONS as actions } from '../actions/navy';
import { ACTIONS as foreignTradeActions } from '../actions/foreign-trade';
import Boats from '../data/ship-definitions';
import { travelTimes } from '../data/island-info';

const boatTemplate = {
  cargo: {}
}

const fleetTemplate = {
  currentLocation: 'home',
  currentDestination: null,
  destinationTimer: 0,
  travelProgress: 0,
  ships: []
}

export default function(navy = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case gameActions.INIT: {
      const flagship = {
        ...boatTemplate,
        id: uuidv4(),
        typeName: 'flagship',
        currentHp: Boats['flagship'].hp,
        name: 'Flagship'
      }
      const ships = {
        [flagship.id]: flagship
      };
      const fleetId = uuidv4();
      const fleets = {
        [fleetId]: {
          ...fleetTemplate,
          id: fleetId,
          name: 'Fleet 1',
          ships: [flagship.id]
        }
      };
      const dockBuildings = {};
      return {
        ships: ships,
        fleets: fleets,
        dockBuildings: dockBuildings
      };
    }
    case actions.EMBARK: {
      if (!payload.destination || payload.destination === navy.currentLocation) {
        return navy;
      }

      const departingFleet = {...navy.fleets[payload.fleetId]};

      if (!navy.fleets[payload.fleetId] || departingFleet.currentDestination) {
        return navy;
      }

      const travelTime = travelTimes[departingFleet.currentLocation][payload.destination];

      departingFleet.currentDestination = payload.destination;
      departingFleet.destinationTimer = travelTime;

      const fleets = {...navy.fleets, [payload.fleetId]: departingFleet };
      return {...navy, fleets: fleets};
    }
    case gameActions.TICK: {
      const timeIntervalS = payload.tickIntervalSeconds;

      // go through each fleet and update its travel progress
      const fleets = {};
      Object.entries(navy.fleets).forEach(([fleetId, fleet]) => {
        if (!fleet.currentDestination) {
          fleets[fleetId] = fleet;
          return;
        }

        const fleetCopy = {...fleet};
        const fleetSpeed = findFleetSpeed(fleetCopy.ships, navy.ships);
        fleetCopy.travelProgress += timeIntervalS * fleetSpeed;
        if (fleetCopy.travelProgress >= fleetCopy.destinationTimer) {
          fleetCopy.travelProgress = 0;
          fleetCopy.destinationTimer = 0;
          fleetCopy.currentLocation = fleetCopy.currentDestination;
          fleetCopy.currentDestination = null;
        }

        fleets[fleetId] = fleetCopy;
      });

      return {...navy, fleets: fleets};
    }
    case foreignTradeActions.CONFIRM: {
      const updatedFleet = {...navy.fleets[payload.fleetId]};
      const ships = {...navy.ships};

      const toUnload = payload.toUnload;
      Object.entries(toUnload).forEach(([resource, amount]) => {
        let toRemove = amount;
        updatedFleet.ships.forEach(shipId => {
          const ship = {...ships[shipId]};
          if (toRemove > 0 && ship.cargo.hasOwnProperty(resource)) {
            ships[shipId] = ship;
            const cargo = {...ship.cargo};
            ship.cargo = cargo;
            const amountOnBoard = cargo[resource];
            if (amountOnBoard > toRemove) {
              cargo[resource] -= toRemove;
              toRemove = 0;
            } else {
              toRemove -= cargo[resource];
              delete cargo[resource];
            }
          }
        });
      });

      const toLoad = payload.toLoad;
      Object.entries(toLoad).forEach(([resource, amount]) => {
        let toLoad = amount;
        updatedFleet.ships.forEach(shipId => {
          const ship = {...ships[shipId]};
          const cargo = {...ship.cargo};
          const currentCapacity = findUsedCapacity(cargo);
          const maxCapacity = Boats[ship.typeName].capacity;
          if (currentCapacity < maxCapacity && toLoad > 0) {
            const actualLoaded = Math.min(toLoad, maxCapacity - currentCapacity);
            if (!cargo.hasOwnProperty(resource)) {
              cargo[resource] = 0;
            }
            cargo[resource] += actualLoaded;
            toLoad -= actualLoaded;

            ship.cargo = cargo;
            ships[shipId] = ship;
          }
        });
      });

      return {...navy, fleets: {...navy.fleets, [payload.fleetId]: updatedFleet}, ships: ships};
    }
  }
  return navy;
}

function findFleetSpeed(shipIds, ships) {
  let fleetSpeed = null;
  shipIds.forEach(shipId => {
    // currently, just the listed speed
    const listedSpeed = Boats[ships[shipId].typeName].speed;
    if (!fleetSpeed || fleetSpeed > listedSpeed) {
      fleetSpeed = listedSpeed;
    }
  });
  return fleetSpeed;
}

function findUsedCapacity(cargo) {
  return Object.values(cargo).reduce((sum, amount) => {
    return sum + amount;
  }, 0);
}