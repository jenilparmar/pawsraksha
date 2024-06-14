const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3001;
const url = "mongodb+srv://jenilparmar:dsfkjnksdfaa@cluster0.utm2zr0.mongodb.net/";
const dbName = "AnimalRescue";
let db;



MongoClient.connect(url).then((client) => {
  db = client.db(dbName);
  console.log("Connected successfully to MongoDB server");
}).catch(e=>{
    console.log(e);
})
  // Middleware
  app.use(express.json());
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
      ],
      methods: ["POST", "GET"],
      credentials: true,
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route to handle form submissions
app.get("/", (req, res) => {
    res.send('<h1>Hi</h1>')
    });

    app.post("/submitRescueForm", (req, res) => {
      const formData = req.body;
      db.collection("AnimalInNeed")
        .insertOne(formData)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send(error);
        });
    });
    app.post("/AddLoginData",( req,res)=>{
        const formData  = req.body
        db.collection("UserData")
        .insertOne(formData)
        .then(data=>res.send(data))
        .catch(e=>res.send(e))
    })
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

