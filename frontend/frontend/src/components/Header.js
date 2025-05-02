import React from 'react';

function Header({ account, connectWallet }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">TrustLock</h1>
        {account ? (
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
        ) : (
          <button onClick={connectWallet} className="bg-white text-blue-600 px-4 py-2 rounded">
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;