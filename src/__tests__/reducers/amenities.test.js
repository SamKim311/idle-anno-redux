import reducer from '../../js/reducers/amenities';
import { tick } from '../../js/actions/game';

describe('amenity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return the same state for non-tick', () => {
    const someState = {
      data: 'value'
    };
    expect(reducer(someState, { type: 'other type' })).toBe(someState);
  });

  it('should not affect other slices for tick', () => {
    const testState = {
      otherSlice: {
        shouldBe: 'leftAlone'
      },
      buildings: {
        owned: {}
      }
    };
    expect(reducer(testState, tick(1))).toEqual({...testState, amenities: {}});
  });

  it('should put an amenity object into the state', () => {
    const testState = {
      buildings: {
        owned: {}
      }
    };
    expect(reducer(testState, tick(1))).toEqual({...testState, amenities: {}});
  });

  it('should add the amenity of an amenity building', () => {
    const testState = {
      buildings: {
        owned: {
          1: {
            category: 'AMENITY',
            produces: {
              testAmenity: 1
            }
          }
        }
      }
    };
    expect(reducer(testState, tick(1))).toHaveProperty('amenities.testAmenity');
  });

  it('should add amenity amount according to tick time', () => {
    const testState = {
      buildings: {
        owned: {
          1: {
            category: 'AMENITY',
            produces: {
              testAmenity: 2.5
            }
          }
        }
      }
    };
    expect(reducer(testState, tick(60)).amenities.testAmenity).toEqual(2.5);
  });
});
