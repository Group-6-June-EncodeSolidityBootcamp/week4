import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x87C771969d051819b2F364A63a26E681265888C0";
const TO_MINT_TOKEN_URI = "https://lacasafans.glitch.me/nft/nairobi";

async function main() {

  // if (process.argv.length < 2) {
  //   throw new Error("Specify Token URI to mint Token");
  // }
  // const toMintTokenURI = process.argv[2]; // MAKE SURE YOU PASS A TOKEN URI
  const toMintTokenURI = TO_MINT_TOKEN_URI;

  const [minter] = await ethers.getSigners();

  console.log("Minting with the account:", minter.address);

  console.log("Account balance:", (await minter.getBalance()).toString());

  const address = CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory('Heister');
  const contract = await Contract.attach(address);

  console.log("Contract address:", contract.address);

  // Get total tokens
  let totalTokens = await contract.totalTokens();
  console.log('Total Tokens was ', totalTokens.toString());
  
  // Send a transaction to store() a new value in the Box
  const tx = await contract.mintItem(minter.address, toMintTokenURI);
  await tx.wait()
  console.log(`Minted ${toMintTokenURI} to ${minter.address}`);
  console.log(`Transaction hash: ${tx.hash}`);

  // Get total tokens again
  totalTokens = await contract.totalTokens();
  console.log('Total Tokens is now ', totalTokens.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });