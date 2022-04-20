import React, { useContext } from "react";

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';
import { shortenAddress } from "../utils/shortenAddress"; 

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => 
{
    return (
        <div className="bg-[#18191A] m-4 flex flex-1
        2xl:min-w-[450px] 
        2xl:max-w-[500px] 
        sm:max-w-[270px] 
        sm:max-w-[300px] 
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            <div className="flex flex-col items-cinter w-full mt-3">
                <div className="flex justify-start w-full mb-6 p-2">

                </div>
            </div>
        </div>
    )
}

const Transactions = () => {
    const { currentAccount } = useContext(TransactionContext);

    return (
        // Optional text to render depending on whether account is connected or not
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                { currentAccount ? 
                ( <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3> ) 
                : 
                ( <h3 className="text-white text-3xl text-center my-2">Connect your account to see the latest transactions</h3>  ) }
                
                // Loop through the dummy data to render each one
                <div className="flex flex-wrap justify-center items-center mt-10">
                    { dummyData/reverse().map((transaction, i) => 
                    (
                        <TransactionCard key={ i } { ...transaction } />
                    )) }
                </div>
            </div>
        </div>
    );
}

export default Transactions;