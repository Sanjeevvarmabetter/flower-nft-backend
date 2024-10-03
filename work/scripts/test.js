const { ethers } = require("hardhat");  

async function main() {
    const [owner] = await ethers.getSigners();
    console.log(`Owner address: ${owner.address}`);

    const balance = await owner.getBalance();
    console.log(`Owner balance: ${ethers.utils.formatEther(balance)} ETH`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error);
        process.exit(1);
    });
