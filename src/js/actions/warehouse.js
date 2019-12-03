export const ACTIONS = {
  BUILD_WAREHOUSE: 'BUILD_WAREHOUSE',
  UPDGRADE_WAREHOUSE: 'UPGRADE_WAREHOUSE'
};

export function buildWarehouse(warehouse) {
  return { type: ACTIONS.BUILD_WAREHOUSE, payload: { toConstruct: warehouse }};
}

export function upgradeWarehouse(currentWarehouse) {
  return { type: ACTIONS.UPDGRADE_WAREHOUSE, payload: { toUpgrade: currentWarehouse }};
}
