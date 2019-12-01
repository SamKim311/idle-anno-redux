export const BUILDING_CATEGORY = {
  AMENITY: 'AMENITY',
  PRODUCER: 'PRODUCER',
  HOUSE: 'HOUSE',
  WAREHOUSE: 'WAREHOUSE'
}

const BuildingDefinitions = {
  // Amenities
  marketplace: {
    name: 'Marketplace',
    description: 'Provides a place for villagers to meet',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      community: 2.5
    },
    upkeep: 10
  },
  chapel: {
    name: 'Chapel',
    description: 'A basic building for villagers to worship',
    category: BUILDING_CATEGORY.AMENITY,
    produces: {
      faith: 1.5
    },
    upkeep: 15
  },

  // Producers
  fishinghut: {
    name: 'Fisherman\'s Hut',
    description: 'Gathers fish',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      fish: 1
    },
    produceTime: 30,
    upkeep: 15
  },
  lumberjackhut: {
    name: 'Lumberjack\'s Hut',
    description: 'Gathers wood',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      wood: 1
    },
    produceTime: 40,
    upkeep: 5
  },
  orchard: {
    name: 'Orchard',
    description: 'Grows apples to be turned into cider',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      apple: 1
    },
    produceTime: 80,
    upkeep: 0
  },
  ciderfarm: {
    name: 'Cider Farm',
    description: 'Processes apples into cider',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      apple: 1
    },
    produces: {
      cider: 1
    },
    produceTime: 40,
    upkeep: 15
  },
  hempfarm: {
    name: 'Hemp Plantation',
    description: 'Grows hemp',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      hemp: 1
    },
    produceTime: 60,
    upkeep: 20
  },
  weavers: {
    name: 'Weaver\'s Hut',
    description: 'Uses hemp to create clothing',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      hemp: 1
    },
    produces: {
      linen: 1
    },
    produceTime: 30,
    upkeep: 25
  },
  quarry: {
    name: 'Stone Quarry',
    description: 'Gathers raw stone',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {},
    produces: {
      stone: 1
    },
    produceTime: 30,
    upkeep: 20
  },
  stonemason: {
    name: 'Stonemason',
    description: 'Turns raw stone into useable bricks',
    category: BUILDING_CATEGORY.PRODUCER,
    consumes: {
      stone: 1
    },
    produces: {
      stonebrick: 1
    },
    produceTime: 30,
    upkeep: 20
  },

  // Houses
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

  // Warehouses
  smallwarehouse: {
    name: 'Small Warehouse',
    description: 'Basic warehouse for your island',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 10,
    couriers: 3,
    capacity: 40
  },
  smallstockpile: {
    name: 'Small Stockpile',
    description: 'Small depot. Provides 1 courier',
    category: BUILDING_CATEGORY.WAREHOUSE,
    upkeep: 10,
    couriers: 1,
    capacity: 0
  }
};

export default BuildingDefinitions;
