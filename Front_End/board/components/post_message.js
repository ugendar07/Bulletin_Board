import React,{useState , useEffect} from "react";
import styles from "../styles/board.module.css"
import contract from "@/app/board";
import Web3 from 'web3'


const PostMessage = ({onMessagePosted}) => {
    let web3 = require('web3')
    let [userAccount,setUserAccount ]= useState('') 
    const [addresses , setAddresses] = useState([])
    const [hasPostedMessage, setHasPostedMessage] = useState(false);
    
    //Get the Address of the user
    const getAddress = async () =>{
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const addre = await web3.eth.getAccounts();
        const Account = await contract.methods.getWriterAccounts().call();
        setAddresses(Account.map(account => account.toString()))
        setUserAccount(addre[0])
    }


    const getSignature = async () =>{

        try{
            if(!addresses.includes(userAccount)){
                const _Name = document.getElementById('nickName').value;
                const _message = document.getElementById('message').value;
                const _topic = document.getElementById('topic').value;
                //Handle the Empty Message posting Case
                if (!_Name || !_message || !_topic) {
                    alert('Please Make Sure to  Enter Name , Topic and Message.');
                    return;
                }
                // Sign the Message along with Name and Topic\
                const _topicv = web3.utils.utf8ToHex(document.getElementById('topic').value);
                const message = _topicv + _message
                web3 = new Web3(window.ethereum)
                const sig = await web3.eth.personal.sign(web3.utils.utf8ToHex(message),userAccount,'')
            
            
                //Call Post Message Funtction with all the parameters
                postMessage(_Name,_topicv,_message,sig)
            }else{
                const _message = document.getElementById('message').value;
                const _topic = document.getElementById('topic').value;
                if (!_message || !_topic) {
                    alert("Please Make Sure to  Enter Topic and Message");
                    return;
                }else{
                // Sign the Message along with Name and Topic
                const _topicv = web3.utils.utf8ToHex(document.getElementById('topic').value);
                const message = _topicv + _message
                web3 = new Web3(window.ethereum)
                const sig = await web3.eth.personal.sign(web3.utils.utf8ToHex(message),userAccount,'')
             
                //Call Post Message Funtction with all the parameters
                postMessage("",_topicv,_message,sig)
                }
            }
            }catch (e){
                alert(e.message)
        }
    }

     

    useEffect(() => {
        getAddress()
    }, [hasPostedMessage]);
    
    const postMessage =  async (_Name,_topic,_message,sig) => {
         
        try {
             
            const max = 32 
            const topicValue = _topic.substring(0, max)
            const pad = topicValue.padEnd(66, '00')
            const topicVal =  pad 
    
            // Call the postMessage function from contract
            const result = await contract.methods.postMessage(_Name, _message, topicVal,sig).send({
                from: userAccount,
                gasLimit: 500000,
            });
            //call back to main component to update the New Message
            onMessagePosted();
            setHasPostedMessage(true);
            // console.log('Transaction hash:', result.transactionHash);
            alert('Message posted successfully.');
        } catch (error) {
            //Handle the error While posting a Message 
            alert(error.message);
        
        } 
    }
    

    return(
            <div>
                { !(addresses.includes(userAccount)) ? (
                    // Display all three forms when userAccount is in addresses
                    <>
                        <div className="">
                            <div className="grid grid-cols-1 ">
                                <div className="flex flex-row items-center justify-center">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold" htmlFor="nickName">
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="nickName" 
                                                type="text" 
                                                placeholder="Name" 
                                            />
                                        </label>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold " htmlFor="topic">
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="topic" 
                                                type="text" 
                                                placeholder="Topic" 
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full">
                                        <label className="block text-gray-700 text-sm flex font-bold " htmlFor="message">
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="message" 
                                                type="text" 
                                                placeholder="Message" 
                                            />
                                            <button onClick={getSignature} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-6 rounded flex "
                                                type="submit">
                                                <svg
                                                    className="h-6 w-6 ml-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                    id="telegram-1"
                                                    d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z" />
                                                </svg>
                                            </button>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    ) : (
                    // Display "Topic" and "Message" fields along with the button in a single row when userAccount is not in addresses
                    <>
                        <div className="grid grid-cols-1 ">
                            <div className="flex flex-row items-center justify-center">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold" htmlFor="topic">
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="topic"
                                            type="text"
                                            placeholder="Topic"
                                        />
                                    </label>
                                </div>
                                <div className="w-1/2 ">
                                    <label className="block text-gray-700 text-sm font-bold flex item-center justify-center" htmlFor="message">
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="message"
                                            type="text"
                                            placeholder="Message"
                                        />
                                        <button
                                            onClick={getSignature}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded flex"
                                            type="submit">
                                            <svg
                                                className="h-5 w-5 ml-2 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    id="telegram-1"
                                                    d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Z"
                                                />
                                            </svg>
                                        </button>
                                    </label>
                                </div> 
                            </div>
                        </div>
                    </>
                )} 
            </div>
        )
    }

export default PostMessage