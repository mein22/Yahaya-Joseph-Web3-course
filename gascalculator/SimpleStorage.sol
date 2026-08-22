// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {

    string private message;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        require(
            msg.sender == owner,
            "Only owner can update message"
        );

        message = newMessage;
    }
}