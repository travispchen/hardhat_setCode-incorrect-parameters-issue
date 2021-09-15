// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

// Standard ERC-20 interface
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract UniswapRouterTest {
    IUniswapV2Router02 uniRouter;
    address WETH = address(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    address UNI = address(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);

    constructor() public {
        uniRouter = IUniswapV2Router02(address(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D));
        IERC20(WETH).approve(address(uniRouter), 2**256 - 1);
    }

    function test() public {
        address[] memory path = new address[](2);
        
        path[0] = WETH;
        path[1] = UNI; 

        uniRouter.swapExactTokensForTokens(1 ether, 0, path, address(this), block.timestamp);
    }
}