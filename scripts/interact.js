const { log } = require("console");
const hre = require("hardhat");

async function main() {

    // Adresses
    // const mockTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // const mytoken = await hre.ethers.getContractAt("MockToken", mockTokenAddress);
    const [owner] = await hre.ethers.getSigners();

    const L1SenderAddr = "0x44918Cd0dF112236833Ac486BDeFBB83EaCa159a";
    const sender = await hre.ethers.getContractAt("L1TokenSender", L1SenderAddr);

    const l1Token = '0xf08A50178dfcDe18524640EA6618a1f965821715';
    const tokenName = 'USDC';

    const to = '0x94610CF28D27df1F146E81C1afD3De0f8ad35EAd'

    wallet = await new ethers.Wallet(process.env.PRIVATE_KEY);
    signer = await wallet.connect(hre.ethers.provider);
    console.log("=====");

    console.log(signer);
    console.log("=====");
    console.log(owner.address);


    const sendtoL2 = await sender.connect(signer).sendToL2(
        '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
        to, l1Token, 1, 11579, 800, { gasLimit: 25000 }
    );

   console.log( await sendtoL2.wait());
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });