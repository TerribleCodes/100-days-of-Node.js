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

// let obj1 = {};
// obj1.first = "apple";
// obj1.second = "banana";
// obj1['third'] = "dragonfruit";

// let tempObj = {
//     'one':1,
//     'two':2,
//     'three':3
// }

// let myArray = ["Pumpkin","Lettuce","Tomatoes","Potatoes",tempObj]

// let obj2 = {
//     'value_1':myArray,
//     'value_2':obj1
// }



// let myObject = {
//     "fName":"This",
//     "mid_name":"is",
//     "lName":"Elon Musk"
// };

// console.log(myObject);

// // To a string
// let myObjectStringify = JSON.stringify(myObject);
// console.log(myObjectStringify);

// // Back to the object
// let myObjectParse = JSON.parse(myObjectStringify);
// console.log(myObjectParse);

const opt = document.querySelector('#display')
document.getElementById('viewData').addEventListener('click', () => {
    const id = "1ez8kzut72b4bcx1md8Ysb1bDmK11hQGTE4Pdsikre8M";
    const url = "https://spreadsheets.google.com/feeds/cells/2PACX-1vQobxB5kXEx7IXVMCQQaqpd0bIrrB-LBImoqhbZnjsYLKPPDM2Zw2oZoerPdyNgQMUH_V5rMabZAEMP/od6/public/basic?alt=json";
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.results);
    })
})