export const ACTIONS = {
  SET_TIME_FACTOR: 'SET_TIME_FACTOR'
}

export function setTimeFactor(timeFactor) {
  return { type: ACTIONS.SET_TIME_FACTOR, payload: { timeFactor: timeFactor }};
}
