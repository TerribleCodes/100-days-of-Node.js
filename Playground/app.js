// var logger = require('./logger')

// console.log(logger)
// logger.log("hi")

// const path = require('path')
// var pathObj = path.parse(__filename)
// console.log(pathObj)

// const os = require('os')
// let memory = os.totalmem()
// let free_memory = os.freemem()
// console.log(`Memory in use: ${memory} --- Free memory: ${free_memory}`)

const EventEmmiter = require('events');
const emitter = new EventEmmiter()

emmiter.emit('messageLogged');
