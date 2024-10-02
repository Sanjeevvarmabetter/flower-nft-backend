const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK({
    apiKey: '20a1ac93e10b67f081c5',
    apiSecret: '2b3680b650e07a507c4df5a9649b9b6438d7f8e4c3cc0cfab22a73bb968d02d7'
});

const flowers = [
    {
        name: "Jasmine",
        description: "Jasmine NFT",
        image: "https://gateway.pinata.cloud/ipfs/QmXrzRh4Bdboy1thaxecvq1oPYVah2uLt98NGiCK99pJuV/1.jpeg",
        attributes: [
            { trait_type: "Color", value: "White" },
            { trait_type: "Type", value: "Flower" }
        ]
    }
];

async function uploadMetadata() {
    for (const flower of flowers) {
        try {
            const response = await pinata.pinJSONToIPFS(flower);
            console.log(`Metadata uploaded to IPFS: https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`);
        } catch (error) {
            console.error("Error uploading metadata:", error);
        }
    }
}

uploadMetadata();
