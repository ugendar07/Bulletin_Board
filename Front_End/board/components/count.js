import React,{useState,useEffect} from "react";
import styles from "../styles/board.module.css"
import contract from "@/app/board";

const Count = ({updateCounts , setCount}) =>{

    const [writerCount ,setWriterCount] = useState(0)
    const [messageCount ,setMessageCount] = useState(0)
  


    const getWriterCount = async() =>{
      //Get the Count of the Accounts from the Contract
      try {
        const count = await contract.methods.getWriterCount().call();
        setWriterCount(count.toString())
      } catch (error) {
        console.error("Error posting message:", error);
        }
    }

    const getMessageCount = async() =>{
      //Get the Message count from the Contract
      try {
        const count = await contract.methods.getMessageCount().call();
        setMessageCount(count.toString())
      } catch (error) {
        console.error("Error posting message:", error);
      }      
    }

    //call Back the Main Component To Get the Updates
    useEffect(() => {
      getWriterCount();
      getMessageCount();
      setCount()
    }, [updateCounts]);
 


    return(
        <nav className={styles.count}>
            <div className={styles.main}>
                <h3>Users : {writerCount}</h3>
            </div>
            <div className={styles.main}>
                <h3>Messages : {messageCount}</h3>
            </div>

        </nav>
    )
}

export default Count