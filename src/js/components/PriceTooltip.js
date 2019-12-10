import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import ResourceDefinitions from '../data/resource-definitions';

const PriceTooltip = (props) => {
  const cost = props.cost;

  const ingredientsList = Object.entries(cost).map(([ingredient, quantity]) => (
    <div className='construction-ingredient' key={ingredient}>{ResourceDefinitions[ingredient].name}: {quantity}</div>
  ));

  const headerText = props.header ? props.header : 'Cost';
  const popover =
  <Popover id='Price'>
    <Popover.Title as='h3'>{headerText}</Popover.Title>
    <Popover.Content>{ingredientsList}</Popover.Content>
  </Popover>;

  return (
    <OverlayTrigger
      placement='top'
      delay={{ show: 500, hide: 250 }}
      overlay={popover}
      >
      {props.children}
    </OverlayTrigger>
  )
}

export default PriceTooltip;
