import { ACTIONS } from '../actions/housing';
import BuildingDefinitions from '../data/building-definitions';

const initHouseState = {
  popProgress: 0,
  currentPop: 1
};

const ascensionFactors = {
  peasanthouse: .8,
  citizenhouse: .6
}

// precomputed list of current house and up because I'm lazy
const rightsLists = {
  peasanthouse: ['peasanthouse', 'citizenhouse'],
  citizenhouse: ['citizenhouse'],
  patricianhouse: []
}

export default function(housing = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.BUILD_HOUSE: {
      const newState = Object.assign({}, housing);
      const types = Object.assign({}, newState.types);
      const abodes = newState.abodes.slice(0);
      newState.types = types;
      newState.abodes = abodes;

      const toBuild = payload.toConstruct.id; // should really just be peasanthouse
      const type = Object.assign({}, types[toBuild]);
      types[toBuild] = type;
      const houseData = BuildingDefinitions[toBuild];
      const abode = {...initHouseState, houseId: toBuild, populationCap: houseData.populationCap};

      type.owned += 1;
      abodes.push(abode);

      calculateAscensionRights(types, type, toBuild);

      return newState;
    }
    case ACTIONS.ASCEND_HOUSE: {
      const fromHouseId = payload.fromHouse;
      const toHouseId = BuildingDefinitions[fromHouseId].ascendsTo;

      const fromType = {...housing.types[fromHouseId]};
      const toType = {...housing.types[toHouseId]};
      const types = {...housing.types, [fromHouseId]: fromType, [toHouseId]: toType};
      const abodes = [...housing.abodes];
      const newState = {...housing, types: types, abodes: abodes};
      const nextHouse = BuildingDefinitions[toHouseId];

      // find the first house that's able to be ascended
      const ascendIndex = abodes.findIndex((house) => house.houseId === fromHouseId);
      abodes.splice(ascendIndex, 1);
      abodes.push({...nextHouse, ...initHouseState, houseId: toHouseId});
      fromType.owned -= 1;
      toType.owned += 1;

      calculateAscensionRights(types, fromType, fromHouseId);
      calculateAscensionRights(types, toType, toHouseId);

      return newState;
    }
    default:
      return housing;
  }
};

function calculateAscensionRights(allTypes, type, toCheck) {
  const totalHouses = rightsLists[toCheck].reduce((sum, pop) => sum + allTypes[pop].owned, 0);
  type.totalAscensionRights = Math.floor(ascensionFactors[toCheck] * totalHouses);
  const ascendTo = BuildingDefinitions[toCheck].ascendsTo;
  const alreadyAscended = rightsLists[ascendTo].reduce((sum, pop) => sum + allTypes[pop].owned, 0);
  type.remainingAscensionRights = type.totalAscensionRights - alreadyAscended;
}
