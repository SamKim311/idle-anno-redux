const INITIAL_STATE = {
  island: {
    level: 1,
    title: 'Small Settlement',
    name: 'New Island'
  },
  construction: {
    peasanthouse: {
      id: 'peasanthouse',
      owned: 0,
      cost: {
        wood: 2
      },
      unlocked: true
    },
    marketplace: {
      id: 'marketplace',
      owned: 0,
      cost: {
        gold: 400,
        wood: 5,
        tool: 3
      },
      unlocked: true
    },
    fishinghut: {
      id: 'fishinghut',
      owned: 0,
      cost: {
        gold: 100,
        wood: 3,
        tool: 2
      },
      unlocked: true
    },
    lumberjackhut: {
      id: 'lumberjackhut',
      owned: 0,
      cost: {
        gold: 50,
        tool: 2
      },
      unlocked: true
    },
    smallstockpile: {
      id: 'smallstockpile',
      owned: 0,
      cost: {
        gold: 200,
        wood: 2,
        tool: 3
      },
      unlocked: true
    },
    orchard: {
      id: 'orchard',
      owned: 0,
      cost: {
        gold: 25
      },
      unlocked: false
    },
    ciderfarm: {
      id: 'ciderfarm',
      owned: 0,
      cost: {
        gold: 100,
        wood: 5,
        tool: 1
      },
      unlocked: false
    },
    chapel: {
      id: 'chapel',
      owned: 0,
      cost: {
        gold: 800,
        wood: 12,
        tool: 5
      },
      unlocked: false
    },
    hempfarm: {
      id: 'hempfarm',
      owned: 0,
      cost: {
        gold: 400,
        wood: 5,
        tool: 2
      },
      unlocked: false
    },
    weavers: {
      id: 'weavers',
      owned: 0,
      cost: {
        gold: 400,
        wood: 5,
        tool: 3
      }
    },
    quarry: {
      id: 'quarry',
      owned: 0,
      cost: {
        gold: 400,
        wood: 2,
        tool: 2
      }
    },
    stonemason: {
      id: 'stonemason',
      owned: 0,
      cost: {
        gold: 400,
        wood: 2,
        tool: 2
      }
    }
  },
  buildings: {
    owned: {}
  },
  warehouse: {
    type: 'smallwarehouse',
    totalCapacity: 40,
    resources: {
      gold: {
        id: 'gold',
        owned: 5000,
        unlocked: true
      },
      tool: {
        id: 'tool',
        owned: 40,
        unlocked: true
      },
      fish: {
        id: 'fish',
        owned: 2,
        unlocked: true
      },
      wood: {
        id: 'wood',
        owned: 40,
        unlocked: true
      },
      apple: {
        id: 'apple',
        owned: 0,
        unlocked: false
      },
      cider: {
        id: 'cider',
        owned: 0,
        unlocked: false
      },
      hemp: {
        id: 'hemp',
        owned: 0,
        unlocked: false
      },
      spice: {
        id: 'spice',
        owned: 0,
        unlocked: false
      },
      linen: {
        id: 'linen',
        owned: 0,
        unlocked: false
      },
      stone: {
        id: 'stone',
        owned: 0,
        unlocked: false
      },
      stonebrick: {
        id: 'stonebrick',
        owned: 0,
        unlocked: false
      }
    },
  },
  couriers: {
    couriers:[],
    jobQueue: [],
    jobQueueMap: {}
  },
  housing: {
    types: {
      peasanthouse: {
        owned: 0,
        totalAscensionRights: 0,
        remainingAscensionRights: 0,
        unlocked: true,
      },
      citizenhouse: {
        owned: 0,
        totalAscensionRights: 0,
        remainingAscensionRights: 0,
        unlocked: false,
      },
      patricianhouse: {
        owned: 0,
        totalAscensionRights: 0,
        remainingAscensionRights: 0,
        unlocked: false,
      },
      noblehouse: {
        owned: 0,
        totalAscensionRights: 0,
        remainingAscensionRights: 0,
        unlocked: false,
      }
    },
    abodes: []
  },
  population: {
    beggar: {
      id: 'beggar',
      unlocked: true
    },
    peasant: {
      id: 'peasant',
      unlocked: true
    },
    citizen: {
      id: 'citizen',
      unlocked: false
    },
    patrician: {
      id: 'patrician',
      unlocked: false
    },
    noble: {
      id: 'noble',
      unlocked: false
    }
  }
};

export default INITIAL_STATE;
