// this could probably be done with thunk instead
import { ACTIONS } from '../actions/game';
import Buildings, { BUILDING_CATEGORY } from '../data/building-definitions';

const TIME_FACTOR = 1 / 60.0;

export default function(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.TICK:
      const timeIntervalS = payload.tickIntervalSeconds;
      const newState = Object.assign({}, state);
      const buildings = state.buildings;

      const amenities = {};
      for (let building of Object.values(buildings.owned)) {
        const buildingInfo = Buildings[building.buildingId];
        if (buildingInfo.category !== BUILDING_CATEGORY.AMENITY) {
          continue;
        }

        for (let [amenity, amount] of Object.entries(buildingInfo.produces)) {
          if (!amenities[amenity]) {
            amenities[amenity] = 0;
          }

          amenities[amenity] += amount * timeIntervalS * TIME_FACTOR;
        }
      }

      newState.amenities = amenities;
      return newState;
    default:
      return state;
  }
}
