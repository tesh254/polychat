// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Sole {
    uint256 totalWagers;

    event NewWager(address indexed from, uint64 timestamp, string wager, string outcome, uint256 amount);

    constructor() {
        console.log("This is the Sole contract");
    }

    function wage() public {
        totalWagers += 1;
        console.log("%s has waged!", msg.sender);
    }

    function getTotalWages() public view returns (uint256) {
        console.log("We have %d total wages!", totalWagers);
        return totalWagers;
    }
}
