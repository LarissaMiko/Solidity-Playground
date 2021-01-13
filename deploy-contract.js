require("dotenv").config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const mnemonic = process.env.MNEMONIC;
const rinkebyNetworkLink = process.env.RINKEBY_NETWORK_LINK;

console.log(mnemonic)
console.log(rinkebyNetworkLink)
 
const provider = new HDWalletProvider(
    mnemonic,
    rinkebyNetworkLink
); 

const web3 = new Web3(provider);


const deployContract = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log(`Attempting to deploy from account ${accounts[0]}`)

   const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({ gas: '1000000', from: accounts[0]}); 

    console.log(`Contract deployed to ${result.options.address}`)

};

deployContract();