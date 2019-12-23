import { ACTIONS } from '../actions/foreign-trade';
import Islands from '../data/island-info';
import Ships from '../data/ship-definitions';
import Resources from '../data/resource-definitions';

const INITIAL_STATE = {
  toLoad: {},
  toUnload: {},
  warehouseMaximum: 0,
  inventory: {},
  cargoMaximum: 0,
  cargo: {},
  cargoUsed: 0,
  dockId: null,
  balance: 0
};

export default function (state = INITIAL_STATE, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.SETUP: {
      const backup = backupState(state);
      const cargoCapacity = getCargoMaximum(payload.ships);
      const cargoManifest = compileCargo(payload.ships);
      const cargoUsed = Object.values(cargoManifest).reduce((sum, cargo) => sum + cargo, 0);
      if (payload.dockId === state.dockId) {
        // visiting the same dock consecutively, just update the ships (just in case)
        let inventory = state.inventory;
        if (payload.dockId === 'home') {
          // update inventory too
          const warehouseInfo = payload.warehouse;
          inventory = setUpHomeInventory(warehouseInfo.resources);
        }
        return {
          ...state,
          inventory: inventory,
          cargoMaximum: cargoCapacity,
          cargo: cargoManifest,
          cargoUsed: cargoUsed,
          backupState: backup
        };
      }

      const islandInfo = Islands[payload.dockId];
      let warehouseMax = 0;
      let inventory = {};
      if (payload.dockId === 'home') {
        const warehouseInfo = payload.warehouse;
        warehouseMax = warehouseInfo.totalCapacity;
        inventory = setUpHomeInventory(warehouseInfo.resources);
      } else {
        warehouseMax = calculateWarehouseMax(payload.playerLevel);
        inventory = setUpInventory(islandInfo, warehouseMax);
      }

      return {
        toLoad: {},
        toUnload: {},
        warehouseMaximum: warehouseMax,
        inventory: inventory,
        cargoMaximum: cargoCapacity,
        cargo: cargoManifest,
        cargoUsed: cargoUsed,
        dockId: payload.dockId,
        backupState: backup,
        balance: 0
      }
    }
    case ACTIONS.ONLOAD: {
      const resource = payload.resourceId;
      if (!resource) {
        return state;
      }
      let amount = payload.amount;
      if (amount === 'max') {
        amount = state.inventory[resource].onHand;
      }
      const availableCargo = state.cargoMaximum - state.cargoUsed;
      const availableOnhand = state.inventory[resource].onHand;
      amount = Math.min(amount, availableCargo, availableOnhand);
      if (isNaN(amount)) {
        return state;
      }

      const toUnload = {...state.toUnload};
      let remainder = 0;
      if (toUnload.hasOwnProperty(resource)) {
        toUnload[resource] -= amount;
        if (toUnload[resource] < 0) {
          remainder += toUnload[resource];
          toUnload[resource] = 0;
        }
      } else {
        remainder = amount;
      }

      const toLoad = {...state.toLoad};

      if (toLoad.hasOwnProperty(resource)) {
        toLoad[resource] += remainder;
      } else {
        toLoad[resource] = remainder;
      }

      const cargo = {...state.cargo};
      if (cargo.hasOwnProperty(resource)) {
        cargo[resource] += amount;
      } else {
        cargo[resource] = amount;
      }

      const inventory = {...state.inventory};
      const onloaded = {...inventory[resource]};
      onloaded.onHand -= amount;
      inventory[resource] = onloaded;

      const cargoUsed = state.cargoUsed + amount;

      const balance = calculateBalance(toLoad, toUnload, inventory, state.dockId);

      return {...state, cargoUsed: cargoUsed, toLoad: toLoad, toUnload: toUnload, cargo: cargo, inventory: inventory, balance: balance};
    }
    case ACTIONS.OFFLOAD: {
      const resource = payload.resourceId;
      if (!resource) {
        return state;
      }
      let amount = payload.amount;
      if (amount === 'max') {
        amount = state.cargo[resource];
      }
      const availableWarehouse = state.warehouseMaximum - state.inventory[resource].onHand;
      amount = Math.min(amount, availableWarehouse, state.cargo[resource]);
      if (isNaN(amount)) {
        return state;
      }

      const toLoad = {...state.toLoad};
      let remainder = 0;
      if (toLoad.hasOwnProperty(resource)) {
        toLoad[resource] -= amount;
        if (toLoad[resource] < 0) {
          remainder += -toLoad[resource];
          toLoad[resource] = 0;
        }
      } else {
        remainder = amount;
      }

      const cargo = {...state.cargo};
      cargo[resource] -= amount;

      const toUnload = {...state.toUnload};

      if (toUnload.hasOwnProperty(resource)) {
        toUnload[resource] += remainder;
      } else {
        toUnload[resource] = remainder;
      }

      const inventory = {...state.inventory};
      const offloaded = {...inventory[resource]};
      offloaded.onHand += amount;
      inventory[resource] = offloaded;

      const cargoUsed = state.cargoUsed - amount;

      const balance = calculateBalance(toLoad, toUnload, inventory, state.dockId);

      return {...state, cargoUsed: cargoUsed, toLoad: toLoad, toUnload: toUnload, cargo: cargo, inventory: inventory, balance: balance};
    }
    case ACTIONS.CANCEL: {
      return {...state.backupState, backupState: {}};
    }
    case ACTIONS.CONFIRM: {
      return {...state, toLoad: {}, toUnload: {}, balance: 0};
    }
    default: {
      return state;
    }
  }
}

