import React, { useContext } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from '../utils/shortenAddress';

// Common repeated styles
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white";

// Input component for form input elements
const Input = ({ placeholder, type, name, value, handleChange }) => (
    <input 
        type={ type }
        placeholder={ placeholder }
        step="0.0001"
        value={ value }
        onChange={ (e) => handleChange(e, name) }
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

// Welcome (Main) Component 
const Welcome = () => {
    // connectWallet and currentAccount, passed in 
    // via context api from TransactionContext.jsx module
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext( TransactionContext );

    // Handle Submit
    const handleSubmit = (e) => 
    {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if( !addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    }

    // at getEthereumContract (TransactionContext.jsx:26:33)
    // at sendTransaction (TransactionContext.jsx:114:13)
    // at handleSubmit (Welcome.jsx:39:9)

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col items-start justify-between md:pt-10 pb-20 py-12 px-4 sm:pt-2">
                

                {/* Left Side of Layout  */}
                <div className="flex flex-1 justify-center items-center flex-col mf:mr-10 md:w-[80vw] ">

                    {/* Large Welcome Text  */}
                    <h1 className="text-3xl md:text-7xl sm:text-5xl text-white text-gradient py-1">
                        Trade in Crypto <br /> Trade with CryptEx
                    </h1>
                    <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Join millions on CryptEx - the largest cryptocurrency marketplace
                    </p>

                    {/* Blue Button: Render if there is no current account  */}
                    { !currentAccount && (
                        <button
                            type="button"
                            onClick={ connectWallet }
                            className="flex flex-row justify-center items-center my-5 md:w-[70vw] lg:w-[50vw] bg-[#007085] p-3 rounded-full cursor-pointer hover:bg-[#005060]"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}

                    {/* Grid  */}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full my-10">
                        <div className={ `rounded-tl-2xl ${ commonStyles }` }>
                            Reliability
                        </div>
                        <div className={ `${ commonStyles }` }>
                            Security
                        </div>
                        <div className={ `rounded-tr-2xl ${ commonStyles }` }>
                            Ethereum
                        </div>
                        <div className={ `rounded-bl-2xl ${ commonStyles }` }>
                            Web 3.0
                        </div>
                        <div className={ `${ commonStyles }` }>
                            Low Gas
                        </div>
                        <div className={ `rounded-br-2xl ${ commonStyles }` }>
                            Blockchain
                        </div>
                    </div>
                </div>


                {/* Right Side of Layout  */}
                <div className="flex flex-col lg:flex-row flex-1 justify-center items-center space-between w-full mf:mt-10 mt-10">

                    {/* Form  */}
                    <div className="p-5 sm:w-96 w-full md:w-full flex flex-col justify-start items-center lg:mr-2 blue-glassmorphism">
                        <Input type="text" placeholder="Address To" name="addressTo" handleChange={ handleChange } />
                        <Input type="number" placeholder="Amount (ETH)" name="amount" handleChange={ handleChange } />
                        <Input type="text" placeholder="Keyword (GIF)" name="keyword" handleChange={ handleChange } />
                        <Input type="text" placeholder="Enter message" name="message" handleChange={ handleChange } />
 q
                        <div className="h-[1px] w-full bg-gray-400 my-2 " />

                        {
                            isLoading ? ( <Loader /> ) 
                            : (
                                <button
                                    type="button"
                                    onClick={ handleSubmit } 
                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"

                                >
                                    Send Now 
                                </button>
                            )
                        }

                    </div>

                    {/* Card  */}
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full md:w-full my-5 lg:ml-2 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#ffffff" />
                                </div>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    { shortenAddress(currentAccount) }
                                </p>
                                
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Welcome;