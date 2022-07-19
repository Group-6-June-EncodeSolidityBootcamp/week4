import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

import contractABI from "./assets/HeisterABI";
const CONTRACT_ADDRESS = "0x87C771969d051819b2F364A63a26E681265888C0";

function App() {

  const startApp = async () => {

    let provider = ethers.getDefaultProvider('goerli');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);

    console.log("Contract address:", contract.address);

    // Get total tokens
    const totalTokens = await contract.totalTokens();
    console.log('Total Tokens is ', totalTokens.toString());

    for(let i = 0; i < Number(totalTokens); i += 1) {
      const tokenURI = await contract.tokenURI(i);
      console.log(`Token id: ${i} | Token URI: ${tokenURI}`);
    }

  }

  startApp();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload. Or just stare here :/
        </p>
      </header>
    </div>
  );
}

export default App;
