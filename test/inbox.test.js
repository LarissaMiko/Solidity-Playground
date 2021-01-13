const assert = require('assert');
const ganache = require('ganache-cli');

// contructor function
const Web3 = require('web3');

// instance of web3 with provider
// local ganache network provides list of unlocked accounts to use
const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hello World!';

beforeEach(async () => {
    // Get list of all accounts
    accounts = await web3.eth.getAccounts()

    //Use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
    .send({from: accounts[0], gas:'1000000' });

    inbox.setProvider(provider)
}) 

describe('Inbox', () => {
    it('deploys contract', () => {
        // does inbox.options.adress exist (not null or undefined)
       assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_MESSAGE)
    })

    it('updates message correctly', async () => {
        await inbox.methods.setMessage('new message!').send({ from: accounts[0]});
        const updatedMessage = await inbox.methods.message().call();
        assert.strictEqual(updatedMessage, 'new message!')
    })
})
