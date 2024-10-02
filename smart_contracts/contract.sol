// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlowerNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => uint256) public nftPrice;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI);
    event NFTListed(uint256 indexed tokenId, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);

    constructor() ERC721("ROSE", "RSE") Ownable(msg.sender) { // Pass msg.sender to Ownable
        tokenCounter = 0;
    }

    function mintNFT(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        emit NFTMinted(newTokenId, msg.sender, tokenURI);
        tokenCounter++; // Increment tokenCounter after minting

        return newTokenId;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than zero");

        nftPrice[tokenId] = price;
        emit NFTListed(tokenId, price);
    }

    function buyNFT(uint256 tokenId) public payable {
        uint256 price = nftPrice[tokenId];
        address seller = ownerOf(tokenId);

        require(price > 0, "NFT is not for sale");
        require(msg.value == price, "Incorrect price sent");
        require(seller != msg.sender, "You cannot buy your own NFT");

        // Transfer the NFT ownership
        _transfer(seller, msg.sender, tokenId);

        // Transfer the funds to the seller using call to prevent reentrancy attacks
        (bool success, ) = seller.call{value: msg.value}("");
        require(success, "Transfer failed");

        // Reset the price
        delete nftPrice[tokenId];

        emit NFTSold(tokenId, msg.sender, seller, price);
    }

    function getNFTPrice(uint256 tokenId) public view returns (uint256) {
        return nftPrice[tokenId];
    }
}
