import { ethers } from "hardhat";

async function main() {
  const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

  
  const goal = ethers.utils.parseEther("10"); 
  const duration = 60 * 60 * 24; 

  const crowdfunding = await Crowdfunding.deploy(goal, duration);

  await crowdfunding.deployed();

  console.log("Crowdfunding deployed to:", crowdfunding.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
