import React, { useState , useEffect } from 'react';
import contract from '@/app/board';
import styles from '../styles/board.module.css';
import Web3 from 'web3';

const IndexSearch = ({ searchIndex }) => {
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      // Perform the search using the searchIndex value.
      const index = parseInt(searchIndex, 10);
      if (isNaN(index)) {
        // Handle the case where the input is not a valid number.
        setSearchResult('Please enter a valid index.');
      } else {
        const result = await contract.methods.getMessage(index - 1).call();
        // Process and display the search results.
        const writerAddress = result[0];
        const name = result[1];
        const message = result[2];
        const topic = result[3];
        const postTime = Number(result[4]);
        setSearchResult({
          writerAddress,
          name,
          message,
          topic: Web3.utils.hexToUtf8(topic).replace(/[^a-zA-Z0-9]/g, ''),
          postTime: new Date(postTime * 1000).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata',}),
        });
      }
    } catch (error) {
      // Handle any errors that may occur during the search.
      setSearchResult(error.message);
    }
  };
  

  useEffect(() => {
     handleSearch()
}, []);


  return (
    <div className="p-4">
        {searchResult !== null && (
            <div className="bg-gray-100 p-4  rounded-md">
            {typeof searchResult === 'string' ? (
            <p className='text-red-800'><strong>Message Not Found For This Index "Please Enter a Valid Index"</strong></p>
            ) : (
                <>
                  <div className="flex justify-between item-center text-gray-700 text-xs text-black text-lg">
                    <p>{""}</p>
                    <p><strong>Post Time:</strong> {searchResult.postTime}</p>
                  </div>
                  <div className="flex justify-between item-center text-gray-800 rounded-md font-bold bg-blue-200 p-1">
                    <p><strong>{searchResult.name}</strong></p>
                    <p><strong>{searchResult.writerAddress}</strong></p>
                  </div>
                    <p className="bg-gray-100 text-gray-800"><strong>Topic:</strong> {searchResult.topic}</p>
                    <p className="bg-gray-100 text-gray-800"><strong>Message:</strong> {searchResult.message}</p>
                </>
              )}
            </div>
          )
        }
      </div>
  );
};

export default IndexSearch;
