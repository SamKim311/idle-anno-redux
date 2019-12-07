import React from 'react';
import PopulationDefinitions from '../data/population-definitions';
import { useSelector, shallowEqual } from 'react-redux';
import { filterUnlocked } from '../selectors';

import '../../style/population.css';

const PopulationPanel = () => {
  const populationState = useSelector(state => filterUnlocked(state.population), shallowEqual);

  const populationList = Object.values(populationState).map((pop) => {
      const popName = PopulationDefinitions[pop.id].name;
      const happiness = pop.happiness ? pop.happiness.toFixed() : 0;
      let beggarTimer = null;
      if (pop.id === 'beggar') {
        beggarTimer = 1200 - pop.beggarTimer;
      }
      return <div className='population' key={pop.id}>
        {popName}: {pop.owned} / {pop.maxPopulation} Happiness: {happiness} {pop.consumeInfo} --- {beggarTimer}
      </div>
  });

  return (
    <div className='population-panel'>
      {populationList}
    </div>
  )
}

export default PopulationPanel;
