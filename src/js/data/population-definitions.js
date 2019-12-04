const PopulationDefinitions = {
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
        weight: 20
      },
      linen: {
        quantity: 0.42,
        weight: 20
      },
      community: {
        quantity: 1,
        weight: 20
      },
      faith: {
        quantity: 1,
        weight: 20
      }
    }
  }
};

export default PopulationDefinitions;
