export const unlockThresholds = [
  ['peasant', 60],
  ['peasant', 90],
  ['citizen', 1],
  ['citizen', 355],
  ['patrician', 510],
  ['patrician', 1190],
  ['nobleman', 950],
  ['nobleman', 2200],
  ['nobleman', 3500],
  ['nobleman', 7500]
];

export const unlocks = [
  // initial state
  {
    title: 'Small Settlement',
    buildings: ['marketplace', 'fishinghut', 'lumberjackhut'],
    population: 'peasant',
    resources: ['gold', 'wood', 'tool', 'fish']
  },
  // 60 peasants
  {
    buildings: ['orchard', 'ciderfarm'],
    resources: ['apple', 'cider']
  },
  // 90 peasants
  {
    title: 'Settlement',
    buildings: ['chapel']
  },
  // 1 citizen
  {
    population: 'citizen',
    resources: ['hemp', 'linen', 'stone', 'stonebrick', 'spice'],
    buildings: ['hempfarm', 'weavers', 'quarry', 'stonemason'],
    housing: ['citizenhouse']
  }
];
