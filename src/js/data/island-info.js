const Islands = {
  home: {
    name: 'Home Base'
  },
  duloc: {
    name: 'Duloc',
    rates: {
      // pairs are [buy, sell]
      wood: [.5, 1.25],
      tool: [.5, 1.25],
      stone: [.5, 1.25],
      glass: [.5, 1.25],
      spice: [1, 0],
      fish: [0, 1.25],
      bread: [0, 1.25],
      meat: [0, 1.25],
      cider: [0, 1.25],
      beer: [0, 1.25],
      wine: [0, 1.25],
      linen: [0, 1.25],
      leather: [0, 1.25],
      furcoat: [0, 1.25],
      silkcoat: [0, 1.25],
      book: [0, 1.25],
      glasses: [0, 1.25],
      candlestick: [0, 1.25],
      salt: [.5, 1],
      hemp: [0, 1],
      brine: [0, 1],
      ore: [.5, 1],
      iron: [.5, 1],
      flour: [0, 1],
      coal: [.5, 1],
      hide: [0, 1],
      wheat: [0, 1],
      hop: [0, 1],
      potash: [.5, 1],
      paper: [0, 1],
      fur: [0, 1],
      barrel: [0, 1],
      copper: [0, 1],
      brass: [0, 1],
      grape: [0, 1],
      cattle: [0, 1],
      beeswax: [0, 1],
      candle: [0, 1],
      goldore: [0, 1],
      indigo: [.5, 0],
      goldbar: [0, 1],
      silk: [.5, 0],
      quartz: [.5, 0],
      rope: [.5, 1.25],
      weapon: [.5, 0],
      warmachine: [.5, 0],
      cannon: [.5, 0]
    }
  },
  agrabah: {
    name: 'Agrabah',
    rates: {
      // [buy, sell]
      wood: [1, 1],
      tool: [1, 1.25],
      stone: [1, 1],
      glass: [1, 1],
      spice: [0, 1.25],
      fish: [1, 0],
      bread: [1, 0],
      meat: [1, 0],
      cider: [0, 0],
      beer: [0, 0],
      wine: [0, 0],
      linen: [1, 0],
      leather: [1, 0],
      furcoat: [1, 0],
      silkcoat: [1, 0],
      book: [1, 0],
      glasses: [1, 0],
      candlestick: [1, 0],
      salt: [.5, 1],
      hemp: [.5, 0],
      brine: [0.5, 0],
      ore: [.5, 1],
      iron: [.5, 1],
      flour: [.5, 0],
      coal: [.5, 1],
      hide: [.5, 0],
      wheat: [.5, 0],
      hop: [0, 0],
      potash: [.5, 1],
      paper: [.5, 0],
      fur: [.5, 0],
      barrel: [.5, 0],
      copper: [.5, 0],
      brass: [.5, 0],
      grape: [0, 1],
      cattle: [.5, 0],
      beeswax: [.5, 0],
      candle: [.5, 0],
      goldore: [.5, 0],
      indigo: [0, 1],
      goldbar: [.5, 0],
      silk: [0, 1],
      quartz: [.5, 1],
      rope: [1, 1],
      weapon: [.5, 0],
      warmachine: [.5, 0],
      cannon: [.5, 0]
    }
  }
};

export const travelTimes = {
  home: {
    duloc: 500,
    agrabah: 800
  },
  duloc: {
    home: 500,
    agrabah: 300
  },
  agrabah: {
    home: 800,
    duloc: 300
  }
};

export default Islands;
