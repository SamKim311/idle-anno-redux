import { ACTIONS } from '../actions/construction';
import { ACTIONS as housingActions } from '../actions/housing';
import { ACTIONS as warehouseActions } from '../actions/warehouse';

export default function(constructions = {}, action) {
  let payload = action.payload;
  switch(action.type) {
    case warehouseActions.BUILD_WAREHOUSE:
    case housingActions.BUILD_HOUSE:
    case ACTIONS.CONSTRUCT_BUILDING:
      let toConstructId = payload.toConstruct.id;
      let toConstruct = constructions[toConstructId];
      let newOwned = Object.assign({}, toConstruct, {owned: toConstruct.owned+1});
      return Object.assign({}, constructions, {[toConstructId]: newOwned});
    case ACTIONS.DESTROY_BUILDING:
      const toDestroyId = payload.toDestroy.buildingId;
      const toDestroy = {...constructions[toDestroyId]};
      toDestroy.owned--;
      return {...constructions, [toDestroyId]: toDestroy};
    default:
      return constructions;
  }
}
