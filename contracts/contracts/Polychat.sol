// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Polychat {
    uint256 totalChats;
    uint256 totalAmount;
    uint256 totalAccounts;

    event NewChat(
        address indexed account,
        string username,
        uint256 timestamp,
        string message,
        uint256 amount,
        uint256 charCount
    );

    struct Chat {
        address account;
        uint256 timestamp;
        string message;
        uint256 amount;
        uint256 charCount;
    }

    struct Account {
        address account;
        string username;
        string link;
        uint256 amount;
        uint256 chats;
    }

    mapping(address => Account) public accounts;

    mapping(address => Chat[]) public chats;

    constructor() {
        console.log("This is the Polychat contract");
    }

    function addAccount(string memory _username, string memory _link) public {
        if (accounts[msg.sender].account == address(0x0)) {
            accounts[msg.sender].account = msg.sender;
            accounts[msg.sender].username = _username;
            accounts[msg.sender].link = _link;
            accounts[msg.sender].amount = 0;
            accounts[msg.sender].chats = 0;

            totalAccounts++;
        }
    }

    function sendMessage(string memory _message) public {
        if (bytes(_message).length == 0) {
            revert("Message cannot be empty");
        }

        if (bytes(_message).length > 256) {
            revert("Message cannot be longer than 256 characters");
        }

        uint256 charCount = bytes(_message).length;
        uint256 amount = charCount * 100000000000000000;

        totalChats++;
        totalAmount += amount;

        Chat memory chat = Chat({
            account: msg.sender,
            timestamp: block.timestamp,
            message: _message,
            amount: amount,
            charCount: charCount
        });

        chats[msg.sender].push(chat);

        accounts[msg.sender].amount += amount;
        accounts[msg.sender].chats++;

        emit NewChat(
            msg.sender,
            accounts[msg.sender].username,
            block.timestamp,
            _message,
            amount,
            charCount
        );
    }

    function getAccount() public view returns (Account memory) {
        return accounts[msg.sender];
    }

    function getAnotherAccount(address _key)
        public
        view
        returns (Account memory)
    {
        return accounts[_key];
    }

    function getTotalChats() public view returns (uint256) {
        return totalChats;
    }

    function getTotalAmount() public view returns (uint256) {
        return totalAmount;
    }
}
