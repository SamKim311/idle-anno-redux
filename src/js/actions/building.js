export const ACTIONS = {
  DISABLE_BUILDING: 'DISABLE_BUILDING',
  ENABLE_BUILDING: 'ENABLE_BUILDING'
}

export function disableBuilding(id) {
  return { type: ACTIONS.DISABLE_BUILDING, payload: { id: id }};
}

export function enableBuilding(id) {
  return { type: ACTIONS.ENABLE_BUILDING, payload: { id: id }};
}
