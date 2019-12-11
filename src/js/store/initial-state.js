const INITIAL_STATE = {
  island: {
    level: 1,
    title: 'Small Settlement',
    name: 'Townsville'
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
    stonemason: {
      id: 'stonemason',
      owned: 0,
      cost: {
        gold: 400,
        wood: 2,
        tool: 2
      }
    },
    oremine: {
      id: 'oremine',
      owned: 0,
      cost: {
        gold: 900,
        wood: 12,
        tool: 2,
        stone: 2
      }
    },
    charcoalhut: {
      id: 'charcoalhut',
      owned: 0,
      cost: {
        gold: 250,
        wood: 3,
        tool: 2,
        stone: 2
      }
    },
    smelter: {
      id: 'smelter',
      owned: 0,
      cost: {
        gold: 600,
        wood: 10,
        tool: 5,
        stone: 2
      }
    },
    toolmaker: {
      id: 'toolmaker',
      owned: 0,
      cost: {
        gold: 500,
        wood: 8,
        tool: 5,
        stone: 2
      }
    },
    ropeyard: {
      id: 'ropeyard',
      owned: 0,
      cost: {
        gold: 700,
        wood: 12,
        tool: 5
      }
    },
    smallshipyard: {
      id: 'smallshipyard',
      owned: 0,
      cost: {
        gold: 680,
        wood: 10,
        tool: 5,
        stone: 4
      }
    },
    smallstorehouse: {
      id: 'smallstorehouse',
      owned: 0,
      cost: {
        gold: 1020,
        wood: 4,
        tool: 4,
        stone: 1
      }
    },
    repaircrane: {
      id: 'repaircrane',
      owned: 0,
      cost: {
        gold: 1020,
        wood: 5,
        tool: 5,
        stone: 9
      }
    },
    // defensetower: {
    //   id: 'defensetower',
    //   owned: 0,
    //   cost: {
    //     gold: 1520,
    //     wood: 2,
    //     tool: 8,
    //     stone: 12
    //   }
    // },
    // carpenter: {
    //   id: 'carpenter',
    //   owned: 0,
    //   cost: {
    //     gold: 200,
    //     wood: 5,
    //     tool: 5
    //   }
    // },
    // firestation: {
    //   id: 'firestation',
    //   owned: 0,
    //   cost: {
    //     gold: 1000,
    //     wood: 5,
    //     tool: 5,
    //     stone: 10
    //   }
    // },
    tavern: {
      id: 'tavern',
      owned: 0,
      cost: {
        gold: 1000,
        tool: 5,
        stone: 10
      }
    },
    alms: {
      id: 'alms',
      owned: 0,
      cost: {
        gold: 200,
        wood: 5,
        tool: 5
      }
    },
    wheatfield: {
      id: 'wheatfield',
      owned: 0,
      cost: {
        gold: 200,
        wood: 3,
        tool: 2
      }
    },
    mill: {
      id: 'mill',
      owned: 0,
      cost: {
        gold: 800,
        wood: 8,
        tool: 4,
        stone: 4
      }
    },
    bakery: {
      id: 'bakery',
      owned: 0,
      cost: {
        gold: 700,
        wood: 5,
        tool: 5,
        stone: 5
      }
    },
    weaponsmith: {
      id: 'weaponsmith',
      owned: 0,
      cost: {
        gold: 1500,
        wood: 3,
        tool: 5,
        stone: 10
      }
    },
    largeshipyard: {
      id: 'largeshipyard',
      owned: 0,
      cost: {
        gold: 2120,
        wood: 20,
        tool: 25,
        stone: 46
      }
    },
    hopsfield: {
      id: 'hopsfield',
      owned: 0,
      cost: {
        gold: 200,
        wood: 5,
        tool: 2,
        stone: 4
      }
    },
    brewery: {
      id: 'brewery',
      owned: 0,
      cost: {
        gold: 600,
        wood: 5,
        tool: 4,
        stone: 6
      }
    },
    potashpit: {
      id: 'potashpit',
      owned: 0,
      cost: {
        gold: 500,
        wood: 6,
        tool: 4,
        stone: 8
      }
    },
    glasssmelter: {
      id: 'glasssmelter',
      owned: 0,
      cost: {
        gold: 1200,
        wood: 10,
        tool: 5,
        stone: 12
      }
    },
    church: {
      id: 'church',
      owned: 0,
      cost: {
        gold: 5000,
        wood: 30,
        tool: 10,
        stone: 40,
        glass: 25
      }
    },
    saltmine: {
      id: 'saltmine',
      owned: 0,
      cost: {
        gold: 800,
        wood: 11,
        tool: 4,
        stone: 5
      }
    },
    saltworks: {
      id: 'saltworks',
      owned: 0,
      cost: {
        gold: 900,
        wood: 3,
        tool: 5,
        stone: 6
      }
    },
    pigfarm: {
      id: 'pigfarm',
      owned: 0,
      cost: {
        gold: 400,
        wood: 4,
        tool: 4,
        stone: 3
      }
    },
    tannery: {
      id: 'tannery',
      owned: 0,
      cost: {
        gold: 700,
        wood: 7,
        tool: 3,
        stone: 8
      }
    },
    papermill: {
      id: 'papermill',
      owned: 0,
      cost: {
        gold: 1500,
        wood: 5,
        tool: 5,
        stone: 12
      }
    },
    printingpress: {
      id: 'printingpress',
      owned: 0,
      cost: {
        gold: 1800,
        wood: 5,
        tool: 5,
        stone: 12,
        glass: 10
      }
    },
    prison: {
      id: 'prison',
      owned: 0,
      cost: {
        gold: 7000,
        wood: 20,
        tool: 30,
        stone: 60,
        glass: 24
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
