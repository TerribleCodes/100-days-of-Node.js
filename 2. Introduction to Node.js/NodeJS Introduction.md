# Introduction

- ## Node.js is a Runtime Environment. Not a Programming language or a Framework like ASP.NET or Rails.
- ## Used to create APIs (Application Programming Interfaces)
- ## Can be used in Prototyping or Agile development approaches.
- ## Highly scalable; Can be used to build IO intensive and realtime applications (Not CPU intensive applications)
- ## By dafault `Asynchronous`.
    > ### i.e Multiple client requests will be handled by a single thread.  
    > ### Synchronous means one request will be blocked while the thread is serving the other request.

# Imporing a module

```javascript
// Module
var url = 'http://mylogger.io/log'

function log(message){
    console.log(message)
}

module.exports.log = log;
```

```javascript
// import the required module content
const logger = require('./logger')

console.log(logger)
logger.log("hi")
```
> use `>jshint file.js` to figure out the errors associated with the modules.

### Example: OS Module

```javascript
const os = require('os')
let memory = os.totalmem()
let free_memory = os.freemem()
console.log(`Memory in use: ${memory} --- Free memory: ${free_memory}`)
```
