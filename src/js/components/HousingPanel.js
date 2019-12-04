import React from 'react';
import BuildingDefinitions from '../data/building-definitions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { filterUnlocked } from '../selectors';

import { ascendHouse } from '../actions/housing';

import '../../style/housing.css';

const HousingPanel = () => {
  const dispatch = useDispatch();

  const houses = useSelector((state) => filterUnlocked(state.housing.types), shallowEqual);
  const population = useSelector((state) => state.population, shallowEqual);
  let housingList = Object.keys(houses).map((houseId) => {
    const housedPopulation = population[BuildingDefinitions[houseId].populationCategory];
    const canAscend = (houses[houseId].remainingAscensionRights > 0) && housedPopulation.canAscend;
    const availableAscensions = canAscend ? houses[houseId].remainingAscensionRights : 0;
    return <div className='housing' key={houseId}>
      <div className='housing-data'>{BuildingDefinitions[houseId].name}: {houses[houseId].owned}</div>
      <div><button onClick={() => {dispatch(ascendHouse(houseId, BuildingDefinitions[houseId].ascendsTo))}} disabled={!canAscend}>Ascend</button>{availableAscensions}</div>
    </div>
  });

  return (
    <div className='housing-panel'>
      {housingList}
    </div>
  )
};

export default HousingPanel;
