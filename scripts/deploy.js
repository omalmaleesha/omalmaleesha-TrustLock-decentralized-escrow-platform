const hre = require("hardhat");

async function main() {
  const TrustLock = await hre.ethers.getContractFactory("TrustLock");
  const trustLock = await TrustLock.deploy();
  await trustLock.deployed();
  console.log("TrustLock deployed to:", trustLock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});