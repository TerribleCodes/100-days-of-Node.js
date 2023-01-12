# Back-End

* `MongoParseError: options poolsize, usenewurlparse are not supported` --> Simply remove the `poolsize` and `usenewurlparse`
* [MongoClient())](https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html)
* Add a wildcard if someone tries to access a route which is not defined.
```javascript
    app.use('*', (req, res) => res.status(404).json({error: "Page does not exist."}));
```
* Small Recap--->Static Method: The static method inside the class can be called without creating an object from the class; Which means the static method can be called using the `Classname.Static_Method_Name();`.