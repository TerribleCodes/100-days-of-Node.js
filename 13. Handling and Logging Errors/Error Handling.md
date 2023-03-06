# Introduction

- There are 2 types of errors.
  - Programmer Error: Mistakes in the logic which can be edited in the source code.  
    Ex: Syntax errors
  - Operational Errors: When an operation has the potential to fail; expected and accounted errors.
    Ex: Failed to connect to server, request timeout, invalid user input

## Error Object in Node.js

- It's a built in object in Node.js runtime environment which gives you the data related to an error.
- `error.stack` is a field in the Error Object that shows from where the error came from.
  Ex:

```javascript
   const error = new Error('Error message);
   console.log(error.stack);
```

# Handling `Unhandled Promise Rejections`

- By default 30 attmpts will be taken by the application in 1000ms intervals (30 seconds) before fails.
- Happens when there's no connection between the database server.
- Try-Catch blocks can be used to handle this error.

```javascript
router.use('/', (req, res) => {
    try { const genre = await Genre.find().sort('name'); res.send(genre); }
    catch(error) { res.status(500).send('Internal Server Error'); }
});
```

- Try catch block implementation becomes messy when it comes to other routes.

## Error Middleware

- This approach keeps the routing kind of routes clean.

```javascript
// Error Handling Middleware
const error_handle = (error, req, res, next) => {
  res.status(500).send(error.message);
};
module.exports = { error_handle };

// In the routes module...
app.get("/user", (req, res, next) => {
  try {
    if (!user) throw new Error("User does not exist");
  } catch {
    return next(error);
  }
});
app.use(error_handle);
```

## Avoiding multiple try-catch blocks

```javascript
async function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const genre = await Genre.find().sort("name");
    res.send(genre);
  })
);
```

## Instead of Using middlewares...

> npm install express-async-errors

- Place `require('express-async-errors')` in index.js and use the original route handlers.
- If there's any error the express-async-errors will take care of it.

## Logging Errors

- For this we use the package `winston`

```javascript
winstom.add(winston.transports.File, { filename: "logfile" });
```

- Inside the error middleware

```javascript
const err_handle = function(err, req, res, next) => {
    winston.error(error.message, error);
}
```

- At the place where the Exception is being thrown,

```javascript
router.get(
  "/",
  asyncMiddleWare(async (req, res) => {
    throw new Error("could not get the genre");
    // Other code...
  })
);
```

- A new `logfile` will be created in the parent directory.

## Logging the errors to MongoDB

- For this we use the package `winston-mongodb`

```javascript
winston.add(winston.transports.MongoDB, {
  db: "mongodb://localhost/vidly-database",
});
```

## Unhandled Exceptions

```javascript
process.on("uncaughtException", (ex) => {
  console.log("Uncaught Exception...");
  winston.error(ex.message, ex);
});
```

## Unhandled Promise Rejections

```javascript
process.on("unhandledRejection", (ex) => {
  console.log("Unhandled rejection...");
  winston.error(ex.message, ex);
});
```

- It's a good practice to keep the log file in the Filesystem instead of sending the log data to the MongoDB. Because if there's any problem in the database server, since the filesystem is always available there's no risk of log file being unavailable.

- Rather than subscribing to each exception it's better to use the following approach.

```javascript
    winston.handleExceptions(
        new winston.transports.File({filename: 'exception.log'});
    );
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
```

## Handling `uncaughtExceptions`

- Domains can be used to handle uncaught exceptions.

Example:

```javascript
var domain = require("domain");
var d = domain.create();
var fs = require("fs");

d.on("error", function (err) {
  console.error(err);
});

d.run(function () {
  fs.readFile("somefile.txt", function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});
```
