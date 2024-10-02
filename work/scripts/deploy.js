const { ethers } = require("hardhat");

async function main() {
    const Box = await ethers.getContractFactory("FlowerNFT");
    console.log("Deploying nft marketplace...");
    

    const box = await Box.deploy();
    

    await box.waitForDeployment();
    
    console.log("nft deployed to:", box.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



//  0xe0A8330301B284fd30CFd8c2EC66f6174f3f4c89
