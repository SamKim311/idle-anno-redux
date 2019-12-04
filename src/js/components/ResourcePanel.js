import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { upgradeWarehouse } from '../actions/warehouse';
import { filterUnlocked, setAffordable } from '../selectors';
import Buildings from '../data/building-definitions';
import ResourceDefinitions from '../data/resource-definitions';

import '../../style/resource.css';

const ResourcePanel = () => {
  const warehouseType = useSelector(state => state.warehouse.type);
  const resources = useSelector(state => filterUnlocked(state.warehouse.resources), shallowEqual);
  const max = useSelector(state => state.warehouse.totalCapacity);
  const warehouseInfo = Buildings[warehouseType];
  const dispatch = useDispatch();

  const upgradeWarehouseFn = () => {
    dispatch(upgradeWarehouse(warehouseType));
  }

  let upgradeButton = null;
  if (warehouseInfo.upgradesTo) {
    const canAfford = setAffordable({cost: warehouseInfo.upgradeCost}, resources).canAfford;
    upgradeButton = (
      <button onClick={upgradeWarehouseFn} disabled={!canAfford}>Upgrade</button>
    );
  }

  return (
    <div className='resource-panel'>
      <h4>{warehouseInfo.name}</h4>
      {upgradeButton}
      <div className='resource-list'>
        {Object.keys(resources).map((item, key) => {
            const resourceName = ResourceDefinitions[item].name;
            if (item !== 'gold') {
              return <div key={item}>{resourceName}: {resources[item].owned.toFixed(1)} / {max}</div>;
            } else {
              return <div key={item}>{resourceName}: {resources[item].owned.toFixed(1)}</div>;
            }
        })}
      </div>
    </div>
  );
};

export default ResourcePanel;
