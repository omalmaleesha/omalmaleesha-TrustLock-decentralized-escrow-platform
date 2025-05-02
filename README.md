# TrustLock - Decentralized Escrow Platform

TrustLock is a blockchain-based escrow platform that enables secure, trustless transactions between buyers and sellers without relying on third-party intermediaries. Built on Ethereum, it uses smart contracts to hold and release funds based on predefined conditions, ensuring transparency and fairness.

## 📖 Overview

**Purpose**: Facilitate safe peer-to-peer transactions for goods, services, or digital assets.

**Key Features**:
- Create escrow agreements with customizable deadlines.
- Confirm delivery to release funds to the seller.
- Issue refunds by the seller or claim automatic refunds after a timeout.
- MetaMask wallet integration for seamless blockchain interaction.

**Tech Stack**:
- **Smart Contract**: Solidity (deployed on Ethereum Sepolia testnet)
- **Frontend**: React, Ethers.js, Tailwind CSS
- **Development**: Hardhat for contract development and testing
- **Deployment**: Free hosting via GitHub Pages or Vercel

## 🛠️ Project Structure

```
TrustLock/
├── contracts/              # Smart contract files
│   └── TrustLock.sol       # Escrow smart contract
├── frontend/               # React frontend
│   ├── public/             # Public assets
│   │   └── index.html      # HTML entry point
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.js   # Header component
│   │   │   ├── EscrowForm.js # Form to create escrow
│   │   │   └── EscrowList.js # List of escrows
│   │   ├── App.js          # Main app component
│   │   └── index.js        # React entry point
│   └── package.json        # Node.js dependencies
├── hardhat.config.js       # Hardhat configuration
├── scripts/                # Deployment scripts
│   └── deploy.js           # Script to deploy contract
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js: Install from [nodejs.org](https://nodejs.org) (v16 or higher).
- MetaMask: Browser extension for wallet integration ([metamask.io](https://metamask.io)).
- Infura: Free API for Ethereum testnet access ([infura.io](https://infura.io)).
- Sepolia Testnet ETH: Obtain free test ETH from Sepolia Faucet.
- Code Editor: VS Code or any preferred editor.

### Installation

#### Clone the Repository:

```bash
git clone https://github.com/YOUR_USERNAME/TrustLock.git
cd TrustLock
```

#### Set Up Smart Contract:

```bash
npm install
```

Configure `hardhat.config.js`:

```js
networks: {
  sepolia: {
    url: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    accounts: ["YOUR_METAMASK_PRIVATE_KEY"]
  }
}
```

Deploy the contract:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Note the deployed contract address.

#### Set Up Frontend:

```bash
cd frontend
npm install
```

Update `frontend/src/App.js`:

```js
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

Copy the contract ABI from `artifacts/contracts/TrustLock.sol/TrustLock.json` to `frontend/src/contractABI.json`.

#### Run Locally:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000).

## 📦 Deployment

### Build the Frontend:

```bash
cd frontend
npm run build
```

### Deploy to Free Hosting

#### GitHub Pages:

```bash
npm install --save-dev gh-pages
```

Add to `frontend/package.json`:

```json
"homepage": "https://YOUR_USERNAME.github.io/TrustLock",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Deploy:

```bash
npm run deploy
```

#### Vercel:

- Sign up at [vercel.com](https://vercel.com).
- Import your GitHub repo and follow the deployment wizard.

## 📚 Usage

### Connect Wallet

- Open the app in your browser.
- Click "Connect Wallet" and approve MetaMask (ensure you're on the Sepolia testnet).

### Create Escrow

- Enter the seller's Ethereum address, amount (in ETH), and deadline (in seconds).
- Submit to create an escrow agreement.

### Manage Escrows

- View your escrows in the dashboard.
- **Buyers**: Confirm delivery or claim a refund.
- **Sellers**: Issue a refund if needed.

## 🔍 Example Workflow

1. **Buyer**: Creates an escrow for 0.1 ETH with a 1-day deadline.
2. **Seller**: Ships the product or delivers the service.
3. **Buyer**: Confirms delivery, releasing funds to the seller.
4. **Timeout**: Buyer can claim a refund if no confirmation.

## 🛡️ Security Notes

- Test thoroughly on Sepolia before mainnet deployment.
- Never share your MetaMask private key.
- Audit the smart contract before production use.

## 🌟 Future Improvements

- Add dispute resolution via DAO/arbitrator.
- Implement a user reputation system.
- Support multiple tokens (ERC-20).
- Enhance UI with features like transaction history.

## 🤝 Contributing

1. Fork the repo.
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push the branch: `git push origin feature/YourFeature`
5. Open a pull request.

## 📜 License

Licensed under the MIT License. See the `LICENSE` file.

## 📬 Contact

For questions or feedback, open an issue on GitHub or contact [YOUR_EMAIL_OR_SOCIAL_MEDIA].

Built with 💻 and ☕ by **SimpleEducation**.
