Steps Followed:

Install Nodejs 

Install Truffle using command '''npm install truffle -g''' -g flag ensures truffle installed globally

Install Ganache from Truffle suite or using command '''npm i -g ganache-cli'''

open the project folder in cmd and run the following command ''truffle init'' it create build,contract,migrations,test folders 

write .sol file in contract and migration.js files in migrations then write test files in test folder with .js extention

Install Zeppelin libreries with command ''npm install @openzeppelin/contracts'' 

check Zeppelin installed properly using command ''cat .\package.json'' 

compile the contracts using ''truffle compile''

test contracts using ''truffle test''

to deploy the cotract use ''trufflr migrate''

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Compile and migration %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

''truffle migration'' to compile contracts 

specify the path to store ABI in "package.json file under debug section make a compile line and specify the path" then run ''npm run compile''
