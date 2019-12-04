import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Buildings, { BUILDING_CATEGORY } from '../data/building-definitions';
import { destroyBuilding } from '../actions/construction';
import { disableBuilding, enableBuilding } from '../actions/building';

import '../../style/building.css';

const BuildingPanel = () => {
  const buildingState = useSelector(state => state.buildings, shallowEqual);
  const dispatch = useDispatch();
  const buildings = buildingState.owned;

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

  let buildingList = Object.values(buildings).map((building) => {
    const buildingInfo = Buildings[building.buildingId];
    if (buildingInfo.category === BUILDING_CATEGORY.PRODUCER) {
      return <Building building={building} key={building.id} destroyFunc={destroyBuildingFn} toggleEnableFn={toggleEnableFn}></Building>
    } else {
      return (
        <div className='building' key={building.id}>
          <div className='building-header'><h4>{buildingInfo.name}</h4></div>
          <button onClick={() => destroyBuildingFn(building)}>Destroy</button>
        </div>
      )
    }
  });

  return (
    <div className='building-panel'>
      {buildingList}
    </div>
  );
};

const Building = (props) => {
  let building = props.building;
  const buildingInfo = Buildings[building.buildingId];
  const upkeep = building.enabled ? buildingInfo.upkeep : buildingInfo.disabledUpkeep;
  return (
    <div className='building'>
      <div className='building-header'><h4>{buildingInfo.name}</h4></div>
      <div className='status'>{building.status}</div>
      <div>Upkeep: {upkeep}</div>
      <div>{building.progress.toFixed(1)} / {buildingInfo.produceTime}</div>
      <div>Efficiency: {building.efficiency}</div>
      <div className='inbox'>Inbox: {JSON.stringify(building.inbox)}</div>
      <div className='outbox'>Outbox: {JSON.stringify(building.outbox)}</div>
      <button onClick={() => props.toggleEnableFn(building)}>{ building.enabled ? 'Disable' : 'Enable'}</button>
      <button onClick={() => props.destroyFunc(building)}>Destroy</button>
    </div>
  )
};

export default BuildingPanel;
