import React,{useState,useEffect} from "react";
import styles from '../styles/board.module.css';
import contract from "@/app/board";
import Web3 from 'web3'

const Events = ({updateCounts , setCount}) =>{
    let web3 = require('web3')
    const [eventData,setEventData] = useState([])
    const [messageCount ,setMessageCount] = useState(0)
    const [flag , setFlag] = useState([])



    const getEvents = async () => {
        try{
            //Get Events that are Emitted by the Contract
            const events = await contract.getPastEvents('MessageInfo', {
                fromBlock: 0,
                toBlock: 'latest'
            }, function(error, events){ console.log(events); })
                .then(function(events){
                getMessages(events)
                
            });
        } catch(e){
            alert(e.message)
        }
    }

    const getMessages = (events) => {
        // console.log("Printing return values of events:");
        try{
            //Get the Return Values from the Event Data
            const newEventData = events.map((event) => event.returnValues);
            setEventData(newEventData);
            // verifySig(events)
      
        }catch{
            alert("Error in events :")
        }
    };

    const getMessageCount = async() =>{
        //Get the Message count from the Contract
        try {
          const count = await contract.methods.getMessageCount().call();
          setMessageCount(count.toString())
           
        } catch (error) {
          console.error("Error posting message:", error);
        }      
    }


    const verifySig = (events) => {
        try {
            const data = events.map((event) => event.returnValues);
            data.forEach((eventData) => {
                const topic = eventData.topic.replace(/0+$/, '')
                const message  = topic + eventData.message
                const recoverAdd = web3.eth.accounts.recover(
                    web3.utils.utf8ToHex(message),
                    eventData.signature
                );
                // console.log("REcovered Address :",recoverAdd)
                // console.log("Actual Address :",eventData.writerAddress)
                // console.log("Is the Signature verified:", recoverAdd === eventData.writerAddress);
            });
        } catch (e) {
            alert(e.message);
        }
    };
    
    

    //Call back to the Main component For Updates
    useEffect(() => {
        getMessageCount()
        getEvents()
        setCount()
    }, [updateCounts]);



    return(
        <section>
            <div className="p-4">
                <div className={`${styles.main} grid grid-cols-1 gap-3`}>
                    {eventData.slice().reverse().map((event, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-4  rounded-md"
                    >
                        <div className="flex justify-between item-center text-gray-700 text-xs text-black text-lg">
                            <p><strong>Message:</strong> {messageCount - index}</p>
                            <p>
                                <strong>Post Time:</strong>
                                {new Date(Number(event.postTime) * 1000).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                            </p>
                        </div>
                        <div className="flex justify-between item-center text-gray-800 rounded-md font-bold bg-blue-200 p-1">
                            <p className="text-gray-700 "> {event.Name}</p>
                            <p className="text-gray-700 "> {event.writerAddress}</p>
                        </div>
                        <p className="text-gray-700 font-semibold flex overflow-y-auto">Topic: <span className='text-gray-800 font-normal' >  {web3.utils.hexToUtf8(event.topic).replace(/[^a-zA-Z0-9]/g, '')}</span></p>
                        <p className="text-gray-700 font-semibold">Message: <span className='text-gray-800 font-normal' >  {event.message}</span></p>
                        {/* <p className="text-gray-700 font-semibold flex overflow-y-auto">Signature:  <span className='text-gray-800 font-normal' >{ event.signature}</span></p> */}
                        {/* <p className="text-gray-700 font-semibold flex overflow-y-auto">Signature:  <span className='text-gray-800 font-normal' > Recovered Address {web3.eth.accounts.recover(web3.utils.utf8ToHex(event.topic.replace(/0+$/, '') + event.message),event.signature)} </span></p> */}
                        <p className="text-gray-700 font-semibold flex overflow-y-auto">Signature:  <span className='text-gray-800 font-normal' >{ web3.eth.accounts.recover(web3.utils.utf8ToHex(event.topic.replace(/0+$/, '') + event.message),event.signature) === event.writerAddress ? 'Signature is Verified' : 'Not a Valid Signature'}</span></p>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    )
    
}

export default Events