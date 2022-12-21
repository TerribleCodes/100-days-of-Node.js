# Introduction

- Authentication: Whether the allowed user is legitimate.
- Authorization: Whether the user has the right privileges.
- `Register` and `Login` are usually a post requests.
- In the registration section most of the time Username, Password, Email will be collected from the user.

```javascript
    // Post Method
    user = new User({ name: req.body.name, email: req.body.email, password: req.body.password});
    await user.save();
    res.send(user)
```

> Lodash can be used to simplify the above process.

```javascript
    const _ = require('lodash');
    // Code
    user = new User(_.pick('req.body', ['name', 'email', 'password']));
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
```
## Hashing Passwords

- Use  `bcrypt`.
```javascript
const bcrypt = reuire('bcrypt');
// Code
const salt = await bcrypt.genSalt(10); // genSalt is an async method 
const user.password = await bcrypt.hash(user.password, salr);
```

## Authenticating Users

- For this we use the library `bcrypt`.
```javascript 
// code
const user = await User.findOne({email: req.body.email});
if (!user) //400 error

const validPsswd = await bcrypt.compare(req.body.password, user.password);
if (!valid) //400 error
```

## JSON Web Tokens

- In the `Encoded` section it contains 3 sectors seperated with a `.` and in the `Decoded` section they are 'header', 'payload' and the 'verify signature'.
- Token must be sent to the user as a `token`.

```javascript
const jwt = require('jsonwebtoken');

// Code

const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

res.send(token); // This token can be decoded and obtain the _id
```

#### Storing the `Private Key` in an environment variable.

- Use the npm package `config`
- Create a `config` folder and 2 json files called `default.json` and `custom-environment-variables.json`
- Inside the default.json
    ```javascript
        {
            "jwtPrivateKey":""
        }
    ```
- Inside the `custom-environment-variables.json`
    ```javascript
        {
            "jwtPrivateKey":"vidly_jwtPrivateKey"
        }
    ```
- To confirm that the environment variable `vidly_jwtPrivateKey` has been already set inside the `index.js` place the following code
    ```javascript
        if (!config.get('jwtPrivateKey')){
            // Console log an error and exit (fatal error maybe?)
        }
    ```
- Set the environmental variable using `set vidly_jwtPrivateKey=myPrivateKey`

## Setting Response Headers

```javascript
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
```