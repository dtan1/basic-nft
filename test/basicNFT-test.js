const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BasicNFT", function () {
  console.log = function() {}; // turn off console.log


  let basicNFT;
  const MINT_PRICE = "0.01";
  const WRONG_MINT_PRICE = "0.005";
  const TOTAL_SUPPLY = 5;

  before(async function () {
    [owner, user1, user2, user3, user4] = await ethers.getSigners();
    console.log('owner.address is ' + owner.address);

    const BasicNFT = await ethers.getContractFactory("BasicNFT");
    basicNFT = await BasicNFT.deploy();
    await basicNFT.deployed();

  });


  describe("BasicNFT - owner only functions", function () {
    console.log("----------------------");
    
    it("should set toggleMintEnable correctly ", async function () {
      let mintEnable = await basicNFT.isMintEnabled();
      console.log("mintEnable is " + mintEnable);
      await basicNFT.toggleMintEnabled();
      mintEnable = await basicNFT.isMintEnabled();
      console.log("after toggleMintEnabled, mintEnable is " + mintEnable);

      expect (mintEnable).to.be.true;
      // expect(payoffAmount).to.equal(LOAN_AMOUNT);

    });

    it("should set max supply correctly ", async function () {
      await basicNFT.setMaxSupply(TOTAL_SUPPLY);
      maxSupply = await basicNFT.getMaxSupply();
      expect (maxSupply).to.equal(TOTAL_SUPPLY);
    });


    describe("BasicNFT - user functions", function () {
      beforeEach(async function () {
        console.log("----------------------");
        console.log("owner balance is  " + await basicNFT.balanceOf(owner.address));
        console.log("user1 balance is  " + await basicNFT.balanceOf(user1.address));
        console.log("user2 balance is  " + await basicNFT.balanceOf(user2.address));
        console.log("get total minted is " + await basicNFT.getTotalMinted());
      });

      afterEach(async function () {
        console.log("owner balance is  " + await basicNFT.balanceOf(owner.address));
        console.log("user1 balance is  " + await basicNFT.balanceOf(user1.address));
        console.log("user2 balance is  " + await basicNFT.balanceOf(user2.address));
        console.log("get total minted is " + await basicNFT.getTotalMinted());
      });

      it("user1 should mint correctly ", async function () {
        await basicNFT.connect(user1).mint( 
            {value : ethers.utils.parseEther(MINT_PRICE)
            });      
  
        // expect(payoffAmount).to.equal(LOAN_AMOUNT);
        expect(await basicNFT.balanceOf(user1.address) == 1);

      });

      it("user1 should not be able to mint again - max NFTS minted", async function() {
        result = basicNFT.connect(user1).mint( 
          {value : ethers.utils.parseEther(MINT_PRICE)
          });
         await expect(result).to.be.revertedWith("exceed max per wallet");
      })

      it("user2 should mint correctly ", async function () {
           await basicNFT.connect(user2).mint( 
            {value : ethers.utils.parseEther(MINT_PRICE)
            });   
          
          mintedWallet = await basicNFT.getMintedWallet(user2.address);
          console.log('getMintedWallet is ' + mintedWallet);
          expect(mintedWallet).to.equal(1);  

      });

      it("user3 should not be able to mint with wrong mint price", async function() {
        // result = basicNFT.connect(user3).mint( 
        //   {value : ethers.utils.parseEther(WRONG_MINT_PRICE)
        //   });
        // await expect(result).to.be.revertedWith('wrong minting value');

        await expect(basicNFT.connect(user3).mint( 
                      {value : ethers.utils.parseEther(WRONG_MINT_PRICE)
                      })
                    ).to.be.revertedWith("wrong minting price");
      })

      it("user4 should not be able to mint if minting is not enabled", async function() {
        //owner disable minting
        await basicNFT.toggleMintEnabled();
        await expect(basicNFT.connect(user4).mint( 
                      {value : ethers.utils.parseEther(MINT_PRICE)
                      })
                    ).to.be.revertedWith("minting not enabled yet");
      })

      it("user3 should not be able to mint if total minted > total supply", async function() {
        // re enable minting
        mintEnabled = await basicNFT.isMintEnabled();
        if (!mintEnabled) {
           await basicNFT.toggleMintEnabled();
        }
        totalMinted = await basicNFT.getTotalMinted();
        // reset max supply 
        await basicNFT.setMaxSupply(totalMinted);
        await expect(basicNFT.connect(user3).mint( 
                      {value : ethers.utils.parseEther(MINT_PRICE)
                      })
                    ).to.be.revertedWith("sold out");
      })

    });

  });


});
