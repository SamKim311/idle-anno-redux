const PopulationDefinitions = {
  beggar: {
    name: 'Beggar',
    taxRate: 0,
    consumes: {
      fish: {
        quantity: .7,
        weight: 0
      },
      cider: {
        quantity: .3,
        weight: 0
      }
    }
  },
  peasant: {
    name: 'Peasant',
    taxRate: 0.8,
    consumes: {
      community: {
        quantity: 1,
        weight: 25
      },
      fish: {
        quantity: 1,
        weight: 25
      },
      cider: {
        quantity: 0.44,
        weight: 25
      },
      faith: {
        quantity: 1,
        weight: 25
      }
    }
  },
  citizen: {
    name: 'Citizen',
    taxRate: 0.95,
    consumes: {
      fish: {
        quantity: .4,
        weight: 8
      },
      spice: {
        quantity: .4,
        weight: 12
      },
      cider: {
        quantity: .44,
        weight: 16
      },
      linen: {
        quantity: 0.42,
        weight: 16
      },
      community: {
        quantity: 1,
        weight: 16
      },
      faith: {
        quantity: 1,
        weight: 16
      },
      entertainment: {
        quantity: 1,
        weight: 16
      }
    }
  },
  patrician: {
    name: 'Patrician',
    taxRate: 1.05,
    consumes: {
      fish: {
        quantity: .22,
        weight: 2.8
      },
      spice: {
        quantity: .22,
        weight: 4.9
      },
      bread: {
        quantity: .55,
        weight: 6.3
      },
      cider: {
        quantity: .23,
        weight: 4
      },
      ale: {
        quantity: .24,
        weight: 9
      },
      linen: {
        quantity: .19,
        weight: 4.5
      },
      leather: {
        quantity: .28,
        weight: 8.5
      },
      community: {
        quantity: 1,
        weight: 12
      },
      faith: {
        quantity: 1,
        weight: 12
      },
      entertainment: {
        quantity: 1,
        weight: 12
      },
      book: {
        quantity: .16,
        weight: 12
      },
      security: {
        quantity: 1,
        weight: 12
      }
    }
  },
  noble: {
    name: 'Noble',
    taxRate: 1.15,
    consumes: {}
  }
};

export default PopulationDefinitions;
