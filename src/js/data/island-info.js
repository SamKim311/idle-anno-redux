const Islands = {
  home: {
    name: 'Home Base'
  },
  duloc: {
    name: 'Duloc',
    rates: {
      wood: [.5, 1],
      tool: [.5, 1],
      stone: [.5, 1],
      glass: [.5, 1],
      spice: [1, 0],
      fish: [0, 1],
      bread: [0, 1],
      meat: [0, 1],
      cider: [0, 1],
      beer: [0, 1],
      wine: [0, 1],
      linen: [0, 1],
      leather: [0, 1],
      furcoat: [0, 1],
      silkcoat: [0, 1],
      book: [0, 1],
      glasses: [0, 1],
      candlestick: [0, 1],
      salt: [.5, .5],
      hemp: [0, .5],
      brine: [0, 0.5],
      ore: [.5, .5],
      iron: [.5, .5],
      flour: [0, .5],
      coal: [.5, .5],
      hide: [0, .5],
      wheat: [0, .5],
      hop: [0, .5],
      potash: [.5, .5],
      paper: [0, .5],
      fur: [0, .5],
      barrel: [0, .5],
      copper: [0, .5],
      brass: [0, .5],
      grape: [0, .5],
      cattle: [0, .5],
      beeswax: [0, .5],
      candle: [0, .5],
      goldore: [0, .5],
      indigo: [.5, 0],
      goldbar: [0, .5],
      silk: [.5, 0],
      quartz: [.5, 0],
      rope: [.5, 1],
      weapon: [.5, 0],
      warmachine: [.5, 0],
      cannon: [.5, 0]
    }
  },
  agrabah: {
    name: 'Agrabah'
  }
};

export const travelTimes = {
  home: {
    duloc: 5,
    agrabah: 8
  },
  duloc: {
    home: 5,
    agrabah: 3
  },
  agrabah: {
    home: 8,
    duloc: 3
  }
};

export default Islands;
