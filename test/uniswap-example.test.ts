import { ethers, network } from "hardhat";

import { Contract } from "ethers";
import { WETH_ABI } from "../src/abi";
import { WETH_ADDRESS } from "../src/addresses";

const hre = require("hardhat");

describe("Uniswap Example", async function () {
    let UNISWAP_ROUTER_CONTRACT: Contract;
    let UNISWAP_ROUTER_TEST_CONTRACT: Contract;
    let WETH_CONTRACT: Contract;

    beforeEach(async function () {
        const UNISWAP_ROUTER_TEST_FACTORY = await ethers.getContractFactory("UniswapRouterTest")
        UNISWAP_ROUTER_TEST_CONTRACT = await UNISWAP_ROUTER_TEST_FACTORY.deploy()

        // const UNISWAP_ROUTER_FACTORY = await ethers.getContractFactory("UniswapV2Router02")
        // UNISWAP_ROUTER_CONTRACT = await UNISWAP_ROUTER_FACTORY.deploy("0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
        
        WETH_CONTRACT = await ethers.getContractAt(WETH_ABI, WETH_ADDRESS)
        WETH_CONTRACT.deposit({value: ethers.utils.parseUnits("80.0", "ether")})

        
        
    });

    it("Regular Uniswap Router Call", async function () {
        await WETH_CONTRACT.transfer(UNISWAP_ROUTER_TEST_CONTRACT.address, ethers.utils.parseUnits("10.0", "ether"))
        await UNISWAP_ROUTER_TEST_CONTRACT.test()
    });

    it("hardhat_setCode Uniswap Router Call", async function() {
        const artifact = await hre.artifacts.readArtifact("UniswapV2Router02")
        await network.provider.send("hardhat_setCode", [
            "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
            artifact.deployedBytecode,
            // UNISWAP_ROUTER_CONTRACT
        ]);
        await UNISWAP_ROUTER_TEST_CONTRACT.test()
    })
});
