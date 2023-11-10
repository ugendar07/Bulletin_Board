import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import contract from '@/app/board';
import styles from '../styles/board.module.css';
import Web3 from 'web3';
import { isAddress } from 'ethers';

const AddressSearch = ({ searchAddress }) => {

    const [writerAddress ,setWriterAdddress] = useState([])
    const [writerName ,setWriterName] = useState([])
    const [writerMessage ,setMessage] = useState('')
    const [writerTopic ,setTopic] = useState('')
    const [writerPostTime ,setPostTime] = useState('')
    const [isError , setIsError] = useState(false)


    
    const getMassegeByAddress = async () => {
     
      try {
        // console.log('in getMassege in the getMessageByAddress');
        const searchInput = searchAddress;
        // Perform the search using the searchAddress value.
        if(isAddress(searchInput)){
          // Process and display the search results.
          const result = await contract.methods.getMessageByAddress(searchInput).call();
          setWriterAdddress(result[0])
          setWriterName(result[1])
          setMessage(result[2])
          setTopic(result[3])
          setPostTime(result[4])
           
        }else{
          // Handle the case where the input is not a valid Address.
          setIsError(true)
        }
        
      } catch (error) {
        setIsError(true)
      }
     
    };
    useEffect(() => {
      getMassegeByAddress()
    }, []);

   
  return (
    <div className="p-4 ">
      {writerAddress !== null && (
          <div className=" p-4 grid grid-cols-1 gap-2">
            {isError ? (
              <p className='text-red-800 p-4 bg-gray-100  rounded-md'><strong>Message Not Found For This Address "Please Enter a Valid Address"</strong></p>
            ) : ( 
            <>
              {writerAddress.map((writer, index) => (
                <div  key={index} className='p-4 bg-gray-100  rounded-md'>
                  <div className=" flex justify-between item-center text-xs text-black text-lg ">
                    <p><strong>Message:</strong> {writerAddress.length - index}</p>
                    <p>
                      <strong>Post Time:</strong>
                      <span>
                        {new Date(Number(writerPostTime[writerAddress.length - index - 1]) * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                      </span>
                    </p>
                  </div>
                  <div className='flex justify-between item-center text-gray-800 rounded-md font-bold bg-blue-200 p-1'>
                    <p className="text-gray-800 font-semibold "> <span>{writerName[writerAddress.length - index - 1]}</span></p>
                    <p className="text-gray-800"> <span>{writer}</span></p>
                  </div>
                  <div className='bg-gray-100 rounded-md'>
                    <p className='text-gray-800 font-semibold' >
                      Topic:  <span className='text-gray-800 font-normal' >{Web3.utils.hexToUtf8(writerTopic[writerAddress.length - index - 1]).replace(/[^a-zA-Z0-9]/g, '')}</span>
                    </p>
                    <p className="bg-gray-100  rounded-md text-gray-800 font-semibold">Message: <span className='text-gray-800 font-normal'>{writerMessage[writerAddress.length - index - 1]}</span></p>
                  </div>
                </div>
              ))}
            </>
            )}
          </div>
        )}   
    </div>
  );
};

export default AddressSearch;
