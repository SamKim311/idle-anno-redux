export const ACTIONS = {
  BUILD_WAREHOUSE: 'BUILD_WAREHOUSE'
};

export function buildWarehouse(warehouse) {
  return { type: ACTIONS.BUILD_WAREHOUSE, payload: { toConstruct: warehouse }};
}
