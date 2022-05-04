# Basic NFT
This repo shows an example of a basic NFT smart contract developed using the hardhat framework
<br><br>

## Motivation ##
This is the first of a series of NFT smart contracts using solidity. This NFT series covers the basic codes in varioius areas of NFT projects such as :
- [on-chain NFT](https://github.com/dtan1/onchain-nft)
- off-chain NFT using IPFS
- nft-collection
- nft-whitelist
- nft-royalty
- etc

<br>

## Functional Description ##
Some of the functions provided are :
- change the total supply of NFT tokens
- mint NFT 
- enable/disable the minting by the users
- keeping track of total number of NFT tokens minted so far
- a way to prevent any user from minting more than what is allowed
  - by internally keeping track of the number of tokens minted so far for each user.
  - ***note*** *checking user's balance is not suffucient, as user can turn around and sell it in other markerplace / channel once the NFT is minted*

### Owner only functions ###
- enable/disable minting
- set max supply of NFT token
- get total NFTS minted so far

### User functions ###
- mint NFT token
- obtain number of NFT tokens minted 

### Contract (internal) functions ###
- none
<br>

## Technical Description ###

### Technical background ###
- As this smart contract project is built using the hardhat framework, please refer to this project/repo [basic smart contract using hardhat](https://github.com/dtan1/contractviahardhat) regarding building a basic smart contract using the hardhat framwork. 
- The README section contains a quick overview and usage of various hardhat commands etc. It serves as a good, quick refresher.

### Technical usage ###
Below is a brief summary of the technical libraries or tools that is used in this project :
- development fraemwork : hardhat
- coding libraries : openzeppelin - ERC721.sol, and Ownable.sol
- unit test libraries : chai assertion, ether.js 

### Technical consideration ###

#### States ####
- constants are used to initialize the following :
  - max supply
  - max number of tokens allowed to be minted per user
  - mint price
- mapping data structure is used to keep track of the number of tokens minted per user.  
- storage variable is used for the following state :
  - if minting is enabled/disabled.
  - max supply
  - total number of NFTs minted so far
#### Functions ####
- Mint function
  - requie minting is enabled
  - require total number of tokens minted by the user does not exceed what is allowed
  - require mint price to be the correct amount
  - require total number of tokens minted so far do not exceed the total supply


<br>

## Testing ##

### Unit Test ###
- Positive tests :
  - owner is able to set max supply
  - owner is able to see what is the current max supply
  - owner is able to enable/disable minting by users
  - owner is able to get total number of NFTs minted so far
  - diff user is able to mint NFT once the minting is enabled
  - user is able to see how many NFTS he has minted

- Negative tests :
  - user shoule not be able to mint if the minting is not enabled yet.
  - user should not be able to mint if it exceeds max tokens allowed per user
  - user should not be able to mint if mint price is incorrect
  - user should not be able to mint anymore if total minted so far is greated than total supply of NFTs allocated / allowed.

### Network Testing - public testnet ###
- refer to the ***Testing Setup*** in this project/repo [basic smart contract using hardhat](https://github.com/dtan1/contractviahardhat) for more details

