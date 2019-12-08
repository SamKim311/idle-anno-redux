import React from 'react';
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { filterUnlocked, setAllAffordable } from '../selectors';
import BuildingDefinitions, { BUILDING_CATEGORY } from '../data/building-definitions';
import ResourceDefinitions from '../data/resource-definitions';
import { constructBuilding } from '../actions/construction';
import { buildHouse } from '../actions/housing';
import { buildWarehouse } from '../actions/warehouse';

import '../../style/construction.css';

const ConstructionPanel = () => {
  const resources = useSelector(state => state.warehouse.resources);
  const construction = useSelector(state => setAllAffordable(filterUnlocked(state.construction), resources), shallowEqual);
  const dispatch = useDispatch();

  const constructionList = Object.entries(construction).map(([buildingId, construction]) => {
    const buildingInfo = BuildingDefinitions[buildingId];
    const ingredientPanel = Object.keys(construction.cost).map((ingredient) => (
      <div className='construction-ingredient' key={ingredient}>{ResourceDefinitions[ingredient].name}: {construction.cost[ingredient]}</div>
    ));

    let buyFunction = null;
    if (buildingInfo.category === BUILDING_CATEGORY.HOUSE) {
      buyFunction = () => dispatch(buildHouse(construction));
    } else if (buildingInfo.category === BUILDING_CATEGORY.WAREHOUSE) {
      buyFunction = () => dispatch(buildWarehouse(construction));
    } else {
      buyFunction = () => dispatch(constructBuilding(construction));
    }

    const popover =
    <Popover id={buildingInfo.id}>
      <Popover.Title as='h3'>{buildingInfo.description}</Popover.Title>
      <Popover.Content>{ingredientPanel}</Popover.Content>
    </Popover>;

    return (
      <OverlayTrigger
        placement='top'
        delay={{ show: 750, hide: 250 }}
        overlay={popover}
        >
        <div className='construction' key={buildingId}>
          <div className='construction-header'><p>{buildingInfo.name} {buildingInfo.abbreviation && '(' + buildingInfo.abbreviation + ')'}</p></div>
          <div>Built: {construction.owned}</div>
          <button className='purchase' onClick={buyFunction} disabled={!construction.canAfford}>Buy</button>
        </div>
      </OverlayTrigger>
    )
  });
  return (
    <Container className='construction-panel'>
      {constructionList}
    </Container>
  )
};

export default ConstructionPanel;
