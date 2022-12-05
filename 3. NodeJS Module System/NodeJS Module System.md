- - - - - - - - - -
### Basically there are 2 types of NodeJS modules
1. Commons JS
2. ESM

Refer [this Image](./commonjs-vs-esm.png)

- - - - - - - - - -

Before Node execute a function it, wraps the module code into a `module wrapper function` which is an anonymous function.


> The module code may look like this...
```javascript
    const error = "syntax error"
    // Module code
```

> after wrapping (which happens before execution) function looke like this...
```javascript
    (function(exports, require, module, __filename, __dirname){
        // Module code
    });
```

- - - - - - - - - -

# Importing a module

> Global methods
- `log()`
- `setTimeout()`
- `clearTimeout()`
- `setInterval()`
- `clearInterval()`

<hr>

### Callback Function --A short recap--

```javascript
console.log("Executing in 1s")
setTimeout(() => {
    console.log("Executing")
}, 5000)
```

```javascript
let names = ["a", "b", "c", "d", "e"]

names.forEach((value) => {
    console.log(value)
})
```

<hr>

## Creating your own module

```javascript
// Import the required module content (locally available)
const logger = require('./logger.js')

// console.log(logger.url)
logger.log("This URL");
```

```javascript
var url = 'http://mylogger.io/log';
var name = "Nothing Here";

function log(message){
    console.log(message,url)
}

// Exports the module content
exports.functionName = log;
exports.attributeName = name;

// Can view the module contents. Ex: `log` Export.
console.log(module)
```

> To export multiple module contents  

```javascript
module.exports = {method1, method2, method3}
```


## File System Module

```javascript
const fs = require('fs')

let sync_directory = fs.readdirSync('./')
let async_directory = fs.readdir('.$', function(err, files){
    if (err) console.log('Error', err)
    else console.log('Results', files)
});

console.log(sync_directory)
console.log(async_directory)
```

## Path Module

```javascript
const path = require('path')
let pathObj = path.parse(__filename)

console.log(pathObj)
```

## OS Module

```javascript
const os = require('os')

let freeMem = os.freemem()
let totalMem = os.totalmem()

console.log(`Free Memory: ${freeMem}`)
console.log(`Total Memory: ${totalMem}`)
```

## Event Module

```javascript
// Import the Logger Class
const Logger = require('./logger');

// Create an object
const logger = new Logger();

// Register Emmiter
logger.on('activete_emitter', (arg) => {
    console.log('Listner Called', arg)
});

logger.log('Hello World')
```

```javascript
// Module Class
const EventEmitter = require('events');

class Logger extends EventEmitter{
    log(message){
        // Raise an event
        this.emit('activete_emitter', {id: 404, url: "https://404.io", msg: message})
    }
}

exports.myFunction = (a,b) => a+b;
exports.logger = Logger;
```

## HTTP Module

```javascript
const http = require('http');

const server = http.createServer((request, response) =>{
        if(request.url === '/'){
            response.write("Hello World");
            response.end();
        }
        if(request.url === '/api/courses'){
            // Passes an array
            response.write(JSON.stringify([1,3,4,5]));
            response.end();
        }
    }
);

// Starts Listening
server.listen(3000);
console.log("Listening in port 3000");
```

## Or Simply initialize a listener

```javascript
const http = require('http')

http.createServer(function(request, response){
    response.write("Hello World");
    response.end();
}).listen(8080);
```