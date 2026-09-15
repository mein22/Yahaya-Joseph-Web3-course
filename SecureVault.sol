// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SecureVault is Ownable {

    constructor() Ownable(msg.sender) {}

    function deposit() public payable {

    }

    function withdraw() public onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}