require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    // console.log(account.address);
    // console.log(account);
    const address = await account.getAddress();
    const balance =  await account.provider.getBalance(address);
    const balanceETH = hre.ethers.formatEther(balance)
    console.log(account);
    console.log(address+" : "+ balanceETH);
  }
});
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {
    },
    polygon: {
      url: "https://polygon-mumbai.infura.io/v3/80b522829ad346eab85eb1775adf6732",
      accounts: ["f51681f4ee7c2fb2a7cc1f2ad0b37c10159b54bb9e965c539575b64ab4a3a828"]
    },
    paths: {
      sources: "./contracts",
      tests: "./test",
      cache: "./cache",
      artifacts: "./artifacts",
      url: ""
    }
  }
};
