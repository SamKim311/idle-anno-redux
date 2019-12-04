import BuildingDefinitions from '../data/building-definitions';

export const ACTIONS = {
  BUILD_HOUSE: 'BUILD_HOUSE',
  ASCEND_HOUSE: 'ASCEND_HOUSE'
};

export function buildHouse(house) {
  return { type: ACTIONS.BUILD_HOUSE, payload: { toConstruct: house } };
}

export function ascendHouse(fromHouse, toHouse) {
  const toBuilding = BuildingDefinitions[toHouse];
  return { type: ACTIONS.ASCEND_HOUSE, payload: { toConstruct: toBuilding, fromHouse: fromHouse }};
}
