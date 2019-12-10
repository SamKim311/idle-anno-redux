import React from 'react';
import Container from 'react-bootstrap/Container';
import BuildingIcon from './BuildingIcon';

import { useSelector, shallowEqual } from 'react-redux';

import '../../style/building.css';

const BuildingPanel = () => {
  const buildings = useSelector(state => state.buildings.owned, shallowEqual);

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
