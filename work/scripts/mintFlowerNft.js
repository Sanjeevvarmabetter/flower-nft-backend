const { ethers } = require("hardhat");

async function main() {
    // Get the first signer (owner)
    const [owner] = await ethers.getSigners();
    console.log(`Using owner address: ${owner.address}`);

    // Contract address (replace with your deployed contract address)
    const contractAddress = "0xe0A8330301B284fd30CFd8c2EC66f6174f3f4c89";

    // Get the contract factory and attach to the deployed contract
    const FlowerNFT = await ethers.getContractFactory("FlowerNFT");
    const flowerNFT = FlowerNFT.attach(contractAddress);

    // NFT details
    const name = "Rose";
    const image = "https://ipfs.io/ipfs/QmXwiYKGFP5aHRnjftrUCTQyCUX6aFypnbm6z395ziWvRR";
    const price = ethers.utils.parseEther("1"); // 1 ETH

    console.log(`Minting NFT with name: ${name}, image: ${image}, price: ${ethers.utils.formatEther(price)} ETH`);

    // Mint the NFT
    const tx = await flowerNFT.mint(name, image, price);
    console.log(`Transaction hash: ${tx.hash}`);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction confirmed.");

    // Find the NFTMinted event to get the tokenId
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
