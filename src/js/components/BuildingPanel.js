import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { BUILDING_CATEGORY } from '../reducers/building-definitions';
import { destroyBuilding } from '../actions/construction';

import '../../style/building.css';

const BuildingPanel = () => {
  const buildingState = useSelector(state => state.buildings, shallowEqual);
  const dispatch = useDispatch();
  const buildings = buildingState.owned;

  const destroyBuildingFn = (toDestroy) => {
    dispatch(destroyBuilding(toDestroy));
  }

  let buildingList = Object.values(buildings).map((building) => {
    if (building.category === BUILDING_CATEGORY.PRODUCER) {
      return <Building building={building} key={building.id} destroyFunc={destroyBuildingFn}></Building>
    } else {
      return (
        <div className='building' key={building.id}>
          <div className='building-header'><h4>{building.name}</h4></div>
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
  return (
    <div className='building'>
      <div className='building-header'><h4>{building.name}</h4></div>
      <div className='status'>{building.status}</div>
      <div>{building.progress.toFixed(1)} / {building.produceTime}</div>
      <div className='inbox'>Inbox: {JSON.stringify(building.inbox)}</div>
      <div className='outbox'>Outbox: {JSON.stringify(building.outbox)}</div>
      <button onClick={() => props.destroyFunc(building)}>Destroy</button>
    </div>
  )
};

export default BuildingPanel;
