require('dotenv').config();
const hre = require("hardhat")
const { Wallet, Provider, utils } = require("zksync-ethers");
const { API_URL, PRIVATE_KEY, L2_ENDPOINT } = process.env;
// L2_ENDPOINT = "https://zksync-sepolia-testnet.rpc.thirdweb.com"

const AMOUNT = "0.003";
const MY_WALLET_PRIVATE_KEY = PRIVATE_KEY;

if (!MY_WALLET_PRIVATE_KEY) {
  throw new Error("Wallet private key is not configured in env file");
}
if (!API_URL) {
  throw new Error("Missing L1 RPC endpoint. Check chainlist.org or an RPC node provider");
}

async function main() {
  console.log('Running script to deposit ETH in L2 💸');
  // Initialize the wallet.
  const L1network = new Provider(API_URL);
  // ❗️❗️❗️ ATTENTION TO L1 NETWORK, you can use own alchemy project api and api key
  const L2network = new Provider(L2_ENDPOINT);
  // L2 endpoit shoud be rpc address of zksync: https://zksync-sepolia-testnet.rpc.thirdweb.com
  const wallet = new Wallet(MY_WALLET_PRIVATE_KEY, L2network, L1network);
  console.log('Wallet initialized 💵 💶');

  console.log('Balance is on L1 Network:', await wallet.getBalanceL1(), ' 💶');
  console.log('Balance is on L2 Network', await wallet.getBalance(), ' 💶');

  // Deposit ETH to L2
  const depositToWallet = await wallet.deposit(
      {
      to: wallet.address,
      token: utils.ETH_ADDRESS,
      amount: hre.ethers.parseEther(AMOUNT),
      }
    );

  console.log('📟 Hash of transaction: ', depositToWallet.hash);
  console.log('The complete of transaction could take some minutes ⏰');
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });