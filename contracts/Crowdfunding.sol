// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public owner;
    uint public goal;
    uint public deadline;
    uint public totalFunds;
    bool public fundsWithdrawn;

    mapping(address => uint) public contributions;

    event Contributed(address indexed contributor, uint amount);
    event Withdrawn(address indexed owner, uint amount);
    event Refunded(address indexed contributor, uint amount);

    constructor(uint _goal, uint _durationInSeconds) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + _durationInSeconds;
    }

    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign has ended");
        require(msg.value > 0, "Contribution must be > 0");

        contributions[msg.sender] += msg.value;
        totalFunds += msg.value;
        emit Contributed(msg.sender, msg.value);
    }

    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(totalFunds >= goal, "Funding goal not reached");
        require(!fundsWithdrawn, "Funds already withdrawn");

        fundsWithdrawn = true;
        uint amount = totalFunds;
        payable(owner).transfer(amount);
        emit Withdrawn(owner, amount);
    }

    function refund() external {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalFunds < goal, "Funding goal reached, refund not allowed");

        uint contributed = contributions[msg.sender];
        require(contributed > 0, "No funds to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(contributed);
        emit Refunded(msg.sender, contributed);
    }
}
