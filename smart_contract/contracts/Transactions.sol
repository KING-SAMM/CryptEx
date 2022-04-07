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

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public 
    {
        transactionCount += 1;

        // Push the transaction into the trnsactions array
        transactions.push(TransferStruct(
            msg.sender, 
            receiver, 
            amount,
            message, 
            block.timestamp, 
            keyword)
        );

        // To actually make the transfer, the event has to be emitted
        emit Transfer(
            msg.sender, 
            receiver, 
            amount,
            message, 
            block.timestamp, 
            keyword
        );
    }

    function getAllTransactions() public view returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256)
    {
        return transactionCount;
    }
}