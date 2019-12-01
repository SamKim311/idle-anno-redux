export const filterUnlocked = (collectionObject) => {
  return Object.entries(collectionObject).reduce((accumulator, [key, value]) => {
    if (value.unlocked) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});
};

export const setAffordable = (buyable, resources) => {
  for (let [resource, amount] of Object.entries(buyable.cost)) {
    if (resources[resource].owned < amount) {
      return Object.assign({}, buyable, {canAfford: false});
    }
  }
  return Object.assign({}, buyable, {canAfford: true});
};

export const setAllAffordable = (buyableCollection, resources) => {
  return Object.entries(buyableCollection).reduce((accumulator, [buyableId, buyable]) => {
    accumulator[buyableId] = setAffordable(buyable, resources);
    return accumulator;
  }, {});
};
