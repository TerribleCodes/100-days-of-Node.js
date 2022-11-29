# Introduction to the Middleware functions

- Ex: `app.use(express.json())` `app.get('/', (req, res) => res.send("Value"))` - route handling middleware function
- Works with the request/response cycle.
- *Request Processing Pipeline*: Process of handling request to the respones. Contains one or more middleware functions. 
- Ex: Request -> json() -> route() -> Response

### Custom middleware functions

- They will be called sequentialy.
- Ex: Refer to the [Vidly Crud](../VIDLY%20CRUD/index.js).

```javascript
app.use(function(req, res, next){
    console.log("Logging...");
    next();
});
```

- In terms of clean coding, these middleware must be stored in seperate files.

## Third party middleware

- Ex: `app.use(helmet());` `app.use(morgan('tiny'));`

## Built in middleware

 - `json()` --> Populates req.body with JSON (`app.use(express.json())`)
 - `app.use(express.urlencoded());` Reads the encoded URL
 > Here use the unicoded format post in postman and send the key-value pair. This pair will be decoded. 
 

 ## Environment (dev or prod)

- To set an env variable in command line,
`set variable_name=value`
> Depending on the environment that you are working on, features can be enabled/ disabled as follows.

```javascript
console.log(`Dev Environment: ${process.env.NODE_ENV}`);
console.log(`App environment: ${app.get('env')}`);
```

```javascript
if(app.get('env')=='development'){
    app.use(morgan('tiny'));
    console.log("Morgan Enabled");
}

if(app.get('env')=='production'){
    console.log("Production Environment");
}
```

## Debugging

- `debugger` can be used instead of using `console.log` everywhere.

```javascript
const startupDebugger = require('debug')('app:startuo');
const dbDebugger = require('debug')('app:db');

// set DEBUG environment variable as app:startup
// or DEBUG=app:*
// Run the applicaiton 
if(app.get('env')=='development'){
    app.use(morgan('tiny'));
    // console.log("Morgan Enabled...");
    startupDebugger("Morgan Enabled...");
}
// Database Debug
dbDebugger("Connected to database");
```

## Configurations

- Depending on the env (dev, prod) you can use different config files. (config>JSON files)
- Those can be accessed as follows.

```javascript
const config = require('config');

console.log(`Application name: ${config.get('name')}`);
console.log(`Application name: ${config.get('mail.host')}`);
```