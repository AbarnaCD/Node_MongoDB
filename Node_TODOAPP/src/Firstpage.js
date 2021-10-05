const express = require("express");
const app = express();
//app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log("Server Up and running"));

const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
   // await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } 
  catch(error)
  {
      console.log("error");
  }
}
run().catch(console.dir);

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("TodoDatabase");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});


