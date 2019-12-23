import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import FleetDetails from './FleetDetails';

const FleetView = () => {
  const fleets = useSelector(state => state.navy.fleets, shallowEqual);
  const [key, setKey] = useState(null);

  const fleetLinks = Object.entries(fleets).map(([id, fleet]) => {
    const fleetSize = fleet.ships.length;
    return (
      <Nav.Item key={id}>
        <Nav.Link eventKey={id}>
          <h5>{fleet.name}</h5>
          {fleetSize} Ships
        </Nav.Link>
      </Nav.Item>
    )
  });

  return (
    <Container id='fleet-view' fluid>
      <Tab.Container id='fleet-selector' activeKey={key} onSelect={key => setKey(key)}>
        <Row>
          <Col sm={2}>
            <Nav variant='pills' className='flex-column'>
              {fleetLinks}
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey={key}>
                <FleetDetails fleetId={key}></FleetDetails>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default FleetView;
