import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import ResourceDefinitions from '../data/resource-definitions';

import '../../style/courier.css';

const CourierMonitor = () => {
  const couriers = useSelector(state => state.couriers, shallowEqual);
  const buildings = useSelector(state => state.buildings, shallowEqual);

  function jobDescriptionToString(jobDescription) {
    if (!jobDescription.id) {
      return 'Sitting idly';
    }
    const what = ResourceDefinitions[jobDescription.carrying].name;
    const howMuch = jobDescription.amount;
    const fromWhereId = jobDescription.from;
    let fromWhere = 'nowhere?!';
    if (fromWhereId === 'warehouse') {
      fromWhere = 'the warehouse';
    } else {
      const building = buildings.owned[fromWhereId];
      if (!building) {
        fromWhere = '???';
      } else {
        fromWhere = building.name;
      }
    }
    const toWhereId = jobDescription.to;
    let toWhere = 'nowhere?!';
    if (toWhereId === 'warehouse') {
      toWhere = 'the warehouse';
    } else {
      const building = buildings.owned[toWhereId];
      if (!building) {
        toWhere = '???';
      } else {
        toWhere = building.name;
      }
    }
    return `Delivering ${howMuch} ton of ${what} from ${fromWhere} to ${toWhere}`;
  }

  const courierList = couriers.couriers.map((courier) => {
    return (
      <div className='courier' key={courier.id}>
        <div>{courier.status}</div>
        <div>{courier.progress.toFixed(1)}</div>
        {/**<div>{jobDescriptionToString(courier.jobDescription)}</div>**/}
        <div>{JSON.stringify(courier.payload)}</div>
      </div>
    );
  });

  return (
    <div className='courier-monitor'>
      {courierList}
    </div>
  );
};

export default CourierMonitor;
