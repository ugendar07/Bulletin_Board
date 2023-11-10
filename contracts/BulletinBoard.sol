// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/Ownable.sol";

contract BUlletinBoard is Ownable {

    struct Message {
        address writerAddress;
        string Name;
        string message;
        bytes32 topic;
        uint256 postTime;
        bytes signature;

    }

        address[] public writerAccounts;
        string[] public nickName;
        Message[] public messages;
        constructor(){

    }


    event MessageInfo(
        address writerAddress,
        string Name,
        string message,
        bytes32 topic,
        uint256 postTime,
        bytes signature
    );


    function postMessage(string memory _Name, string memory _message, bytes32 _topic , bytes memory _signature) public {
        bool isDuplicate = false;
        string memory writerName;

        
        for (uint256 i = 0; i < messages.length ; i++) {
            if (messages[i].writerAddress == msg.sender) {
                writerName = messages[i].Name;
                isDuplicate = true;
                break;
            }
        }

        if (!isDuplicate) {
            writerAccounts.push(msg.sender);
            nickName.push(_Name);
            messages.push(Message(msg.sender, _Name, _message, _topic, block.timestamp ,_signature));
            emit MessageInfo(msg.sender, _Name, _message, _topic, block.timestamp,_signature);
            }
        else{
            messages.push(Message(msg.sender, writerName, _message, _topic, block.timestamp ,_signature));
            emit MessageInfo(msg.sender, writerName, _message, _topic, block.timestamp,_signature);
        }
        
    }

    function getNickName() view public returns (string[] memory) {
        return (nickName);
    }

    function getWriterAccounts() view public returns (address[] memory ) {
        return (writerAccounts );
    }

    function getWriterAccount(uint256 _index) view public returns (address) {
        require(_index < writerAccounts.length, "Invalid index");
        return writerAccounts[_index];
    }

    function getWriterCount() view public returns (uint) {
        return writerAccounts.length;
    }

    function getMessage(uint256 _index) view public returns (address, string memory, string memory, bytes32, uint256 , bytes memory) {
        require(_index < messages.length, "Invalid index");
        Message storage msgInfo = messages[_index];
        return (msgInfo.writerAddress, msgInfo.Name, msgInfo.message, msgInfo.topic, msgInfo.postTime , msgInfo.signature);
    }



    function getMessageByAddress(address _writerAddress) view public returns (address[] memory, string[] memory, string[] memory, bytes32[] memory, uint256[] memory , bytes[] memory) {
        uint256 count = 0;
    
        for (uint256 i = 0; i < messages.length; i++) {
            if (messages[i].writerAddress == _writerAddress) {
            count++;
            }
        }

        address[] memory writerAddresses = new address[](count);
        string[] memory names = new string[](count);
        string[] memory messagess = new string[](count);
        bytes32[] memory topics = new bytes32[](count);
        uint256[] memory postTimes = new uint256[](count);
        bytes[] memory signature = new bytes[](count);

        uint256 currentIndex = 0;

        if(count!=0){
            for (uint256 i = 0; i < messages.length; i++) {
                if (messages[i].writerAddress == _writerAddress) {
                    writerAddresses[currentIndex] = messages[i].writerAddress;
                    names[currentIndex] = messages[i].Name;
                    messagess[currentIndex] = messages[i].message;
                    topics[currentIndex] = messages[i].topic;
                    postTimes[currentIndex] = messages[i].postTime;
                    signature[currentIndex] = messages[i].signature;
                    currentIndex++;
                }
            }
        return (writerAddresses, names, messagess, topics, postTimes , signature);
        }else{
            revert("Message not found");
        }
    
    }


    function getMessageCount() view public returns (uint) {
        return messages.length;
    }
}
