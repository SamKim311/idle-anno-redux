import reducer from '../../js/reducers/warehouse';
import { init } from '../../js/actions/game';
import { constructBuilding, destroyBuilding } from '../../js/actions/construction';
import { buildHouse, ascendHouse } from '../../js/actions/housing';
import { buildWarehouse, upgradeWarehouse } from '../../js/actions/warehouse';
import { buyGood, sellGood, dismissTrader } from '../../js/actions/trade';
import Buildings from '../../js/reducers/building-definitions';

describe('warehouse reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should add reserved and pending to each resource', () => {
    const testState = {
      resources: {
        testResource: {},
        otherResource: {}
      }
    };
    expect(reducer(testState, init())).toEqual({
      resources: {
        testResource: { reserved: 0, pending: 0 },
        otherResource: { reserved: 0, pending: 0 }
      }
    });
  });

  it('should deduct the cost of building a building', () => {
    const testState = {
      resources: {
        gold: { owned: 100 },
        wood: { owned: 100 }
      }
    };
    const testConstruction = {
      cost: {
        gold: 75,
        wood: 13
      }
    };
    expect(reducer(testState, constructBuilding(testConstruction))).toEqual({
      resources: {
        gold: { owned: 25 },
        wood: { owned: 87 }
      }
    });
  });

  it('should deduct the cost of building a house', () => {
    const testState = {
      resources: {
        gold: { owned: 100 },
        wood: { owned: 100 }
      }
    };
    const testHouse = {
      cost: {
        gold: 7,
        wood: 11
      }
    };
    expect(reducer(testState, buildHouse(testHouse))).toEqual({
      resources: {
        gold: {owned: 93},
        wood: {owned: 89}
      }
    });
  });

  it('should deduct the cost of ascending a house', () => {
    const testState = {
      resources: {
        gold: {owned: 100},
        wood: {owned: 100},
        tool: {owned: 100}
      }
    };
    expect(reducer(testState, ascendHouse({}, 'citizenhouse'))).toEqual({
      resources: {
        gold: {owned: 100},
        wood: {owned: 99},
        tool: {owned: 99}
      }
    });
  });

  it('should deduct the cost of building a warehouse', () => {
    const testState = {
      resources: {
        gold: {owned: 100},
        wood: {owned: 100}
      }
    };
    const testWarehouse = {
      id: 'smallwarehouse',
      cost: {
        gold: 7,
        wood: 11
      }
    };
    expect(reducer(testState, buildWarehouse(testWarehouse)).resources).toEqual({
      gold: {owned: 93},
      wood: {owned: 89}
    });
  });

  it('should increase totalCapacity when building a warehouse', () => {
    const testState = {
      totalCapacity: 500,
      resources: {
        gold: {owned: 100},
        wood: {owned: 100}
      }
    };
    const testWarehouse = {
      id: 'smallwarehouse',
      cost: {
        gold: 7,
        wood: 11
      }
    };
    expect(reducer(testState, buildWarehouse(testWarehouse)).totalCapacity).toEqual(540);
  });

  it('should deduct gold on trade purchase', () => {
    const testState = {
      resources: {
        gold: {owned: 100}
      }
    };
    expect(reducer(testState, buyGood('tool', 5, 2)).resources.gold).toEqual({
      owned: 90
    });
  });

  it('should increase good on trade purchase', () => {
    const testState = {
      resources: {
        gold: {owned: 100},
        tool: {owned: 0}
      }
    };
    expect(reducer(testState, buyGood('tool', 5, 2)).resources.tool).toEqual({
     owned: 5
    });
  });

  it('should increase gold on trade sale', () => {
    const testState = {
      resources: {
        gold: {owned: 100}
      }
    };
    expect(reducer(testState, sellGood('tool', 5, 2)).resources.gold).toEqual({
      owned: 110
    });
  });

  it('should decrease good on trade sale', () => {
    const testState = {
      resources: {
        gold: {owned: 100},
        tool: {owned: 15}
      }
    };
    expect(reducer(testState, sellGood('tool', 5, 2)).resources.tool).toEqual({
     owned: 10
    });
  });

  const testBaseWarehouse = {
    upgradesTo: 'testupgradedwarehouse',
    upgradeCost: {
      gold: 100,
      wood: 1
    },
    capacity: 40
  };
  const testUpgradedWarehouse = {
    capacity: 10
  }
  it('should deduct cost on warehouse upgrade', () => {
    const testState = {
      type: 'testwarehouse',
      resources: {
        gold: {owned: 300},
        wood: {owned: 40}
      }
    };
    Buildings['testwarehouse'] = testBaseWarehouse;
    Buildings['testupgradedwarehouse'] = testUpgradedWarehouse;
    expect(reducer(testState, upgradeWarehouse()).resources).toEqual({
      gold: {owned: 200},
      wood: {owned: 39}
    });
  });

  it('should increase warehouse capacity on warehouse upgrade', () => {
    const testState = {
      type: 'testwarehouse',
      resources: {
        gold: {owned: 300},
        wood: {owned: 40}
      },
      totalCapacity: 20
    };
    Buildings['testwarehouse'] = testBaseWarehouse;
    Buildings['testupgradedwarehouse'] = testUpgradedWarehouse;
    expect(reducer(testState, upgradeWarehouse()).totalCapacity).toEqual(30);
  });

  it('should set warehouse ID on warehouse upgrade', () => {
    const testState = {
      type: 'testwarehouse',
      resources: {
        gold: {owned: 300},
        wood: {owned: 40}
      },
      totalCapacity: 20
    };
    Buildings['testwarehouse'] = testBaseWarehouse;
    Buildings['testupgradedwarehouse'] = testUpgradedWarehouse;
    expect(reducer(testState, upgradeWarehouse()).type).toEqual('testupgradedwarehouse');
  });

  it('should should maintain state if warehouse cannot upgrade', () => {
    const testState = {
      type: 'testupgradedwarehouse',
      resources: {
        gold: {owned: 300},
        wood: {owned: 40}
      },
      totalCapacity: 20
    };
    Buildings['testwarehouse'] = testBaseWarehouse;
    Buildings['testupgradedwarehouse'] = testUpgradedWarehouse;
    expect(reducer(testState, upgradeWarehouse())).toEqual(testState);
  });

  it('should deduct gold cost if trader is dismissed', () => {
    const testState = {
      resources: {
        gold: {owned: 1000}
      }
    };
    expect(reducer(testState, dismissTrader(50)).resources.gold.owned).toEqual(950);
  });
});
