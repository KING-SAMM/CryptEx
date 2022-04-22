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
    console.log("Boom! Contract gotten!");
    // Get the signer
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();


    // Get the deployed smart contract with the abi, address and signer
    const transactionContract = new ethers.Contract( contractAddress, contractABI, signer );

    return transactionContract;
    
};


/**
 * @title TransactionProvider
 * @dev This defines provider for our react transaction context
 * @params children
 * @returns Transaction context
 */
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");

    // Get data from form
    const [ formData, setFormData ] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });

    // Loading state
    const [  isLoading, setIsLoading ] = useState(false);

    // Store and keep track of transaction count
    const [ transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'));

    // Handle input value change
    const handleChange = (e, name) => 
    {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    

    // Get all the transactions
    const getAllTransactions = async () => 
    {
        try 
        {
            // Check if Metamask is insatalled
            if (!ethereum) return alert("Please install Metamask");

            const transactionContract = await getEthereumContract();

            // Get all available transactions using getAllTransactions() method 
            // on our samrt contract
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: trabaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber * 1000)
            }));

            console.log(availableTransactions);
        } catch (error) {
            console.error(error);
        }
    };


    // Check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
    
            // If Metamask is installed and connected in browser, then 
            // 1. store the selected account in accounts array
            const accounts = await ethereum.request({ method: 'eth_accounts' });
    
            // 2. set that account as connected account
            if(accounts.length)
            {
                setCurrentAccount(accounts[0]);

                console.log(accounts[0]);
                
                // Get and display all available transactiions
                getAllTransactions();
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


    // Verify that transaction exists before rendering on page
    const checkIfTransactionsExist = async () => 
    {
        try {
            // Get the Ethereum contract
            const transactionContract = getEthereumContract();

            // Get the transaction count
            const transactionCount = await transactionContract.getTransactionCount();

            // Set transaction count to equal transaction count in local storage
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    };

    
    // Connect Metamask wallet on button click
    // elsewhere in application
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

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
            if (!ethereum) return alert("Please install Metamask");
            
            // Get the data from the form
            const { addressTo, amount, keyword, message } = formData;

            // Convert amount from form (in decimal) to ethers or hex
            const parsedAmount = ethers.utils.parseEther(amount);

            // Get the Ethereum contract
            const transactionContract = getEthereumContract();

            // Request/send Transaction with Options
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',   // 21000 GWEI
                    value: parsedAmount._hex
                }]
            });

            // Add the transaction to blockchain, this returns the transaction hash
            const transactionHash = await transactionContract.addToBlockchain( addressTo, parsedAmount, message, keyword );

            // While waiting for transaction to complete..
            setIsLoading(true);
            console.log(`Loading... ${ transactionHash.hash }`);
            await transactionHash.wait();

            // ...on success
            setIsLoading(false);
            console.log(`Success... ${ transactionHash.hash }`);

            // Get the transaction count
            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object.");
        }
    };



    // Call checkIfWalletIsConnected and checkIfTransactionsExist() 
    // when application initailly loads
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);


    // Pass connectWallet over to all components
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}; 

