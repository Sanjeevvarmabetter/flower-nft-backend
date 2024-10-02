require("@nomicfoundation/hardhat-toolbox");
const dotenv = require('dotenv');

dotenv.config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    volta: {
      url: "https://volta-rpc.energyweb.org", 
      accounts: [process.env.ACCOUNT_PRIVATE],
    }
  }
};

