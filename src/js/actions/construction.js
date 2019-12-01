export const ACTIONS = {
  CONSTRUCT_BUILDING: 'CONSTRUCT_BUILDING',
  DESTROY_BUILDING: 'DESTROY_BUILDING'
};

export function constructBuilding(toConstruct) {
  return { type: ACTIONS.CONSTRUCT_BUILDING, payload: { toConstruct: toConstruct } };
};

export function destroyBuilding(toDestroy) {
  return { type: ACTIONS.DESTROY_BUILDING, payload: { toDestroy: toDestroy }};
};
