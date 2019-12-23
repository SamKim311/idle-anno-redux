export const ACTIONS = {
  EMBARK: 'EMBARK'
};

export function embark(fleetId, destination) {
    return { type: ACTIONS.EMBARK, payload: { fleetId: fleetId, destination: destination }};
};
