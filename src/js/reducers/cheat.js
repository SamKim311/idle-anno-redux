import { ACTIONS } from '../actions/cheats';

export default function(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case ACTIONS.SET_TIME_FACTOR:
      return {
        ...state,
        cheat: {
          timeFactor: payload.timeFactor
        }
      }
    default:
      return state;
  }
}
