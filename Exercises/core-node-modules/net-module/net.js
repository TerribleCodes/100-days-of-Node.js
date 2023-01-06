const net = require('net');

const server = net.createServer();

const connectedClients = [];

server.listen({
    host: 'localhost',
    port: 3000
});

server.on('connection', (client) => {
    console.log('Client Connected...');
    client.write('Welcome to the server');
    connectedClients.push(client);
});

setInterval(() => {
    const now = new Date().toString();
    connectedClients.forEach(client => {
        client.write(now)
    });
}, 2000);