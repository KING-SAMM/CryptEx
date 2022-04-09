import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// To interact with any smart contract we need its address and abi
import { contractAddress, contractABI } from "../utils/constants";

// We need the react application context
export const TransactionContext = React.createContext();

// We need access to the ethereum object,
// which we have access to through the window object 
// via metamask
const { ethereum } = window;

/**
 * @title getEthereumContract
 * @dev Function to fetch the ethereum contract
 */
const getEthereumContract = () => 
{
    // Get the signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    // Get the deployed smart contract
    const transactionContract = new ethers.Contract( contractABI, contractAddress, signer );

    console.log({
        signer,
        transac
    })
}
