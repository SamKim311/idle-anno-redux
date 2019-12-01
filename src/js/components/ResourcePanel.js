import React from 'react';
import { connect } from 'react-redux';
import { filterUnlocked } from '../selectors';
import ResourceDefinitions from '../reducers/resource-definitions';

import '../../style/resource.css';

const mapStateToProps = (state) => { return {resources: filterUnlocked(state.warehouse.resources),
                                             max: state.warehouse.totalCapacity}};

const ResourcePanel = ({resources, max}) => {
  return (
    <div className='resource-panel'>
      {Object.keys(resources).map((item, key) => {
          const resourceName = ResourceDefinitions[item].name;
          if (item !== 'gold') {
            return <div key={item}>{resourceName}: {resources[item].owned.toFixed(1)} / {max}</div>;
          } else {
            return <div key={item}>{resourceName}: {resources[item].owned.toFixed(1)}</div>;
          }
      })}
    </div>
  );
};

export default connect(mapStateToProps)(ResourcePanel);
