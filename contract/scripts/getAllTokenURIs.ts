import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x87C771969d051819b2F364A63a26E681265888C0";

async function main() {

  const [minter] = await ethers.getSigners();

  console.log("Using the account:", minter.address);

  console.log("Account balance:", (await minter.getBalance()).toString());

  const address = CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory('Heister');
  const contract = await Contract.attach(address);

  console.log("Contract address:", contract.address);

  // Get total tokens
  const totalTokens = await contract.totalTokens();
  console.log('Total Tokens is ', totalTokens.toString());

  for(let i = 0; i < Number(totalTokens); i += 1) {
    const tokenURI = await contract.tokenURI(i);
    console.log(`Token id: ${i} | Token URI: ${tokenURI}`);
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });