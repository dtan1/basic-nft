//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/// @title BasicNFT
/// @notice Implements a basic ERC721 NFT token
contract BasicNFT is ERC721, Ownable {
    uint constant MAX_SUPPLY = 10;
    uint constant MAX_PER_USER = 1;
    uint mintPrice = 0.01 ether;
    uint totalMinted;
    uint maxSupply;
    bool mintEnabled; // default to false
    mapping(address => uint) mintedWallets;


    constructor() ERC721 ('Basic NFT', 'BASICNFT') {
        maxSupply = MAX_SUPPLY;
    }


    ///@notice A method for owner to set the minting to on/off
    function toggleMintEnabled() external onlyOwner {
        mintEnabled = !mintEnabled;
    }

    ///@notice A method to see if minting is allowed
    function isMintEnabled() external view returns(bool) {
        return mintEnabled;
    }

    ///@notice A method for owner to set the the new max supply
    function setMaxSupply(uint _maxSupply) external onlyOwner {
        //console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        maxSupply = _maxSupply;
    }

    ///@notice A method to get the total supply
    function getMaxSupply() external view onlyOwner returns(uint) {
        return maxSupply;
    }

    ///@notice A method to show how many NFT have been minted
    function getTotalMinted() external view onlyOwner returns(uint) {
        return totalMinted;
    }

    ///@notice A method to show how many NFTs have been minted by a particular address
    ///@return number of NFTs minted
    function getMintedWallet(address _address) external view returns(uint) {
        return mintedWallets[_address];
    }

    ///@notice A method to mint the NFT using openzeppelin safeMint.
    function mint() external payable {
        require(mintEnabled, 'minting not enabled yet');
        require(mintedWallets[msg.sender] < MAX_PER_USER, 'exceed max per wallet');
        require(msg.value == mintPrice, 'wrong minting price');
        require(maxSupply > totalMinted, 'sold out');

        mintedWallets[msg.sender]++;
        totalMinted++;
        uint tokenId = totalMinted;
        _safeMint(msg.sender, tokenId);
    }



}
