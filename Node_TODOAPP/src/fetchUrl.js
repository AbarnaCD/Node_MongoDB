const connection = require('./Connection')
var express = require('express');
var app = express();
const { MongoClient } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
// Connecting to Database------------------------------------------------->
const url = "mongodb://localhost:27017";

//Insert data into database------------------------------------------------->
app.get('/Insert', function (req, res) {
   res.send('The id you specified is ' + req.query.value);
   //var id=req.query.value;
   //res.send('The object id stored in database is ' + id);
   MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todo")
      var obj = { Word: req.query.value }
      dbo.collection("Sample").insertOne(obj, function (err, res) {
         if (err) throw err;
         console.log("Inserted");
         var id = res.insertedId.toHexString();
         console.log(id);
         db.close();
      })

   });
});


// To delete data in MongoDB

app.get('/delete', function (req, res) {
   var id = req.query.id
   console.log(id);
   MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todo");
      dbo.collection("Sample").deleteOne({ _id: ObjectId(id) }, function (err, obj) {
         if (err) throw err;
         console.log("1 document deleted");
         db.close();
      });
   });
});
//Update data into Database-------------------------------------------------->
app.get('/update', function (req, res) {
   var val = req.query.value;
   var id = req.query.id
   MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todo");
      var myquery = { _id: ObjectId(id) };
      var newvalues = { $set: { Word: `${val}` } };
      dbo.collection("Sample").updateOne(myquery, newvalues, function (err, res) {
         if (err) throw err;
         console.log("1 document updated");
         db.close();
      });
   });
});

app.listen(3000);
