import './App.css';
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import contractABI from "./assets/HeisterABI";
const CONTRACT_ADDRESS = "0x87C771969d051819b2F364A63a26E681265888C0";
const IPFS_URL = "https://ipfs.io/ipfs/"

function App() {

  const [NFTs, setNFTs] = useState([]);
  const [status, setStatus] = useState("Loading...");

  const startApp = async () => {
    let provider = ethers.getDefaultProvider('goerli');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    console.log("Contract address:", contract.address);

    // Get total tokens
    const totalTokens = await contract.totalTokens();
    console.log('Total Tokens is ', totalTokens.toString());

    // Get All NFTs
    const tokenURIs = [];
    setStatus("Getting Tokens from contract...");
    for (let i = 0; i < 10; i += 1) {
      const tokenURI = await contract.tokenURI(i);
      console.log(`Token id: ${i} | Token URI: ${tokenURI}`);
      tokenURIs.push(tokenURI);
    }

    // Get NFT Datas
    const tokenDatas = [];
    setStatus("Getting Token Data...");
    const promises = [];
    tokenURIs.forEach((tokenURI) => {
      promises.push(fetch(tokenURI));
    })
    Promise.all(promises)
      .then(responses => Promise.all(
        responses.map(
          response => response.json()
        ))
        .then(jsons => jsons.forEach(
          json => {
            tokenDatas.push(json);
          })))
      .then(() => {
        setNFTs(tokenDatas);
        setStatus("");
      })
      .catch(err => console.log('error', err));
  };

  useEffect(() => {
    startApp();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>La Casa Fans</h1>
          <p>
            See cool NFTs of your favorite Heisters! 
          </p>
        </div>
        <div className="divider" />
        <p className="status"> {status} </p>
        <div className="container">
          {NFTs.map((nft, index) => (
            <div key={index}>
              <div className="nft-card">
                <img className="nft-image" src={IPFS_URL + nft.imageCID} alt=""></img>
                <p className="nft-name">{nft.heistName}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="footer-text">
            <a href="https://github.com/Group-6-June-EncodeSolidityBootcamp/week4" className="App-link">Github</a> | <a href="https://goerli.etherscan.io/address/0x87C771969d051819b2F364A63a26E681265888C0" className="App-link">Etherscan</a>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
