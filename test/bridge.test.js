const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Bridge Contract", function () {
  async function deploy() {

    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy();

    return { bridge };
  }

  it("Should withdraw funds correctly", async function () {
    const { bridge } = await loadFixture(
      deploy
    );

    const [owner] = await ethers.getSigners();
    await owner.sendTransaction({
      to: await bridge.getAddress(),
      value: ethers.parseEther("1")
    });

    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);

    // Withdraw the balance
    await bridge.withdraw();

    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
    expect(finalOwnerBalance).to.gt(initialOwnerBalance);
  });
});
