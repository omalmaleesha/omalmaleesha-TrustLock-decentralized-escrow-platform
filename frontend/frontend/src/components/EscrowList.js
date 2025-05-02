import React from 'react';
import { ethers } from 'ethers';

function EscrowList({ escrows, contract, account }) {
  const confirmDelivery = async (escrowId) => {
    try {
      const tx = await contract.confirmDelivery(escrowId);
      await tx.wait();
      alert("Delivery confirmed!");
    } catch (error) {
      console.error(error);
      alert("Error confirming delivery.");
    }
  };

  const refund = async (escrowId) => {
    try {
      const tx = await contract.refund(escrowId);
      await tx.wait();
      alert("Refund issued!");
    } catch (error) {
      console.error(error);
      alert("Error issuing refund.");
    }
  };

  const claimTimeoutRefund = async (escrowId) => {
    try {
      const tx = await contract.claimTimeoutRefund(escrowId);
      await tx.wait();
      alert("Timeout refund claimed!");
    } catch (error) {
      console.error(error);
      alert("Error claiming timeout refund.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Escrows</h2>
      {escrows.length === 0 ? (
        <p>No escrows found.</p>
      ) : (
        <ul>
          {escrows.map((escrow) => (
            <li key={escrow.id} className="mb-4 p-4 border rounded">
              <p>ID: {escrow.id.toString()}</p>
              <p>Buyer: {escrow.buyer}</p>
              <p>Seller: {escrow.seller}</p>
              <p>Amount: {ethers.utils.formatEther(escrow.amount)} ETH</p>
              <p>State: {EscrowState[escrow.state]}</p>
              <p>Deadline: {new Date(escrow.deadline * 1000).toLocaleString()}</p>
              {escrow.buyer === account && escrow.state === 0 && (
                <button
                  onClick={() => confirmDelivery(escrow.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Confirm Delivery
                </button>
              )}
              {escrow.seller === account && escrow.state === 0 && (
                <button
                  onClick={() => refund(escrow.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                >
                  Refund
                </button>
              )}
              {escrow.buyer === account && escrow.state === 0 && Date.now() > escrow.deadline * 1000 && (
                <button
                  onClick={() => claimTimeoutRefund(escrow.id)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Claim Timeout Refund
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const EscrowState = ["AWAITING_DELIVERY", "COMPLETE", "REFUNDED"];

export default EscrowList;