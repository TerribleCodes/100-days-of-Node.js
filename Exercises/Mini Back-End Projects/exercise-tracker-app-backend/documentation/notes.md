# Back-End

* Technologies Used
    * MongoDB Atlas
    * NodeJS v16.13.2
    * express@4.18.2
    * cors@2.8.5
    * dotenv@16.0.3

* Grab the Connection String from the MongoDB Atlas after choosing the `Connect to Cluster using the Application`.
* Set up a `.env` file. Store the connection string in a variable; Also, replace the <password> field with the cluster connection password - Not the MongoDB account password. (Ex: ATLAS_CONNECTION_URL). To fetch the variable,
    ```javascript
        require('dotenv').config();
        const connection_url = process.env.ATLAS_CONNECTION_URL;
    ```
* It's possible to get `MongoParseError` error if <password> field in the connection string contain special characters.  
    * [Stack-Overflow](https://stackoverflow.com/questions/69290528/mongodbsrv-uri-cannot-have-port-number)
    * [Read More](https://www.rfc-editor.org/rfc/rfc3986#section-2.1)
* [The useCreateIndex option has been deprecated for a while and removed as of the Mongoose 6 release per No More Deprecation Warning Options 796.](https://www.mongodb.com/community/forums/t/option-usecreateindex-is-not-supported/123048) 
* [When updating a Document if `Cast to ObjectId failed for value` error occurs.](https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id)


# Front-End

