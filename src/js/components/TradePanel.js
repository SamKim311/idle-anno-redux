import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Resources from '../data/resource-definitions';
import Traders from '../data/trader-info';
import { buyGood, sellGood, dismissTrader } from '../actions/trade';
import { filterUnlocked } from '../selectors';

import '../../style/trade.css';

const TradePanel = () => {
  const traderState = useSelector(state => state.trader, shallowEqual);
  const warehouse = useSelector(state => state.warehouse, shallowEqual);
  const dispatch = useDispatch();

  if (traderState.traderId === 0) {
    return (
      <div className='trade-panel'>
        <h4>Your port is empty</h4>
        Timer: {(traderState.timeToLeave - traderState.timer).toFixed()}
      </div>
    );
  }

  const resources = filterUnlocked(warehouse.resources);
  const goldOnHand = resources.gold.owned;

  const goodsToTrade = Object.entries(traderState.wares).map(([good, tradeData]) => {
    const goodInWarehouse = resources[good];
    if (!goodInWarehouse) {
      // not unlocked, can't sell
      return null;
    }
    const canBuy = (goldOnHand >= tradeData.sellPrice) && (tradeData.held > 0) && (goodInWarehouse.owned + goodInWarehouse.pending - goodInWarehouse.reserved < warehouse.totalCapacity);
    const canSell = (tradeData.held < traderState.maxCapacity) && (goodInWarehouse.owned > 0);
    return <div className='trade-good' key={good}>
      {Resources[good].name} available: {tradeData.held}
      <button onClick={() => dispatch(buyGood(good, 1, tradeData.sellPrice))} disabled={!canBuy}>Buy for {tradeData.sellPrice} Gold</button>
      <button onClick={() => dispatch(sellGood(good, 1, tradeData.buyPrice))} disabled={!canSell}>Sell for {tradeData.buyPrice} Gold</button>
    </div>
  });

  const dismissFn = () => {
    dispatch(dismissTrader(traderState.dismissCost));
  }

  return (
    <div className='trade-panel'>
      <h4>{Traders[traderState.traderId].name} has visited your island!</h4>
      Timer: {(traderState.timeToLeave - traderState.timer).toFixed()}
      <button onClick={dismissFn}>Dismiss for {traderState.dismissCost} Gold</button>
      {goodsToTrade}
    </div>
  );
};

export default TradePanel;
