const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

//return object that contains contract bytecode and ABI (interface)
module.exports = solc.compile(source, 1).contracts[':Inbox'];