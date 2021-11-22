// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Sole {
    uint256 totalWagers;

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
