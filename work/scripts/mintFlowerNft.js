
const { ethers } = require("hardhat")


async function main() {
    const [owner] = await ethers.getSigners(); // Get the deployer's signer
    const contractAddress = "0xe0A8330301B284fd30CFd8c2EC66f6174f3f4c89"; // Your deployed contract address

    const FlowerNFT = await ethers.getContractFactory("FlowerNFT"); // Get the contract factory
    const flowerNFT = FlowerNFT.attach(contractAddress); // Attach to the deployed contract

    const name = "Rose";
    const image = "https://ipfs.io/ipfs/QmXwiYKGFP5aHRnjftrUCTQyCUX6aFypnbm6z395ziWvRR"; 
    const price = ethers.utils.parseEther("1"); // Convert 1 ETH to Wei

    console.log(`Minting NFT with name: ${name}`);

    // Mint the NFT
    const tx = await flowerNFT.mint(name, image, price);
    const receipt = await tx.wait(); // Wait for the transaction to be mined

    // Retrieve the NFTMinted event to get the tokenId
    const event = receipt.events.find((event) => event.event === "NFTMinted");

    if (event) {
        const tokenId = event.args.tokenId.toNumber();
        console.log(`NFT minted successfully! Token ID: ${tokenId}`);
    } else {
        console.log("NFT minted, but could not retrieve token ID.");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error minting NFT:", error);
        process.exit(1);
    });
