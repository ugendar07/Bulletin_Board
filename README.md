# Bulletin Board Smart Contract

## Overview

This project is an Ethereum smart contract that serves as a bulletin board, allowing users to post messages and interact with the content on the Ethereum blockchain. Additionally, a frontend application has been developed to provide a user-friendly interface for interacting with the smart contract.

## Features

- **Bulletin Board Smart Contract:** The core functionality of the project is implemented in an Ethereum smart contract. Users can post messages, read existing messages, and interact with the bulletin board.

- **Frontend Application:** A user interface has been developed to interact with the smart contract. The frontend allows users to easily submit messages, view existing messages, and engage with the bulletin board.

## Getting Started

### Prerequisites

```bash
# Install Node.js and npm
[Node.js and npm](https://nodejs.org/)

# Install Truffle - Smart contract development framework
npm install -g truffle

# Install Ganache - Local blockchain for testing
[Ganache](https://www.trufflesuite.com/ganache)
```
git clone[ethereum-bulletin-board.git](https://github.com/ugendar07/Bulletin_Board.git)
### Instalation
```bash
# Clone the repository
git clone[ethereum-bulletin-board.git](https://github.com/ugendar07/Bulletin_Board.git)

# Navigate to the project directory
cd ethereum-bulletin-board

# Install dependencies
npm install

# Compile and deploy the smart contract
truffle compile
truffle migrate
```

## Usage
1. Connect your Ethereum wallet to the frontend application.
2. Interact with the bulletin board by posting messages or reading existing messages.
3. Explore the decentralized bulletin board functionality on the Ethereum blockchain.

## License
This project is licensed under the ```MIT License```.

## Acknowledgments
- **Special thanks to Truffle for providing an excellent smart contract development framework.**
## Contact 
For questions or support, please contact ugendar07@gmail.com.
## Set Up
Install Nodejs 

Install Truffle using command ``` npm install truffle -g``` -g flag ensures truffle installed globally

Install Ganache from Truffle suite or using command ``` npm i -g ganache-cli```

open the project folder in cmd and run the following command ``` truffle init``` it create build,contract,migrations,test folders 

write .sol file in contract and migration.js files in migrations then write test files in test folder with .js extention

Install Zeppelin libreries with command ``` npm install @openzeppelin/contracts``` 

check Zeppelin installed properly using command ```  cat .\package.json``` 

compile the contracts using ```  truffle compile```

test contracts using ``` truffle test```

to deploy the cotract use ``` trufflr migrate```

## Compile and migration 

``` truffle migration``` to compile contracts 

specify the path to store ABI in "package.json file under debug section make a compile line and specify the path" then run ``` npm run compile```
