export default {
  pool_name: "pool-node",
  name: "Mix",
  symbol: "MIX",
  algo: "Ethash",
  scheme: "SOLO",
  fee: 1,
  valid_address: 42,
  min_payout: 0.1,
  block_reward: 5,
  block_time: 15,
  explorer: {
    height: "https://explorer.ballzcoin.org/block/",
    uncle: "https://explorer.ballzcoin.org/uncle/",
    wallet: "https://explorer.ballzcoin.org/addr/",
    tx: "https://explorer.ballzcoin.org/tx/"
  },
  pool: {
    wallet: '0x6a6ee2d7d06aa9b47b25957ec1e1d8124837ffec',
    host: 'eth-solo.pool-node.com',
    port: {
      '0.5': 11101,
      '1': 11102,
      '1.5': 11103,
    }
  },
  api: {
    url: "http://192.168.100.100:8080/api/",
    time: 15000
  },
  pools: [{
      name: "Ethereum Classic",
      url: "etc.pool-node.com"
    },
    {
      name: "Ethereum",
      url: "eth.pool-node.com"
    },
    {
      name: "Ballzcoin",
      url: "http://test.pool-node.com"
    }
  ]
};