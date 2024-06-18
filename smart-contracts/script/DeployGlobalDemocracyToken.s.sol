// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

import {Defender, ApprovalProcessResponse} from "openzeppelin-foundry-upgrades/Defender.sol";
import {Upgrades, Options} from "openzeppelin-foundry-upgrades/Upgrades.sol";

import {GlobalDemocracyToken} from "../src/GlobalDemocracyToken.sol";

contract DefenderScript is Script {
    function setUp() public {}

    function run() public {
        ApprovalProcessResponse memory upgradeApprovalProcess = Defender
            .getUpgradeApprovalProcess();

        if (upgradeApprovalProcess.via == address(0)) {
            revert(
                string.concat(
                    "Upgrade approval process with id ",
                    upgradeApprovalProcess.approvalProcessId,
                    " has no assigned address"
                )
            );
        }

        Options memory opts;
        opts.defender.useDefenderDeploy = true;
        opts.unsafeAllow = "internal-function-storage";

        address proxy = Upgrades.deployUUPSProxy(
            "GlobalDemocracyToken.sol",
            abi.encodeCall(
                GlobalDemocracyToken.initialize,
                (
                    0x000C171fd5B1267F0B608f59A43ac0afF8E5E6F0,
                    0x000C171fd5B1267F0B608f59A43ac0afF8E5E6F0,
                    0x000C171fd5B1267F0B608f59A43ac0afF8E5E6F0,
                    upgradeApprovalProcess.via
                )
            ),
            opts
        );

        console.log("Deployed proxy to address", proxy);
    }
}
