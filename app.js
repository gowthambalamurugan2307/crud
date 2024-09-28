const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
const dbo = require("./db");
// const summa = require("./summa")
const path = require("path");
const url = require("url");
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId;//this

// console.log(dbo.getDatabases())
// summa.fun();
let message = "Hi iam Gowtham";
let delete_id;
let edit_id;
let edit_data;
app.engine('hbs', exhbs.engine({ 
    layoutsDir: 'views/', 
    defaultLayout: 'main', 
    extname: 'hbs' 
  }));

  app.set('view engine', 'hbs');``
  app.set('views', 'views');
  app.use(bodyparser.urlencoded({ extended: true }));//this

  p = path.join(__dirname ,"views","form.html")
  ecom = path.join(__dirname,"views","ec.html")

  console.log(p)
  app.get('/form' , async(req,res)=>{
     fs.readFile(p ,(err , data)=>{
         if(err) throw err
         res.statusCode = 200;
         res.setHeader('Content-Type',"text/html");
         res.end(data)
     });
        
  });

  app.get('/index',async (req,res) =>
    {
    fs.readFile(ecom,(err,data)=>{
        if(err) throw err
        res.writeHead(200,{'Content-Type':'text/html'})
        // res.statusCode = 200;
        //  res.setHeader('Content-Type',"text/html");
        res.end(data)

    })
  })

  app.get('/', async(req,res)=>{
        edit_id = req.query.edit_id
        let database = await dbo.getDatabases();
        let collection = database.collection('coll');
        const cursor = collection.find({});
        let books  = await cursor.toArray(); 
        if(req.query.edit_id){
            edit_data = await collection.findOne({ "_id": new ObjectId(req.query.edit_id) });
           }
        
        res.render('main',{books ,edit_id, edit_data});
});
app.get('/delete' , async(req,res)=>{
       delete_id = req.query.delete_id;
       console.log(delete_id);
      //  let d = `_id:${ObjectID}(${delete_id})`;
       let database = await dbo.getDatabases();
       let collection = database.collection('coll');
       await collection.deleteOne({ "_id": new ObjectId(delete_id) });//this
       //{_id: ObjectId('66863cd88db111ccbdff42ad')}
       return res.redirect('/');
});

app.post('/store_book',async(req , res)=>{
        
        let database = await dbo.getDatabases();
        let collection = database.collection('coll');
        let book = {name: req.body.name ,balance: req.body.balance};
        await collection.insertOne(book);
        console.log("data inserted successfully...");
        res.redirect('/');

});
app.post('/update/:edit_id',async(req , res)=>{ //change
    console.log("HI iam entered...")    
    let database = await dbo.getDatabases();
    let collection = database.collection('coll');
    let book = {name: req.body.name ,balance: req.body.balance};
    let edit_id = req.params.edit_id;
    await collection.updateOne({ "_id": new ObjectId(edit_id) } , {$set:book});
    console.log("Data Entered Successfully....")
    res.redirect('/');


});





app.listen(8000,()=>{console.log("Server running at 8000 port ")});