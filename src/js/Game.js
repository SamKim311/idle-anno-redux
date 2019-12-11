import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tick as dispatchTick, saveGame } from './actions/game';
import Scheduler from './scheduler';

import IslandNameView from './components/IslandNameView';
import TimeFactor from './components/cheats/TimeFactor';
import ResourcePanel from './components/ResourcePanel';
import CourierMonitor from './components/CourierMonitor';
import ConstructionPanel from './components/ConstructionPanel';
import BuildingPanel from './components/BuildingPanel';
import PopulationPanel from './components/PopulationPanel';
import HousingPanel from './components/HousingPanel';
import SaveLoad from './components/SaveLoad';
import TradePanel from './components/TradePanel';

const MS_TO_S = 1/1000.0;

function Game() {
  const [scheduler] = useState(new Scheduler(tick, 100));
  const [autoSaveScheduler] = useState(new Scheduler(autoSave, 30000));
  const dispatch = useDispatch();

  function tick(timeIntervalMs) {
    dispatch(dispatchTick(timeIntervalMs * MS_TO_S));
  }

  function autoSave() {
    dispatch(saveGame());
    console.log('Saved');
  }

  useEffect(() => {
    scheduler.start();
    autoSaveScheduler.start();
  }, []);

  return (
    <div className="game">
      <SaveLoad></SaveLoad>
      <TimeFactor></TimeFactor>
      <IslandNameView></IslandNameView>
      <ResourcePanel></ResourcePanel>
      <TradePanel></TradePanel>
      <PopulationPanel></PopulationPanel>
      <HousingPanel></HousingPanel>
      <CourierMonitor></CourierMonitor>
      <ConstructionPanel></ConstructionPanel>
      <BuildingPanel></BuildingPanel>
    </div>
  );
}

export default Game;
