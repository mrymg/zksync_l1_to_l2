// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IL1Bridge} from "@matterlabs/zksync-contracts/l1/contracts/bridge/interfaces/IL1Bridge.sol";


contract L1TokenSender {


    function sendToken(address tokenAddress, address recipent ,uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(recipent, amount), "Transfer to bridge failed");
    }

    function sendToL2(
            address bridgeAddr,
            address l2Receiver,
            address l1Token,
            uint256 amount,
            uint256 l2TxGasLimit,
            uint256 l2TxGasPerPubdataByte
        ) public {

        require(amount > 0);

        IL1Bridge bridge = IL1Bridge(bridgeAddr);

        bridge.deposit(l2Receiver, l1Token, amount, l2TxGasLimit, l2TxGasPerPubdataByte, address(this));
    }

}



