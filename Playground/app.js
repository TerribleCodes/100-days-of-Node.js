// // const http = require('http');

// // const server = http.createServer((request, response) =>{
// //         if(request.url === '/'){
// //             response.write("Hello World");
// //             response.end();
// //         }
// //         if(request.url === '/api/courses'){
// //             // Passes an array
// //             response.write(JSON.stringify([1,3,4,5]));
// //             response.end();
// //         }
// //     }
// // );

// // // Starts Listening
// // server.listen(3000);
// // console.log("Listening in port 3000");

// const http = require('http')
// const addValues = require('./logger.js')
// let i = addValues.myFunction(1,2);

// console.log("Initializing in...")

// for (let i=10; i>0; i--){
//     setTimeout(() => {
//         console.log(i)
//     }, 2000)
// }

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write("<h1>Help</h1>");
//     res.end();
// }).listen(8080);

// const http = require('http')
// const fs = require('fs')

// http.createServer(function(req, res){
//     fs.readFile('./logger.js', function(err, data){
//         res.write(data);
//         res.end();
//     });
// }).listen(8080);

// fs.appendFile('myfile2.html',"hello world",(err) =>{
//     if (err) throw err;
//     console.log('saved')
//     }
// )

