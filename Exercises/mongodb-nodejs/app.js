import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;
const client = new mongodb.MongoClient(uri);
const dbname = "library";
const collection = "books";

const libraryCollection = client.db(dbname).collection(collection);

const connection = async () => {
    try{
        await client.connect();
        console.log(`Successfully connected to the database...`);
    }catch(err){
        console.error(`Error occured: ${err}`)
    }
}

const bookdata = [{
    name: "Charlie and the Chocolate Factory",
    author: "Rold Dahl", 
    last_updated: new Date()
}]

const main = async () => {
    try{
        await connection();
        let result = await libraryCollection.insertOne(bookdata);
        // to use the insertMany, send the required documents as an array of BSON documents
        console.log(`Inserted to ${result.insertedId}`)
    }catch(err){
        console.log(`Error occured : ${err}`);
    }finally{
        await client.close();
    }
}

main();