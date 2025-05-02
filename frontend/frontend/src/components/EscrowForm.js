import React, { useState } from 'react';

function EscrowForm({ contract, account }) {
  const [seller, setSeller] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  const createEscrow = async () => {
    try {
      const tx = await contract.createEscrow(seller, deadline, {
        // eslint-disable-next-line no-undef
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
      alert("Escrow created successfully!");
      setSeller(''); setAmount(''); setDeadline('');
    } catch (error) {
      console.error(error);
      alert("Error creating escrow.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Escrow</h2>
      <input
        type="text"
        placeholder="Seller Address"
        value={seller}
        onChange={(e) => setSeller(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Deadline (seconds)"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={createEscrow} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Escrow
      </button>
    </div>
  );
}

export default EscrowForm;