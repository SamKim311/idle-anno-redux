export const ACTIONS = {
  BUY_GOODS: 'BUY_GOODS',
  SELL_GOODS: 'SELL_GOODS'
};

export function buyGood(goodToBuy, amount, atPrice) {
  return { type: ACTIONS.BUY_GOODS, payload: { product: goodToBuy, amount: amount, atPrice: atPrice }};
};

export function sellGood(goodToSell, amount, atPrice) {
  return { type: ACTIONS.SELL_GOODS, payload: { product: goodToSell, amount: amount, atPrice: atPrice }};
};
