const Traders = {
  lord: {
    name: 'Lord Farquaad',
    rates: {
      wood: {
        buy: .5,
        sell: 1.2
      },
      tool: {
        buy: .5,
        sell: 1.2
      },
      stonebrick: {
        buy: .5,
        sell: 1.2
      },
      spice: {
        buy: 1,
        sell: 0
      }
    },
    baseCapacity: 30
  },
  prince: {
    name: 'Prince Ali',
    rates: {
      wood: {
        buy: 1,
        sell: 1
      },
      tool: {
        buy: 1,
        sell: 1.2
      },
      spice: {
        buy: 0,
        sell: 1.25
      }
    },
    baseCapacity: 40
  }
};

export default Traders;
