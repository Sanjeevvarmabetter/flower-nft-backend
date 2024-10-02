// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlowerNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct NFT {
        uint256 id;
        string name;
        string image;
        uint256 price;
        address owner;
    }

    mapping(uint256 => NFT) public nfts;

    constructor() ERC721("FlowerNFT", "FLWR") {}

    // Minting an NFT
    function mint(string memory name, string memory image, uint256 price) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId);
        nfts[tokenId] = NFT(tokenId, name, image, price, msg.sender);
        _tokenIdCounter.increment();
    }

    // Buying an NFT
    function buy(uint256 tokenId) public payable {
        NFT storage flowerNFT = nfts[tokenId];
        require(msg.value >= flowerNFT.price, "Insufficient funds");
        require(flowerNFT.owner != msg.sender, "Cannot buy your own NFT");
        require(flowerNFT.owner != address(0), "NFT does not exist");

        // Transfer the NFT
        _transfer(flowerNFT.owner, msg.sender, tokenId);
        flowerNFT.owner = msg.sender;

        // Transfer the payment to the seller
        payable(flowerNFT.owner).transfer(msg.value);
    }
}
