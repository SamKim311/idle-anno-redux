import React from 'react';
import { useSelector } from 'react-redux';
import Population from '../data/population-definitions';
import { unlockThresholds } from '../data/level-up-definitions';

const MilestonePane = () => {
  const islandLevel = useSelector(state => state.island.level);

  const unlockReqs = unlockThresholds[islandLevel-1];
  if (!unlockReqs) {
    return <div></div>
  }
  
  const popName = Population[unlockReqs[0]].name;
  const amount = unlockReqs[1];

  return (
    <div className='milestone'>
      <p>New unlocks at {amount} {popName}s</p>
    </div>
  )
};

export default MilestonePane;
