export const ACTIONS = {
  SETUP: 'SETUP',
  ONLOAD: 'ONLOAD',
  OFFLOAD: 'OFFLOAD',
  CANCEL: 'CANCEL',
  CONFIRM: 'CONFIRM'
};

export function setUp(playerLevel, dockId, ships, warehouse) {
  return { type: ACTIONS.SETUP, payload: { playerLevel: playerLevel, dockId: dockId, ships: ships, warehouse: warehouse } };
}

export function onload(resourceId, amount) {
  return { type: ACTIONS.ONLOAD, payload: { resourceId: resourceId, amount: amount }};
}

export function offload(resourceId, amount) {
  return { type: ACTIONS.OFFLOAD, payload: { resourceId: resourceId, amount: amount }};
}

export function cancel() {
  return { type: ACTIONS.CANCEL };
}

export function confirm(fleetId, dockId, toLoad, toUnload, cost) {
  return { type: ACTIONS.CONFIRM, payload: { fleetId: fleetId, dockId: dockId, toLoad: toLoad, toUnload: toUnload, cost: cost}};
}