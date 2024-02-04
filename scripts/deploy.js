// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy MockUSDC
  // const MockToken = await hre.ethers.getContractFactory("MockToken");
  // const mockToken = await MockToken.deploy(); // 1 million tokens
  // await mockToken.waitForDeployment();
  // console.log("MockToken deployed to:", mockToken.target);

  const L1Sender = await hre.ethers.getContractFactory("L1TokenSender");
  const l1Sender = await L1Sender.deploy(); // 1 million tokens
  await l1Sender.waitForDeployment();
  console.log("L1 Token Sender deployed to:", l1Sender.target);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
