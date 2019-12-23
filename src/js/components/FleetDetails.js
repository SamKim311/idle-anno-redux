import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { embark } from '../actions/navy';
import { setUp } from '../actions/foreign-trade';
import Ships from '../data/ship-definitions';
import Islands from '../data/island-info';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DockModal from './DockModal';


const FleetDetails = (props) => {
  const [selectedDestination, setDestination] = useState('');
  const [showDockModal, setShowDockModal] = useState(false);
  const fleet = useSelector(state => state.navy.fleets[props.fleetId], shallowEqual);
  const ships = useSelector(state => state.navy.ships, shallowEqual);
  const playerLevel = useSelector(state => state.island.level);
  const homeName = useSelector(state => state.island.name);
  const warehouse = useSelector(state => state.warehouse, shallowEqual);
  const dispatch = useDispatch();

  if (!fleet) {
    return (<></>)
  }

  const submitDestination = (e) => {
    e.preventDefault();
    dispatch(embark(props.fleetId, selectedDestination));
  }

  const openModal = () => {
    dispatch(setUp(playerLevel, fleet.currentLocation, ships, warehouse));
    setShowDockModal(true);
  }

  const closeModal = () => {
    setShowDockModal(false);
  }

  const destinationName = fleet.currentDestination ? fleet.currentDestination === 'home' ? homeName : Islands[fleet.currentDestination].name : null;
  const currentLocationName = fleet.currentDestination ? 'sea towards ' + destinationName :
                          fleet.currentLocation === 'home' ? homeName :
                          Islands[fleet.currentLocation].name;

  const timeRemaining = fleet.destinationTimer ? fleet.destinationTimer - fleet.travelProgress : null;

  const availableLocations = Object.entries(Islands).map(([islandId, island]) => {
    if (islandId !== fleet.currentLocation) {
      const islandName = islandId === 'home' ? homeName : island.name;
      return <option value={islandId} key={islandId}>{islandName}</option>;
    }
    return null;
  });

  let dockOption = null;
  if (!fleet.currentDestination) {
    dockOption = <Button variant='info' onClick={openModal}>Dock</Button>
  }

  const destinationInfo = fleet.currentDestination ?
                          <div>cancel destination</div>
                          :
                          <form onSubmit={submitDestination}>
                            <label>
                              Pick your destination
                              <select value={selectedDestination} onChange={e => setDestination(e.target.value)}>
                                <option value='none'>--</option>
                                {availableLocations}
                              </select>
                              <input type='submit' value='Embark' />
                            </label>
                          </form>;

  return (
    <>
      <DockModal fleet={fleet} show={showDockModal} onClose={closeModal}></DockModal>
      <Container fluid>
        <Row>
          <Col>
            <h4>{fleet.name}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            Ships in this fleet:
          </Col>
        </Row>
        <Row>
          <Col>
            This fleet is currently at {currentLocationName} <br />
            {timeRemaining ? 'Time remaining: ' + timeRemaining : ''} <br />
            {dockOption}
          </Col>
        </Row>
        <Row>
          <Col>
            {destinationInfo}
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default FleetDetails;
