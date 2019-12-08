import React from 'react';
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

    return (
      <div className='construction' key={buildingId}>
        <div className='construction-header'><h4>{buildingInfo.name} {buildingInfo.abbreviation && '(' + buildingInfo.abbreviation + ')'}</h4></div>
        <div className='description'><h5>{buildingInfo.description}</h5></div>
        <div>Owned: {construction.owned}</div>
        <div className='ingredientList'>{ingredientPanel}</div>
        <button className='purchase' onClick={buyFunction} disabled={!construction.canAfford}>Buy</button>
      </div>
    )
  });
  return (
    <div className='construction-panel'>
      {constructionList}
    </div>
  )
};

export default ConstructionPanel;
