import reducer from '../../js/reducers/construction';
import { constructBuilding, destroyBuilding } from '../../js/actions/construction';
import { buildHouse } from '../../js/actions/housing';
import { buildWarehouse } from '../../js/actions/warehouse';

describe('construction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should increment owned count on CONSTRUCT_BUILDING', () => {
    const testState = {
      testConstruct: {
        id: 'testConstruct',
        owned: 0
      }
    };
    expect(reducer(testState, constructBuilding(testState.testConstruct)))
      .toEqual({
        testConstruct: {
          id: 'testConstruct',
          owned: 1
        }
      });
  });

  it('should increment owned count on BUILD_HOUSE', () => {
    const testState = {
      testHouse: {
        id: 'testHouse',
        owned: 0
      }
    };
    expect(reducer(testState, buildHouse(testState.testHouse)))
      .toEqual({
        testHouse: {
          id: 'testHouse',
          owned: 1
        }
      });
  });

  it('should increment owned count on BUILD_WAREHOUSE', () => {
    const testState = {
      testWarehouse: {
        id: 'testWarehouse',
        owned: 1
      }
    };
    expect(reducer(testState, buildWarehouse(testState.testWarehouse)))
      .toEqual({
        testWarehouse: {
          id: 'testWarehouse',
          owned: 2
        }
      });
  });

  it('should decrement owned count on destroy building', () => {
    const testState = {
      testConstruct: {
        id: 'testConstruct',
        owned: 1
      }
    };
    const testBuilding = {
      id: 'abcde',
      buildingId: 'testConstruct'
    };
    expect(reducer(testState, destroyBuilding(testBuilding)))
      .toEqual({
        testConstruct: {
          id: 'testConstruct',
          owned: 0
        }
      });
  });
});
