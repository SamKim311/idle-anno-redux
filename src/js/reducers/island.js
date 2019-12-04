import { ACTIONS as gameActions } from '../actions/game';

export default function(island={}, action) {
  const payload = action.payload;
  switch (action.type) {
    case gameActions.CHANGE_NAME: {
      return {...island, name: payload.name};
    }
    default:
      return island;
  }
}
