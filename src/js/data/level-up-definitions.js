export const unlockThresholds = [
  ['peasant', 60],
  ['peasant', 90],
  ['citizen', 1],
  ['citizen', 240],
  ['citizen', 355],
  ['patrician', 1],
  ['patrician', 510],
  ['patrician', 690],
  ['patrician', 940],
  ['patrician', 1190],
  ['noble', 950],
  ['noble', 2200],
  ['noble', 3500],
  ['noble', 7500]
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
    resources: ['hemp', 'linen', 'stone', 'spice'],
    buildings: ['hempfarm', 'weavers', 'stonemason'],
    housing: ['citizenhouse']
  },
  // 240 citizen
  {
    resources: ['ore', 'charcoal', 'iron', 'rope'],
    buildings: ['oremine', 'charcoalhut', 'smelter', 'toolmaker', 'ropeyard', 'smallshipyard']
  },
  // 355 citizen
  {
    title: 'Village',
    buildings: ['smallstorehouse', 'repaircrane', 'tavern', 'alms']
  },
  // 1 patrician
  {
    population: 'patrician',
    resources: ['wheat', 'flour', 'bread', 'weapon'],
    buildings: ['wheatfield', 'mill', 'bakery', 'weaponsmith', 'largeshipyard'],
    housing: ['patricianhouse']
  },
  // 510 patrician
  {
    title: 'Small Town',
    resources: ['hop', 'ale', 'potash', 'quartz', 'glass'],
    buildings: ['hopsfield', 'brewery', 'potashpit', 'glasssmelter', 'church']
  },
  // 690 patrician
  {
    resources: ['brine', 'salt', 'hide', 'leather'],
    buildings: ['saltmine', 'saltworks', 'pigfarm', 'tannery']
  },
  // 940 patrician
  {
    resources: ['paper', 'book', 'ink'],
    buildings: ['papermill', 'printingpress']
  },
  // 1190 patrician
  {
    title: 'City',
    buildings: ['prison']
  },
  // 950 noble
  {
    title: 'Major City'
  },
  // 2200 noble
  {
    title: 'Commercial Center'
  },
  // 3500 noble
  {
    title: 'Metropolis'
  },
  // 7500 noble
  {
    title: 'Cosmopolitan City'
  }
];
