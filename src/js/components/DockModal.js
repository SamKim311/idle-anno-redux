import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Islands from '../data/island-info';
import Resources from '../data/resource-definitions';
import { filterUnlocked } from '../selectors';
import { onload, offload, cancel, confirm } from '../actions/foreign-trade';

const DockModal = (props) => {
  const [dockSelected, setDockSelected] = useState('');
  const [shipSelected, setShipSelected] = useState('');
  const traderInfo = useSelector(state => state.foreignTrade);
  const resources = useSelector(state => filterUnlocked(state.warehouse.resources)); // literally just for unlocked state
  const gold = useSelector(state => state.warehouse.resources.gold.owned);
  const dispatch = useDispatch();
  const fleet = props.fleet;
  const islandData = Islands[fleet.currentLocation];

  const dockGoods = Object.entries(traderInfo.inventory).map(([resourceId, sellData]) => {
    if (resources[resourceId] && sellData.onHand > 0) {
      return <option key={resourceId} value={resourceId}>{Resources[resourceId].name} -- {sellData.onHand.toFixed()}</option>;
    }
  });

  const shipGoods = Object.entries(traderInfo.cargo).map(([resourceId, onBoard]) => {
    if (resources[resourceId]) {
      return <option key={resourceId} value={resourceId}>{Resources[resourceId].name} -- {onBoard.toFixed()}</option>;
    }
  });
  if (shipGoods.length === 0) {
    shipGoods.push(<option value='' disabled>Cargo is empty</option>);
  }

  const remainingCargoSpace = traderInfo.cargoMaximum - traderInfo.cargoUsed;

  const loadGoods = (goodId, amount) => {
    dispatch(onload(goodId, amount));
  }

  const unloadGoods = (goodId, amount) => {
    dispatch(offload(goodId, amount));
  }

  const cancelTrade = () => {
    dispatch(cancel());
    props.onClose();
  }

  const confirmTrade = () => {
    dispatch(confirm(fleet.id, traderInfo.dockId, traderInfo.toLoad, traderInfo.toUnload, traderInfo.balance));
    props.onClose();
  }

  const canAfford = gold >= traderInfo.balance;

  return (
    <Modal show={props.show} onHide={cancelTrade} size='lg'>
      <Modal.Header>
        <Modal.Title>{islandData.name} -- {gold.toFixed()} Gold</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
              <Col>
                <label>
                  Fleet cargo: {traderInfo.cargoUsed}/{traderInfo.cargoMaximum} <br />
                  <select value={shipSelected} onChange={e => setShipSelected(e.target.value)} size='10'>
                    {shipGoods}
                  </select>
                </label>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => loadGoods(dockSelected, 1)}
                            disabled={remainingCargoSpace < 1}>{'<-- 1'}</Button>
                  </Col>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => unloadGoods(shipSelected, 1)}>{'1 -->'}</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => loadGoods(dockSelected, 10)}
                            disabled={remainingCargoSpace < 10}>{'<-- 10'}</Button>
                  </Col>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => unloadGoods(shipSelected, 10)}>{'10 -->'}</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => loadGoods(dockSelected, 'max')}
                            disabled={remainingCargoSpace < 1}>{'<-- Max'}</Button>
                  </Col>
                  <Col>
                    <Button variant='info' size='sm' 
                            onClick={() => unloadGoods(shipSelected, 'max')}>{'Max -->'}</Button>
                  </Col>
                </Row>
              </Col>
              <Col>
                <label>
                  Dock maximum: {traderInfo.warehouseMaximum} <br />
                  <select value={dockSelected} onChange={e => setDockSelected(e.target.value)} size='10'>
                    {dockGoods}
                  </select>
                </label>
              </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={cancelTrade}>Cancel</Button>
        <Button variant='primary' onClick={confirmTrade} disabled={!canAfford}>{traderInfo.dockId === 'home' ? 'Confirm' : traderInfo.balance > 0 ? 'Sell for ' + traderInfo.balance : 'Buy for ' + (-traderInfo.balance)}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DockModal;