import reducer from '../../js/reducers/trader';
import { buyGood, sellGood } from '../../js/actions/trade';
import { tick } from '../../js/actions/game';

describe('trader reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      traderId: 0,
      timer: 0,
      timeToLeave: 300,
      wares: {}
    });
  });

  it('should increase timer on tick', () => {
    expect(reducer(undefined, tick(1.3)).timer).toEqual(1.3);
  });

  it('should reset timer on rollover', () => {
    const testState = {
      timer: 179.9,
      timeToLeave: 180
    };
    expect(reducer(testState, tick(1)).timer).toBeCloseTo(0.9, 5);
  });

  it('should assign new trader on rollover', () => {
    const testState = {
      traderId: 0,
      timer: 179.9,
      timeToLeave: 180
    };
    expect(reducer(testState, tick(1)).traderId).not.toEqual(0);
  });

  it('should not assign new trader on tick', () => {
    const testState = {
      traderId: 0,
      timer: 0,
      timeToLeave: 180
    };
    expect(reducer(testState, tick(1)).traderId).toEqual(0);
  });

  it('should refresh wares on rollover', () => {
    const testState = {
      traderId: 0,
      timer: 179.9,
      timeToLeave: 180,
      wares: {
        tool: {
          held: 2
        }
      }
    };
    expect(reducer(testState, tick(1)).wares.tool.held).toEqual(40);
  });

  it('should not refresh wares on tick', () => {
    const testState = {
      traderId: 0,
      timer: 10,
      timeToLeave: 180,
      wares: {
        tool: {
          held: 2
        }
      }
    };
    expect(reducer(testState, tick(1)).wares.tool.held).toEqual(2);
  });

  it('should decrement held when good is bought', () => {
    const testState = {
      wares: {
        tool: {
          held: 40
        }
      }
    };
    expect(reducer(testState, buyGood('tool', 2, 1)).wares.tool.held).toEqual(38);
  });

  it('should increment held when good is sold', () => {
    const testState = {
      wares: {
        tool: {
          held: 20
        }
      }
    };
    expect(reducer(testState, sellGood('tool', 2, 1)).wares.tool.held).toEqual(22);
  });

});
