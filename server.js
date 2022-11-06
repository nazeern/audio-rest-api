// Set up server at port and listen for requests

const http = require('http');
const app = require('./app')

// Assign port on which project runs
const port = process.env.PORT || 3000;

// Create server, express app is our request handler
const server = http.createServer(app);


server.listen(port);

