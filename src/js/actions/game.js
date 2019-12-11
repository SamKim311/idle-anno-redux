export const ACTIONS = {
  INIT: 'INIT',
  TICK: 'TICK',
  SAVE_GAME: 'SAVE_GAME',
  LOAD_GAME: 'LOAD_GAME',
  RESET_SAVE: 'RESET_SAVE',
  CHANGE_NAME: 'CHANGE_NAME'
};

export function init() {
  return { type: ACTIONS.INIT };
}

export function tick(tickIntervalSeconds) {
  return { type: ACTIONS.TICK, payload: { tickIntervalSeconds: tickIntervalSeconds }};
}

export function saveGame() {
  return { type: ACTIONS.SAVE_GAME };
}

export function loadGame(saveState) {
  return { type: ACTIONS.LOAD_GAME, payload: { saveState: saveState }};
}

export function resetSave() {
  return { type: ACTIONS.RESET_SAVE };
}

export function changeName(name) {
  return { type: ACTIONS.CHANGE_NAME, payload: { name: name }};
}
