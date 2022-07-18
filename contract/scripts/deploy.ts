import { ethers } from "hardhat";

async function main() {

  const ContractFactory = await ethers.getContractFactory("Heister");
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
