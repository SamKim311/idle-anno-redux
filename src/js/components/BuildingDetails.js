import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Buildings, {BUILDING_CATEGORY} from '../data/building-definitions';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { destroyBuilding } from '../actions/construction';
import { disableBuilding, enableBuilding } from '../actions/building';
import { upgradeStorehouse } from '../actions/warehouse';
import { setAffordable } from '../selectors';

const BuildingDetails = (props) => {
  const resources = useSelector(state => state.warehouse.resources, shallowEqual)
  const dispatch = useDispatch();
  const building = props.building;
  let buildingInfo = Buildings[building.buildingId];

  if (buildingInfo.upgradesTo) {
    buildingInfo = setAffordable(buildingInfo, resources, 'upgradeCost');
  }

  const destroyBuildingFn = (toDestroy) => {
    dispatch(destroyBuilding(toDestroy));
  }

  const toggleEnableFn = (building) => {
    if (building.enabled) {
      dispatch(disableBuilding(building.id));
    } else {
      dispatch(enableBuilding(building.id));
    }
  }

  const upgradeWarehouseFn = (building) => {
    dispatch(upgradeStorehouse(building));
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{buildingInfo.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{buildingInfo.description}</p>
        {
          buildingInfo.category === BUILDING_CATEGORY.PRODUCER &&
            <>
              <div>{building.status}</div>
              <div>Efficiency: {building.efficiency}</div>
              <div className='inbox'>Inbox: {JSON.stringify(building.inbox)}</div>
              <div className='outbox'>Outbox: {JSON.stringify(building.outbox)}</div>
            </>
        }
      </Modal.Body>
      <Modal.Footer>
        {
          buildingInfo.category === BUILDING_CATEGORY.PRODUCER &&
          <button onClick={() => toggleEnableFn(building)}>{ building.enabled ? 'Disable' : 'Enable'}</button>
        }
        {
          buildingInfo.upgradesTo &&
          <button disabled={!buildingInfo.canAfford} onClick={() => upgradeWarehouseFn(building)}>Upgrade</button>
        }
        <button onClick={() => destroyBuildingFn(building)}>Destroy</button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuildingDetails;
