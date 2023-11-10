import React,{useState,useEffect} from "react";
import contract from "@/app/board";
import styles from '../styles/board.module.css';

//Make the Accounts  as an array
function getSeperate(accounts){
    const array = accounts.split(",");
    return array.join("\n");

}

const Accounts = ({updateCounts , setCount}) => {

    const [accounts,setAccounts] = useState('')
    const[nickName , setNickName] = useState([])
    let name

    const getAccounts = async () => {

        try {
            //Get the Accounts from Contract
            const Account = await contract.methods.getWriterAccounts().call();
            setAccounts(Account.map(account => account.toString()));
        } catch (error) {
            alert(error.message)
        }
    }

    const getNickName = async () => {
        try{
            //Get the Names From contract 
            name = await contract.methods.getNickName().call();
            setNickName(name.map(nickName => nickName.toString()))
        } catch(e){
            alert(e.message)
        }
    }


    useEffect(() => {
        getNickName()
        getAccounts()
        setCount()
    }, [updateCounts]);
    


    return(
        <section>
            <div className="p-4">
                <h2 className="text-black text-lg font-bold">Addresses:</h2>
                {Array.isArray(accounts) ? (
                accounts.map((account, index) => (
                <div key={index} className="mt-2 bg-gray-100 p-4 rounded-md text-gray-800">
                    <p className=" text-lg ">User : {index + 1}</p>
                    <div className="flex justify-between bg-blue-200 item-center text-gray-700 text-black text-lg">
                        <p className="text-gray-700 font-semibold">{nickName[index]}</p>
                        <p className="text-gray-700 font-semibold">{getSeperate(account)}</p>
                    </div>
                </div>
                ))
                ) : (
                    <p className="p-4 rounded-md text-gray-500">No addresses available</p>
                )}
            </div>
        </section>
    )
}

export default Accounts