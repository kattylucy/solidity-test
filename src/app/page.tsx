"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


const CONTRACT_ABI = [
  "function contribute() external payable",
  "function withdrawFunds() external",
  "function refund() external",
  "function goal() view returns (uint256)",
  "function totalFunds() view returns (uint256)",
];


export default function HomePage() {
  const [goal, setGoal] = useState("0");
  const [totalFunds, setTotalFunds] = useState("0");

  useEffect(() => {
    async function loadContractData() {
      try {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const contractGoal = await contract.goal();
        const contractTotalFunds = await contract.totalFunds();

        setGoal(ethers.utils.formatEther(contractGoal));
        setTotalFunds(ethers.utils.formatEther(contractTotalFunds));
      } catch (err) {
        console.error("Error loading contract data:", err);
      }
    }

    loadContractData();
  }, []);

  return (
    <main>
      <h1>My Crowdfunding DApp</h1>
      <p>Goal: {goal} ETH</p>
      <p>Total Funds: {totalFunds} ETH</p>
    </main>
  );
}
