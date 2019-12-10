import React from 'react';
import Button from 'react-bootstrap/Button';
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
import PriceTooltip from './PriceTooltip';

import '../../style/construction.css';

const ConstructionPanel = () => {
  const resources = useSelector(state => state.warehouse.resources);
  const construction = useSelector(state => setAllAffordable(filterUnlocked(state.construction), resources), shallowEqual);
  const dispatch = useDispatch();

  const constructionList = Object.entries(construction).map(([buildingId, construction]) => {
    const buildingInfo = BuildingDefinitions[buildingId];

    let buyFunction = null;
    if (buildingInfo.category === BUILDING_CATEGORY.HOUSE) {
      buyFunction = () => dispatch(buildHouse(construction));
    } else if (buildingInfo.category === BUILDING_CATEGORY.WAREHOUSE) {
      buyFunction = () => dispatch(buildWarehouse(construction));
    } else {
      buyFunction = () => dispatch(constructBuilding(construction));
    }

    return (
      <div className='construction' key={buildingId}>
        <div className='construction-header'><p>{buildingInfo.name} {buildingInfo.abbreviation && '(' + buildingInfo.abbreviation + ')'}</p></div>
        <div>Built: {construction.owned}</div>
        <PriceTooltip cost={construction.cost} header={buildingInfo.description}>
          <div>
            <Button variant='primary' size='sm' className='purchase' onClick={buyFunction} disabled={!construction.canAfford}>Buy</Button>
          </div>
        </PriceTooltip>
      </div>
    )
  });
  return (
    <Container className='construction-panel'>
      {constructionList}
    </Container>
  )
};

export default ConstructionPanel;
