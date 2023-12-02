
##Set Up
Install Nodejs 

Install Truffle using command ```bash npm install truffle -g``` -g flag ensures truffle installed globally

Install Ganache from Truffle suite or using command ```bash npm i -g ganache-cli```

open the project folder in cmd and run the following command ```bash truffle init``` it create build,contract,migrations,test folders 

write .sol file in contract and migration.js files in migrations then write test files in test folder with .js extention

Install Zeppelin libreries with command ```bash npm install @openzeppelin/contracts``` 

check Zeppelin installed properly using command ``` bash cat .\package.json``` 

compile the contracts using ``` bash truffle compile```

test contracts using ```bash truffle test```

to deploy the cotract use ```bash trufflr migrate```

##Compile and migration 

```bash truffle migration``` to compile contracts 

specify the path to store ABI in "package.json file under debug section make a compile line and specify the path" then run ```bash npm run compile```
