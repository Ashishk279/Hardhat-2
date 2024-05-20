// npx hardhat conosle
// ethers
await ethers.getSigners();
await ethers.getContractFactory("Lock");
const Lock = await ethers.getContractFactory("Lock");
const lock1 = await Lock.deploy("1708929255")

await lock1.withdraw()