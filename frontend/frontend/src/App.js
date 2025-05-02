import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Header from './components/Header';
import EscrowForm from './components/EscrowForm';
import EscrowList from './components/EscrowList';
import contractABI from './contractABI.json';

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [escrows, setEscrows] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);
      const escrowContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(escrowContract);
      fetchEscrows(escrowContract, userAddress);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchEscrows = async (escrowContract, userAddress) => {
    const count = await escrowContract.escrowCounter();
    const escrowList = [];
    for (let i = 0; i < count; i++) {
      const escrow = await escrowContract.escrows(i);
      if (escrow.buyer === userAddress || escrow.seller === userAddress) {
        escrowList.push({ id: i, ...escrow });
      }
    }
    setEscrows(escrowList);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header account={account} connectWallet={connectWallet} />
      <main className="container mx-auto p-4">
        {account ? (
          <>
            <EscrowForm contract={contract} account={account} />
            <EscrowList escrows={escrows} contract={contract} account={account} />
          </>
        ) : (
          <p className="text-center text-lg">Please connect your wallet to continue.</p>
        )}
      </main>
    </div>
  );
}

export default App;