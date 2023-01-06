const fs = require('fs');

fs.readFile('./text.txt', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log("Async Data --> " + data.toString())
    }
});

var data = fs.readFileSync('./text.txt');
console.log('Sync Data --> ' + data);