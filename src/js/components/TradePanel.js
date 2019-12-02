import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Resources from '../reducers/resource-definitions';
import Traders from '../data/trader-info';
import { buyGood, sellGood } from '../actions/trade';

import '../../style/trade.css';

const TradePanel = () => {
  const traderState = useSelector(state => state.trader, shallowEqual);
  const warehouse = useSelector(state => state.warehouse, shallowEqual);
  const dispatch = useDispatch();

  if (traderState.traderId === 0) {
    return (
      <div className='trade-panel'>
      </div>
    );
  }

  const resources = warehouse.resources;
  const goldOnHand = resources.gold.owned;

  const goodsToTrade = Object.entries(traderState.wares).map(([good, tradeData]) => {
    const goodInWarehouse = resources[good];
    const canBuy = (goldOnHand >= tradeData.sellPrice) && (tradeData.held > 0) && (goodInWarehouse.owned + goodInWarehouse.pending - goodInWarehouse.reserved < warehouse.totalCapacity);
    const canSell = (tradeData.held < traderState.maxCapacity) && (goodInWarehouse.owned > 0);
    return <div className='trade-good' key={good}>
      {Resources[good].name} available: {tradeData.held}
      <button onClick={() => dispatch(buyGood(good, 1, tradeData.sellPrice))} disabled={!canBuy}>Buy for {tradeData.sellPrice} Gold</button>
      <button onClick={() => dispatch(sellGood(good, 1, tradeData.buyPrice))} disabled={!canSell}>Sell for {tradeData.buyPrice} Gold</button>
    </div>
  });

  return (
    <div className='trade-panel'>
      {goodsToTrade}
    </div>
  );
};

export default TradePanel;
