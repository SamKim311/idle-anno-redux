const ships = {
  flagship: {
    typeName: 'Flagship',
    capacity: 160,
    speed: 1,
    loadFactor: 0.2,
    hp: 600,
    attack: 6,
    maintenance: 0,
    cost: {
      gold: 3500
    }
  },
  smalltrader: {
    typeName: 'Small Trading Ship',
    capacity: 120,
    speed: 0.86,
    loadFactor: 0.15,
    hp: 400,
    attack: 0,
    maintenance: 15,
    points: 1,
    cost: {
      gold: 1500,
      wood: 15,
      rope: 20
    }
  },
  smallwarship: {
    typeName: 'Small Warship',
    capacity: 40,
    speed: 1.07,
    loadFactor: 0.30,
    hp: 500,
    attack: 6,
    maintenance: 30,
    points: 1,
    cost: {
      gold: 2000,
      wood: 30,
      rope: 30,
      weapon: 20
    }
  },
  largetrader: {
    typeName: 'Large Trading Vessel',
    capacity: 240,
    speed: 0.97,
    loadFactor: 0.1,
    hp: 1000,
    attack: 0,
    maintenance: 50,
    points: 2,
    cost: {
      gold: 4000,
      wood: 60,
      rope: 60
    }
  },
  largewarship: {
    typeName: 'Large Warship',
    capacity: 80,
    speed: 0.97,
    loadFactor: 0.25,
    hp: 1200,
    attack: 14,
    maintenance: 60,
    points: 2,
    cost: {
      gold: 4500,
      wood: 70,
      rope: 70,
      cannon: 20
    }
  },

  // bad guys
  corsair: {
    typeName: 'Pirate Corsair',
    speed: 0.86,
    hp: 500,
    attack: 7,
    points: 1
  },
  smallpiratewarship: {
    typeName: 'Small Pirate Warship',
    speed: 0.97,
    hp: 800,
    attack: 8,
    points: 2
  },
  largepiratewarship: {
    typeName: 'Large Pirate Warship',
    speed: 1.07,
    hp: 1000,
    attack: 10,
    points: 3
  }
}

export default ships;
