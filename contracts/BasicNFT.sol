//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BasicNFT is ERC721, Ownable {
    uint constant MAX_SUPPLY = 10;
    uint mintPrice = 0.01 ether;
    uint totalMinted;
    uint maxSupply;
    bool mintEnabled; // default to false
    mapping(address => uint) mintedWallets;


    constructor() ERC721 ('Basic NFT', 'BASICNFT') {
        maxSupply = MAX_SUPPLY;
    }

    function toggleMintEnabled() external onlyOwner {
        mintEnabled = !mintEnabled;
    }

    function isMintEnabled() external view returns(bool) {
        return mintEnabled;
    }

    function setMaxSupply(uint _maxSupply) external onlyOwner {
        //console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        maxSupply = _maxSupply;
    }

    function getTotalMinted() external view returns(uint) {
        return totalMinted;
    }

    function getMintedWallet(address _address) external view returns(uint) {
        return mintedWallets[_address];
    }

    function mint() external payable {
        require(mintEnabled, 'minting not enabled yet');
        require(mintedWallets[msg.sender] < 1, 'exceed max per wallet');
        require(msg.value == mintPrice, 'wrong minting price');
        require(maxSupply > totalMinted, 'sold out');

        mintedWallets[msg.sender]++;
        totalMinted++;
        uint tokenId = totalMinted;
        _safeMint(msg.sender, tokenId);
    }



}
