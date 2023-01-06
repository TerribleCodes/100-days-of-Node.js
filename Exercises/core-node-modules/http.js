const http = require('http');

const server = http.createServer((req, res) => {
    const name = req.url.slice(1);
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`<h1>Hello ${name}</h1>`);

    // console.log(http.METHODS); // Get all the http methods available
    // console.log(http.STATUS_CODES); // Get all the status codes
    // console.log(req.headers); // Get all the headers
});

server.listen(3000, 'localhost');
console.log('Listening on port 3000');