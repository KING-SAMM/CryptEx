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

    // Get the deployed smart contract with the abi, address and signer
    const transactionContract = new ethers.Contract( contractABI, contractAddress, signer );

    console.log({
        provider,
        signer,
        transactionContract
    })
}


/**
 * @title TransactionProvider
 * @dev This defines provider for our react transaction context
 * @params children
 * @returns Transaction context
 */

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');

    // Get data from form
    const [ formData, setFormData ] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

    const handleChange = (e, name) => 
    {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // Check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum)
                return alert("Please install Metamask");
    
            // If Metamask is installed and connected in browser, then 
            // 1. store the selected account in accounts array
            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            // 2. set that account as connected account
            if(accounts.length)
            {
                setCurrentAccount(accounts[0]);
    
                // getAllTransactions()
            }
            else
            {
                console.log("No accountas found");
            }
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    };

    // Connect Metamask wallet on button click
    // elsewhere in application
    const connectWallet = async () => {
        try {
            if (!ethereum)
                return alert("Please install Metamask");

            // If Metamask is installed, then
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    };


    // Send Transaction
    const sendTransaction = async () => 
    {
        try {
            if (!ethereum)
                return alert("Please install Metamask");

            // Get the data from the form
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    }


    // Call checkIfWalletIsConnected when application initailly loads
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    // Pass connectWallet over to all components
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange }}>
            {children}
        </TransactionContext.Provider>
    )
};

