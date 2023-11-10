"use client"
import Head from 'next/head'
import Image from 'next/image'
import  Header  from '../components/Heade.js'
import Main from '../components/Main.js'
import { useState } from 'react'
import Web3 from 'web3'
// import ethers from "ethers"

const Home = () => {

  const [isConnected, setIsConnected] = useState(false);
  let web3 = require('web3')
  // let ethers = require('ethers')
   


  const connectWallet = async () => {
    alert("Connecting Wallet")
    if (typeof window.ethereum !== 'undefined' && typeof window.ethereum.request !== 'undefined') {
      try {
        let chainId = await ethereum.request({method:'eth_chainId'});
        const reqChainId = '0x539'
        console.log("chain Id is :",chainId)
        if(chainId === reqChainId ){
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const addre = await web3.eth.getAccounts();
         
        setIsConnected(true)
        }else{
          alert("PLease Connect to the localhost 7545 Network")
        }
       } catch (error) {
         alert(error.message)
         console.log(error)
       }
    } else {
      // Please install MetaMask.
      alert("Please install MetaMask")
    }
  }
  

  const disconnectWallet = () =>{
    setIsConnected(false)
  }
  
  return (
      <section className='container'>
        <Header isConnected={isConnected} connectWallet={connectWallet} onDisconnect={disconnectWallet} />
        <Main isConnected={isConnected}/>
      </section>
      
  )
}


export default Home