// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MockToken is ERC20Burnable {
    constructor() ERC20("MYTOK", "MTOK") {
        uint256 initialSupply = 10000;
        // The initial supply is minted to the deployer's address
        _mint(msg.sender, initialSupply);
    }
}

