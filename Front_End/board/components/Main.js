import React from "react";
import Count from "./count.js";
import Events from "./get_messages.js";
import Accounts from "./accounts.js";
import PostMessage from "./post_message.js";
import IndexSearch from "./index_search.js";
import AddressSearch from "./address_search.js";
import styles from '../styles/board.module.css';
import { useState } from "react";
import Image from 'next/image'


const Main = ({isConnected}) => {
    const [selectedView, setSelectedView] = useState(null);
    const [searchAddress,setSearchAddress] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [updateCounts ,setUpdateCount] = useState(false)
  


    //Update the Counts and Messages on New Messages
    const onMessagePosted = () =>{
        setUpdateCount(true)
    }

    //Reset the Updated count to Handle the new Messages
    const setCount = () =>{
        setUpdateCount(false)
    }
     
    
    //Handle the search by index component
    const handleIndexSearch = () => {
        setSelectedView(searchInput);
        };

    
    //Handle the search by index component
    const handleAddressSearch = () => {
        setSelectedView(searchAddress);
    }

    return (
        <div className="h-screen flex flex-col">
            {isConnected ? (
                <>
                <div className="h-screen flex flex-col relative">
                    <Count updateCounts={updateCounts} setCount={setCount}/>
                        <div className="h-screen flex">
                            <div className='w-1/5 bg-gray-100 text-black text-1.5xl flex flex-col gap-4'>
                                <button onClick={() => setSelectedView("messages")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-600 hover:border-blue-500 rounded">
                                    Messages
                                </button>
                                <button onClick={() => setSelectedView("accounts")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-600 hover:border-blue-500 rounded">
                                    Accounts
                                </button>
                                <div className="flex">
                                    <input type="number" placeholder="Enter Index" id="Enter Index"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    className="w-3/4 p-2 border border-gray-400 rounded-3"/>
                                    <button
                                        onClick={handleIndexSearch}
                                        className={`w-1/4 bg-blue-500 flex item-center justify-center hover:bg-blue-600 text-white font-bold py-2 rounded-r`}
                                        type="submit">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor" className="h-5 w-5">
                                            <path
                                            fillRule="evenodd"
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                            clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex">
                                    <input type="text" placeholder="Enter Address" id="Enter Address"
                                    value={searchAddress}
                                    onChange={(e) => setSearchAddress(e.target.value)}
                                    className="w-3/4 p-2 border border-gray-400 rounded-3"/>
                                    <button
                                        onClick={handleAddressSearch}
                                        className={`w-1/4 bg-blue-500 flex item-center justify-center hover:bg-blue-600 text-white font-bold py-2 rounded-r`}
                                        type="submit">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor" className="h-5 w-5">
                                                <path
                                                fillRule="evenodd"
                                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                clipRule="evenodd" />
                                            </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='flex-1 h-5/6 w-full w-4/5 overflow-y-auto'>
                                {selectedView === "messages" && <Events updateCounts={updateCounts} setCount={setCount}/>}
                                {selectedView === "accounts" && <Accounts updateCounts={updateCounts} setCount={setCount}/>}
                                {selectedView === searchInput && <IndexSearch searchIndex={searchInput} />}
                                {selectedView === searchAddress && <AddressSearch searchAddress={searchAddress} />}
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 w-full">
                            <PostMessage onMessagePosted={onMessagePosted}/> 
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                    <div className={styles.main}>
                        <h1>Welcome to Bulletin Board</h1>
                        <h2>Please connect your wallet to access messages.</h2>
                    </div>
                </div>
                <Image src={'/background.png'} alt='blur' loading="lazy" width={700} height={500} style={{ maxWidth: '70%', maxHeight: '70%', width: 'auto', height: 'auto' }}/>
                </div> 
            )}
        </div>
    );
}

export default Main;
