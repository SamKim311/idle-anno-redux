import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import BuildingDetails from './BuildingDetails';

import Buildings, { BUILDING_CATEGORY, buildingStatus } from '../data/building-definitions';

const BuildingIcon = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClose = () => setShowDetails(false);
  const handleShow = () => setShowDetails(true);

  const building = props.building;

  let toolTipContent = Buildings[building.buildingId].name;
  let statusColor = null;
  if (Buildings[building.buildingId].category !== BUILDING_CATEGORY.PRODUCER) {
    statusColor = 'working';
  } else {
    switch (building.status) {
      case buildingStatus.DISABLED:
        statusColor = 'disabled';
        toolTipContent += ' (Disabled)'
        break;
      case buildingStatus.AWAITING_RESOURCES:
        statusColor = 'awaiting';
        toolTipContent += ' - Awaiting resources!'
        break;
      case buildingStatus.OUTBOX_FULL:
        statusColor = 'outbox-full';
        toolTipContent += ' - Outbox full!'
        break;
      case buildingStatus.WORKING:
        statusColor = 'working';
      default:
        break;
    }
  }


  return (
    <>
      <BuildingDetails show={showDetails} onClose={handleClose} building={building}></BuildingDetails>
      <OverlayTrigger
        placement='top'
        delay={{ show: 250, hide: 250 }}
        overlay={(props) => <Tooltip {...props} id={toolTipContent}>{toolTipContent}</Tooltip>}
        >
        <div className={'building-icon ' + statusColor} onClick={handleShow}>
          {Buildings[building.buildingId].abbreviation}
        </div>
      </OverlayTrigger>
    </>
  )
}

export default BuildingIcon;
