- - - - - - - - - -
### Basically there are 2 types of NodeJS module systems

1. Commons JS
2. ESM

Refer [this Image](./commonjs-vs-esm.png)

- - - - - - - - - -

- Every file in node is considered as a module.

- Before Node execute a function it, wraps the module code into a `module wrapper function` which is an anonymous function.

- After wrapping the code, (which happens before execution) wrapper function looke like this...

```javascript
    (function(exports, require, module, __filename, __dirname){
        // Module code
    });
```

- - - - - - - - - -

* Node.js supports common.js by default.
* ES module (ECMA Script) was introduced in Node.js v8.5.0 and starting from Node.js v13.2.0 it became stable with ES modules.

* CommonJS --> `module.exports` and `require`

* To export something with a specified name in CommonJS,
	```javascript
		module.exports.custom_name = module_name;

		// To Access
		const module_name = require('./module')
		module_name.custom_name();
	```

* Authors can enable ES module system with the extension .mjs rather than using .js

* `export default` is used in ES6 to export a single module, funtion or a variable in the module.

* ES can be enabled in project by placing `"type": "module"` in package.json

* By default .cjs will be treated as ES modules and if the `"type": "module"` flag isn't set in package.json, the .js extension enebled modules will be considered as a CommonJS module.

* ES --> `export` and `import {} from ''`

* CommonJS usage is flexible sometimes.
ex:
```javascript
	if (true){
		const apple = require('./myModule');
    }
```
* CommonJS are synchronous and ES are asynchronous.





- - - - - - - - - -

# Importing a module

*  Global methods
    * `log()`
    * `setTimeout()`
    * `clearTimeout()`
    * `setInterval()`
    * `clearInterval()`

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
var url = 'http://mylogger.io/log';
var name = "Nothing Here";

function log(message){
    console.log(message,url)
}
exports.functionName = log; // Exports the module content
exports.attributeName = name; // Exports the module content

/*module.exports = {url, name, log};*/ // Exporting can be done in this way as well
console.log(module) // Can view the module contents. Ex: `log` Export.
```

```javascript
const logger = require('./logger.js') // Import the required module content (locally available)

logger.log("This URL"); // console.log(logger.url)
```

* To export multiple module contents  

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
const Logger = require('./logger'); // Import the Logger Class

const logger = new Logger(); // Create an object

logger.on('activete_emitter', (arg) => { // Register Emmiter
    console.log('Listner Called', arg)
});

logger.log('Hello World')
```

```javascript
const EventEmitter = require('events'); // Module Class

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

server.listen(3000); // Starts Listening
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