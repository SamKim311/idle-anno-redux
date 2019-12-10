import React from 'react';
import BuildingDefinitions from '../data/building-definitions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { filterUnlocked, setAffordable } from '../selectors';
import PriceTooltip from './PriceTooltip';
import Button from 'react-bootstrap/Button';

import { ascendHouse } from '../actions/housing';

import '../../style/housing.css';

const HousingPanel = () => {
  const resources = useSelector(state => state.warehouse.resources, shallowEqual);
  const dispatch = useDispatch();

  const houses = useSelector((state) => filterUnlocked(state.housing.types), shallowEqual);
  const population = useSelector((state) => state.population, shallowEqual);
  let housingList = Object.keys(houses).map((houseId) => {
    const houseInfo = BuildingDefinitions[houseId];
    let nextHouseInfo = BuildingDefinitions[houseInfo.ascendsTo];
    if (nextHouseInfo) {
      nextHouseInfo = setAffordable(nextHouseInfo, resources);
    }
    const housedPopulation = population[houseInfo.populationCategory];
    const canAscend = (houses[houseId].remainingAscensionRights > 0) && housedPopulation.canAscend && nextHouseInfo.canAfford;
    const availableAscensions = canAscend ? houses[houseId].remainingAscensionRights : 0;
    return <div className='housing' key={houseId}>
      <div className='housing-data'>{houseInfo.name}: {houses[houseId].owned}</div>
      {
        nextHouseInfo &&
        <PriceTooltip cost={nextHouseInfo.cost} header={availableAscensions + ' ascensions available'}>
          <div>
            <Button variant='primary' size='sm' onClick={() => {dispatch(ascendHouse(houseId, houseInfo.ascendsTo))}} disabled={!canAscend}>Ascend</Button>
          </div>
        </PriceTooltip>
      }
    </div>
  });

  return (
    <div className='housing-panel'>
      {housingList}
    </div>
  )
};

export default HousingPanel;
