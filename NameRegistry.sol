// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NameRegistry {

    mapping(address => string) private names;
    mapping(address => bool) private registered;

    event NameRegistered(address indexed user, string name);

    function registerName(string memory name) public {
        require(!registered[msg.sender], "Already registered");

        names[msg.sender] = name;
        registered[msg.sender] = true;

        emit NameRegistered(msg.sender, name);
    }

    function getName(address user) public view returns (string memory) {
        return names[user];
    }
}