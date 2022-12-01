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
 
 ## Environment (development or production)

- To set an env variable in command line,
`set variable_name=value`
> Depending on the environment that you are working on, features can be enabled/ disabled as follows.

- Returns the Environment variable of the current workstation.
- If no environment is enabled, by default it will return `development`. You can choose any approach (app.get('env') - Personal Preference)
```javascript
console.log(`Your env variable is (from process module): ${process.env.NODE_ENV}`) // Method 1
console.log(`Your env variable is (from express module): ${app.get('env')}`) // Method 2

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log("Morgan Enabled...");
}
```

- Set the environment variables by `set NODE_ENV=production`

## Configurations

- Depending on the env (development, production, default) you can use different config files.
- Create a `config` directory to store the `configuration.json` files.
- `default.json`: Defines the default settings for the project.
- `development.json`: Overrides the default settings. These settings will be used in the development environment.
- `productoin.json` : Overridest the default settings. These settings will be used in the production environment.

__Depending on the development environment, configuration details we get below may vary__
```javascript
const config = require('config');
console.log(`Application name: ${config.get('name')}`);
console.log(`Application name: ${config.get('mail.host')}`);
```

- Store the Passwords in environment.
- Store the password in an Environment Variable `set app_password=1234`
> Try in local terminal with admin privileges to deal with the environment variables rather than using the vscode builtin terminal.
- In `custom-environment-variable.json` we map the passwords.
- Will read from environment variables not config files.
```javascript
console.log(`Mail Password: ${config.get('mail.password')}`)
```

## Debugging

- `debug package` can be used instead of using `console.log` everywhere.

```javascript
const stDB = require('debug')('app:startup'); // Startup related 
const dbDB = require('debug')('app:db'); // Databese releted
```

> set DEBUG environment variable as app:startup

```javascript
if (app.get('env') === 'production'){
    app.use(morgan('tiny'));
    stDB('Morgan Enabled...');
}
// set DEBUG=app:db
dbDB('Database Enabled');
```
> All the debugging for the app namespace --> `set DEBUG=app:*` then `nodemon`.

#### Rather than writing console.log everytime,  
`const cl = require('debug')('app:startup')`  
`cl("Hello)`

> From the console _DEBUG=app:startup nodemon index.js_

## Templating Engines

- Using `pug` to generate a dynamic HTML.
- Refer [index.pug](../VIDLY%20CRUD/views/index.pug) and [home view](../VIDLY%20CRUD/middleware/home.js).


## Maintainable Routes

- Move all the routing codes to a different file. (Ex: `/movies/genere/` to `genere.js`)
- Import `const routes = express.Routes()` then instead of `app.get/post/delete/put` use `routes.get/post/delete/put`. Then `module.exports = routes`.


