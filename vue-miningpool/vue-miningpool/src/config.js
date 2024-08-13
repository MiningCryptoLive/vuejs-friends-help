export default {
  pool_name: "pool-mcl",
  name: "Bch",
  symbol: "BCH",
  algo: "sha256d",
  scheme: "SOLO",
  fee: 1,
  valid_address: 42,
  min_payout: 3.0,
  block_reward: 3.125,
  block_time: 10m,
  explorer: {
    height: "https://explorer.ballzcoin.org/block/",
    uncle: "https://explorer.ballzcoin.org/uncle/",
    wallet: "https://explorer.ballzcoin.org/addr/",
    tx: "https://explorer.ballzcoin.org/tx/"
  },
  pool: {
    wallet: '143DHQFdXz9wfwvLXUDBVp7zigLAgRBU5j',
    host: 'bch.solopool.pro',
    port: {
      '100000': 11101,
      '500000': 11102,
      '1000000': 11103,
    }
  },
  api: {
    url: "http://bch.solopool.pro/api/",
    time: 15000
  },
  pools: [{
      name: "Bitcoin-Cash",
      url: "bch.solopool.pro"
    }
  ]
};
