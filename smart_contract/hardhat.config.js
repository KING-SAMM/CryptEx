
require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/6WzjWMFU4r4u3G6IEkt2cv9Wqj5oTs7f',
      accounts: ['2e5a76f8092d3336d1c7b8efd66e8645965c672861587a34a21a8a1e19f3f10a']
    }
  }
}