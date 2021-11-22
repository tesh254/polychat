// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const soleContractFactory = await hre.ethers.getContractFactory("Sole");
  const soleContract = await soleContractFactory.deploy();
  await soleContract.deployed();

  console.log("Contract deployed to: ", soleContract.address);
  console.log("Contract deployed by: ", owner.address);

  let wageCount;
  wageCount = await soleContract.getTotalWages();

  const wageTxn = await soleContract.wage();
  await wageTxn.wait();

  wageCount = await soleContract.getTotalWages();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