function backupState(state) {
  const inventoryBackup = {};
  Object.entries(state.inventory).forEach(([resource, inv]) => {
    inventoryBackup[resource] = {...inv};
  });
  return {...state, toLoad: {...state.toLoad}, toUnload: {...state.toUnload}, cargo: {...state.cargo}, inventory: inventoryBackup};
}

function getCargoMaximum(ships) {
  return Object.values(ships).reduce((sum, ship) => {
    return sum + Ships[ship.typeName].capacity;
  }, 0);
}

function compileCargo(ships) {
  return Object.values(ships).reduce((manifest, ship) => {
    Object.entries(ship.cargo).forEach(([resourceId, amount]) => {
      if (manifest.hasOwnProperty(resourceId)) {
        manifest[resourceId] += amount;
      } else {
        manifest[resourceId] = amount;
      }
    });
    return manifest;
  }, {});
}

function calculateWarehouseMax(playerLevel) {
  return 30 + ((playerLevel-1) * 10);
}

const INVENTORY_FACTOR = 1 / 1.25;
function setUpInventory(islandInfo, warehouseMax) {
  return Object.entries(islandInfo.rates).reduce((inventory, [itemId, rates]) => {
    if (rates[1] > 0) {
      if (Resources.hasOwnProperty(itemId)) {
        const sellPrice = Resources[itemId].baseTradePrice * rates[1];
        inventory[itemId] = {
          onHand: warehouseMax * rates[1] * INVENTORY_FACTOR,
          sellPrice: sellPrice
        };
      }
    } else {
      if (Resources.hasOwnProperty(itemId)) {
        inventory[itemId] = {
          onHand: 0,
          sellPrice: 0
        };
      }
    }
    return inventory;
  }, {});
}

function setUpHomeInventory(homeResources) {
  return Object.entries(homeResources).reduce((inventory, [itemId, item]) => {
    if (item.id !== 'gold') {
      inventory[itemId] = {
        onHand: item.owned
      };
    }
    return inventory;
  }, {});
}

function calculateBalance(toLoad, toUnload, inventory, islandId) {
  if (islandId === 'home') {
    return 0; // no fee when you're trading with yourself
  }

  let balance = Object.entries(toLoad).reduce((spendings, [resource, amount]) => {
    return spendings - (inventory[resource].sellPrice * amount);
  }, 0);

  const rates = Islands[islandId].rates;
  balance = Object.entries(toUnload).reduce((income, [resource, amount]) => {
    const resourceInfo = Resources[resource];
    return income + (rates[resource][0] * amount * resourceInfo.baseTradePrice);
  }, balance);

  return balance;
}