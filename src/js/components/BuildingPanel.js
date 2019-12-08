import React from 'react';
import Container from 'react-bootstrap/Container';
import BuildingIcon from './BuildingIcon';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Buildings, { BUILDING_CATEGORY, buildingStatus } from '../data/building-definitions';
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

  const buildingIcons = Object.values(buildings).map((building) =>
    <BuildingIcon building={building} key={building.id}></BuildingIcon>
  );

  return (
    <Container>
      <div className='building-panel'>
        {buildingIcons}
      </div>
    </Container>
  );
};

export default BuildingPanel;
