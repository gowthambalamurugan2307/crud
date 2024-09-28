const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;
 let database;
 async function getDatabases(){
   //  console.log("Hi iam fun...");
       const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
       database = client.db('database');
       if(!database){
        console.log("Database not connected...")
       }
       return database;
 }
 module.exports = {
    getDatabases , 
    ObjectID
 }