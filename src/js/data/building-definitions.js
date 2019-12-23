export const BUILDING_CATEGORY = {
  AMENITY: 'AMENITY',
  PRODUCER: 'PRODUCER',
  HOUSE: 'HOUSE',
  WAREHOUSE: 'WAREHOUSE',
  NAVAL: 'NAVAL'
}

export const BUILDING_SUB_CATEGORY = {
  SHIPYARD: 'SHIPYARD'
}

export const buildingStatus = {
  AWAITING_RESOURCES: 'AWAITING_RESOURCES',
  WORKING: 'WORKING',
  OUTBOX_FULL: 'OUTBOX_FULL',
  DISABLED: 'DISABLED'
}

const BuildingDefinitions = {
  // Amenities
  marketplace: {
    name: 'Marketplace',
    abbreviation: 'M',
    description: 'Provides a place for villagers to meet',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      community: 2.5
    },
    upkeep: 10
  },
  chapel: {
    name: 'Chapel',
    abbreviation: 'Ch',
    description: 'A basic building for villagers to worship',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      faith: 3
    },
    upkeep: 15
  },
  tavern: {
    name: 'Tavern',
    abbreviation: 'Tv',
    description: 'Provides citizens a place to drink',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      entertainment: 9
    },
    upkeep: 30
  },
  church: {
    name: 'Church',
    abbreviation: 'Ch',
    description: 'Provides a larger location to worship',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      faith: 12
    },
    upkeep: 40
  },
  prison: {
    name: 'Prison',
    abbreviation: 'Pr',
    description: 'Jails bad folks. Provides a sense of security',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      security: 16
    }
  },

  // Producers
  fishinghut: {
    name: 'Fisherman\'s Hut',
    abbreviation: 'F',
    description: 'Gathers fish',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      fish: 1
    },
    produceTime: 30,
    upkeep: 15,
    disabledUpkeep: 5
  },
  lumberjackhut: {
    name: 'Lumberjack\'s Hut',
    abbreviation: 'L',
    description: 'Gathers wood',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      wood: 1
    },
    produceTime: 40,
    upkeep: 5,
    disabledUpkeep: 0
  },
  orchard: {
    name: 'Orchard',
    abbreviation: 'O',
    description: 'Grows apples to be turned into cider',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      apple: 1
    },
    produceTime: 100,
    upkeep: 5,
    disabledUpkeep: 0
  },
  ciderfarm: {
    name: 'Cidery',
    abbreviation: 'C',
    description: 'Processes apples into cider',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      apple: 1
    },
    produces: {
      cider: 1
    },
    produceTime: 40,
    upkeep: 15,
    disabledUpkeep: 5
  },
  hempfarm: {
    name: 'Hemp Plantation',
    abbreviation: 'H',
    description: 'Grows hemp',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      hemp: 1
    },
    produceTime: 60,
    upkeep: 20,
    disabledUpkeep: 10
  },
  weavers: {
    name: 'Weaver\'s Hut',
    abbreviation: 'W',
    description: 'Uses hemp to create clothing',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      hemp: 1
    },
    produces: {
      linen: 1
    },
    produceTime: 30,
    upkeep: 25,
    disabledUpkeep: 12
  },
  stonemason: {
    name: 'Stonemason',
    abbreviation: 'Sm',
    description: 'Turns raw stone into stone bricks',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      stone: 1
    },
    produceTime: 30,
    upkeep: 20,
    disabledUpkeep: 10
  },
  oremine: {
    name: 'Ore mine',
    abbreviation: 'Om',
    description: 'Mines raw ore from the ground',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      ore: 1
    },
    produceTime: 30,
    upkeep: 20,
    disabledUpkeep: 10
  },
  charcoalhut: {
    name: 'Charcoal Burner\'s Hut',
    abbreviation: 'Cc',
    description: 'Burns wood down into charcoal',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      charcoal: 1
    },
    produceTime: 30,
    upkeep: 10,
    disabledUpkeep: 0
  },
  smelter: {
    name: 'Iron Smelter',
    abbreviation: 'I',
    description: 'Converts raw ore to iron ingots',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      ore: 1,
      charcoal: 1
    },
    produces: {
      iron: 1
    },
    produceTime: 30,
    upkeep: 20,
    disabledUpkeep: 10
  },
  toolmaker: {
    name: 'Toolmaker\'s Workshop',
    abbreviation: 'TW',
    description: 'Creates tools out of iron',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      iron: 0.5
    },
    produces: {
      tool: 1
    },
    produceTime: 30,
    upkeep: 30,
    disabledUpkeep: 15
  },
  ropeyard: {
    name: 'Ropeyard',
    abbreviation: 'Rp',
    description: 'Creates rope from hemp',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      hemp: 0.5
    },
    produces: {
      rope: 1
    },
    produceTime: 30,
    upkeep: 40,
    disabledUpkeep: 20
  },
  wheatfield: {
    name: 'Wheat Field',
    abbreviation: 'W',
    description: 'Grows wheat',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      wheat: 1
    },
    produceTime: 30,
    upkeep: 5,
    disabledUpkeep: 0
  },
  mill: {
    name: 'Flour Mill',
    abbreviation: 'FM',
    description: 'Grinds wheat into flour',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      wheat: 1
    },
    produces: {
      flour: 1
    },
    produceTime: 15,
    upkeep: 30,
    disabledUpkeep: 15
  },
  bakery: {
    name: 'Bakery',
    abbreviation: 'Bk',
    description: 'Bakes flour into bread',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      flour: 1
    },
    produces: {
      bread: 1
    },
    produceTime: 15,
    upkeep: 30,
    disabledUpkeep: 15
  },
  weaponsmith: {
    name: 'Weaponsmith',
    abbreviation: 'Ws',
    description: 'Forges weapons',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      iron: 1
    },
    produces: {
      weapon: 1
    },
    produceTime: 30,
    upkeep: 30,
    disabledUpkeep: 15
  },
  hopsfield: {
    name: 'Hops Farm',
    abbreviation: 'HF',
    description: 'Grows Hops',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      hop: 1
    },
    produceTime: 30,
    upkeep: 10,
    disabledUpkeep: 5
  },
  brewery: {
    name: 'Brewery',
    abbreviation: 'Bw',
    description: 'Brews Ale',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      hop: 1.333,
      wheat: 1.333
    },
    produces: {
      ale: 1
    },
    produceTime: 40,
    upkeep: 30,
    disabledUpkeep: 15
  },
  potashpit: {
    name: 'Potash Pit',
    abbreviation: 'Pp',
    description: 'Produces Potash',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      potash: 1
    },
    produceTime: 30,
    upkeep: 30,
    disabledUpkeep: 15
  },
  glasssmelter: {
    name: 'Glass Smelter',
    abbreviation: 'GS',
    description: 'Melts quartz down into glass',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      potash: 1,
      quartz: 0.5
    },
    produces: {
      glass: 1
    },
    produceTime: 60,
    upkeep: 30,
    disabledUpkeep: 15
  },
  saltmine: {
    name: 'Salt Mine',
    abbreviation: 'SM',
    description: 'Extracts brine from underground deposits',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      brine: 1
    },
    produceTime: 15,
    upkeep: 20,
    disabledUpkeep: 10
  },
  saltworks: {
    name: 'Saltworks',
    abbreviation: 'SW',
    description: 'Refines brine into salt',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      brine: 1,
      charcoal: 0.5
    },
    produces: {
      salt: 1
    },
    produceTime: 15,
    upkeep: 25,
    disabledUpkeep: 15
  },
  pigfarm: {
    name: 'Pig Farm',
    abbreviation: 'PF',
    description: 'Raises pigs for slaughter. Produces hides',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      hide: 1
    },
    produceTime: 30,
    upkeep: 15,
    disabledUpkeep: 5
  },
  tannery: {
    name: 'Tannery',
    abbreviation: 'Tn',
    description: 'Tans hides into leather',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      hide: 1,
      salt: 0.5
    },
    produces: {
      leather: 1
    },
    produceTime: 15,
    upkeep: 20,
    disabledUpkeep: 10
  },
  papermill: {
    name: 'Paper Mill',
    abbreviation: 'PM',
    description: 'Produces Paper',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      wood: 1
    },
    produces: {
      paper: 1
    },
    produceTime: 20,
    upkeep: 50,
    disabledUpkeep: 25
  },
  printingpress: {
    name: 'Printing Press',
    abbreviation: 'PP',
    description: 'Prints books',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      paper: 0.5,
      ink: 1
    },
    produces: {
      book: 1
    },
    produceTime: 20,
    upkeep: 50,
    disabledUpkeep: 25
  },


  // Houses
  alms: {
    name: 'Alms House',
    abbreviation: 'Ah',
    description: 'Provides shelter for 500 beggars',
    category: BUILDING_CATEGORY.HOUSE,
    upkeep: 0,
    populationCategory: 'beggar',
    populationCap: 500
  },
  peasanthouse: {
    name: 'Peasant Shack',
    description: 'Basic home for villagers. Houses 8',
    category: BUILDING_CATEGORY.HOUSE,
    upkeep: 0,
    populationCategory: 'peasant',
    populationCap: 8,
    ascendsTo: 'citizenhouse'
  },
  citizenhouse: {
    name: 'Citizen House',
    description: 'Home for citizens',
    category: BUILDING_CATEGORY.HOUSE,
    upkeep: 0,
    populationCategory: 'citizen',
    populationCap: 15,
    ascendsTo: 'patricianhouse',
    cost: {
      wood: 1,
      tool: 1
    }
  },
  patricianhouse: {
    name: 'Patrician House',
    description: 'Home for patricians',
    category: BUILDING_CATEGORY.HOUSE,
    upkeep: 0,
    populationCategory: 'patrician',
    populationCap: 25,
    ascendsTo: 'noblehouse',
    cost: {
      wood: 1,
      tool: 1,
      stone: 4
    }
  },
  noblehouse: {
    name: 'Noble House',
    description: 'Home for nobles',
    category: BUILDING_CATEGORY.HOUSE,
    upkeep: 0,
    populationCategory: 'noble',
    populationCap: 40,
    cost: {
      wood: 1,
      tool: 1,
      stone: 3,
      glass: 4
    }
  },

  // Warehouses
  smallwarehouse: {
    name: 'Small Warehouse',
    description: 'Basic warehouse for your island',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 10,
    couriers: 3,
    capacity: 40,
    upgradesTo: 'mediumwarehouse',
    upgradeCost: {
      gold: 150,
      wood: 2,
      tool: 3,
      stone: 4
    }
  },
  mediumwarehouse: {
    name: 'Medium Warehouse',
    description: 'Expanded warehouse',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 15,
    couriers: 1,
    capacity: 10,
    upgradesTo: 'largewarehouse',
    upgradeCost: {
      gold: 350,
      wood: 2,
      tool: 1,
      stone: 3,
      glass: 2
    }
  },
  largewarehouse: {
    name: 'Large Warehouse',
    description: 'Large Warehouse',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 20,
    couriers: 1,
    capacity: 10
  },
  smallstockpile: {
    name: 'Small Stockpile',
    abbreviation: 'SS',
    description: 'Small depot. Provides 1 courier',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 10,
    couriers: 1,
    capacity: 0,
    upgradesTo: 'mediumstockpile',
    upgradeCost: {
      gold: 200,
      wood: 3,
      tool: 1,
      stone: 3
    }
  },
  mediumstockpile: {
    name: 'Medium Stockpile',
    abbreviation: 'MS',
    description: 'Medium depot. Provides 2 couriers, and 5 storage',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 20,
    couriers: 2,
    capacity: 5,
    upgradesTo: 'largestockpile',
    upgradeCost: {
      gold: 300,
      wood: 3,
      tool: 1,
      stone: 3,
      glass: 2
    }
  },
  largestockpile: {
    name: 'Large Stockpile',
    abbreviation: 'LS',
    description: 'Large depot. Provides 3 couriers, and 10 storage',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 30,
    couriers: 3,
    capacity: 5
  },
  smallstorehouse: {
    name: 'Small Storehouse',
    abbreviation: 'So',
    description: 'Increases the warehouse capacity',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 15,
    couriers: 0,
    capacity: 15
  },

  // Shipyard
  smallshipyard: {
    name: 'Small Shipyard',
    description: 'Allows construction of small ships',
    category: BUILDING_CATEGORY.NAVAL,
    subCategory: BUILDING_SUB_CATEGORY.SHIPYARD,
    upkeep: 10,
    shipsBuilt: ['smalltrader', 'smallwarship']
  },
  largeshipyard: {
    name: 'Large Shipyard',
    description: 'Allows construction of large vessels',
    category: BUILDING_CATEGORY.NAVAL,
    subCategory: BUILDING_SUB_CATEGORY.SHIPYARD,
    upkeep: 20,
    shipsBuilt: ['largetrader', 'largewarship']
  },
  repaircrane: {
    name: 'Repair Crane',
    description: 'Repairs ships that are docked here',
    category: BUILDING_CATEGORY.NAVAL,
    upkeep: 20
  }
};

export default BuildingDefinitions;
