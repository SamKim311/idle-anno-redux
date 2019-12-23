import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { tick as dispatchTick, saveGame } from './actions/game';
import Scheduler from './scheduler';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
import MilestonePane from './components/MilestonePane';
import FleetView from './components/FleetView';

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
      <IslandNameView></IslandNameView>
      <MilestonePane></MilestonePane>
      <Tabs defaultActiveKey='buildings'>
        <Tab eventKey='buildings' title='Buildings'>
          <ConstructionPanel></ConstructionPanel>
          <BuildingPanel></BuildingPanel>
        </Tab>
        <Tab eventKey='resources' title='Resources'>
          <ResourcePanel></ResourcePanel>
          <CourierMonitor></CourierMonitor>
        </Tab>
        <Tab eventKey='population' title='Houses'>
          <PopulationPanel></PopulationPanel>
          <HousingPanel></HousingPanel>
        </Tab>
        <Tab eventKey='port' title='Port'>
          <TradePanel></TradePanel>
          <FleetView></FleetView>
        </Tab>
        <Tab eventKey='settings' title='Settings'>
          <SaveLoad></SaveLoad>
          <TimeFactor></TimeFactor>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Game;
