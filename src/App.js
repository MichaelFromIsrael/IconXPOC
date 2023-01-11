import { useEffect } from 'react'
import './App.css'
import { Button } from 'react-bootstrap'
import useMetaMask from './hooks/metamask';
import { useState } from "react";
import TxList from "./TxList";
import ErrorMessage from "./ErrorMessage";
const ethers = require("ethers");

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr })
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};


function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: '0.001',
      addr: '0xECA4a463c8BBD34A4Dde8fF8A4f61411B3290C6E'
    });
  };
  
  const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()

  return (
    <div className="App">
      <header className="App-header">
        <Button variant="secondary" onClick={connect} disabled={shouldDisable}>
          Connect to MetaMask
        </Button>
        <div className="mt-2 mb-2">
          Connected Account: { isActive ? account : '' }
        </div>
        <Button variant="danger" onClick={disconnect}>
          Disconnect MetaMask
        </Button>
        <p></p>
        <Button variant="danger" onClick={handleSubmit}>
          Time Attack Challenge
        </Button>
        <ErrorMessage message={error} />
        <TxList txs={txs} />
      </header>
    </div>
  );
}

export default App;