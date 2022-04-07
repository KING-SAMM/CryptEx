// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

/**
 * @title Transactions
 * @dev Send ethers over the ethereum blockchain with details of the transaction
 */
contract Transactions 
{
    uint256 transactionCount;

    // Transfer is an event type to be called/fired on every transaction
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    // Structure or type of each transaction object
    struct TransferStruct 
    {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Collection/array of transactions
    TransferStruct[] transactions;

    function addToBlockchain() public
    {

    }

    function getAllTransactions() public view returns (TransferStruct[] memory)
    {
        // return transactions
    }

    function getTransactionCount() public view returns (uint256)
    {
        // return transactionCount
    }
}