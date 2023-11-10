import Web3 from "web3";

const provider =  new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")

const web3 = new Web3(provider)
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"writerAddress","type":"address"},{"indexed":false,"internalType":"string","name":"Name","type":"string"},{"indexed":false,"internalType":"string","name":"message","type":"string"},{"indexed":false,"internalType":"bytes32","name":"topic","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"postTime","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"signature","type":"bytes"}],"name":"MessageInfo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getMessage","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_writerAddress","type":"address"}],"name":"getMessageByAddress","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"bytes32[]","name":"","type":"bytes32[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMessageCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNickName","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getWriterAccount","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWriterAccounts","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWriterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"messages","outputs":[{"internalType":"address","name":"writerAddress","type":"address"},{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"message","type":"string"},{"internalType":"bytes32","name":"topic","type":"bytes32"},{"internalType":"uint256","name":"postTime","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nickName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_Name","type":"string"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"bytes32","name":"_topic","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"postMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"writerAccounts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const contractAddress = "0xa324466b5d4689F47C8FA144f45DcED7c6Cd2C9F"

const contract = new web3.eth.Contract(abi, contractAddress)


export default contract