export const ACTIONS = {
  INIT: 'INIT',
  TICK: 'TICK',
  LOAD_GAME: 'LOAD_GAME',
  CHANGE_NAME: 'CHANGE_NAME'
};

export function init() {
  return { type: ACTIONS.INIT };
}

export function tick(tickIntervalSeconds) {
  return { type: ACTIONS.TICK, payload: { tickIntervalSeconds: tickIntervalSeconds }};
}

export function loadGame(saveState) {
  return { type: ACTIONS.LOAD_GAME, payload: { saveState: saveState }};
}

export function changeName(name) {
  return { type: ACTIONS.CHANGE_NAME, payload: { name: name }};
}
