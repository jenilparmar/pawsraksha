const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 3001;

const dbName = "AnimalRescue";
let db;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename for each uploaded image
  },
});
const url  = process.env.url;
const upload = multer({ storage: storage });

MongoClient.connect(url).then((client) => {
  db = client.db(dbName);
  console.log("Connected successfully to MongoDB server");
}).catch(e=>{
console.log(e);
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",'https://pawsraksha.vercel.app',"192.168.130.141:3000" // Allow requests from React app running on localhost:3000
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route to verify server is running
app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.get("/OrgLocation/:name",(req,res)=>{
  const name = req.params.name
  db.collection("UserData")
  .findOne({name:name})
  .then(data=>{
    res.send(data["Location"])
  })
  .catch(e=>{
    res.send(e)
  })
})
// Route to handle form submission with multiple images
app.post("/submitRescueForm", upload.array("images", 5), (req, res) => {
  const formData = req.body;
  const images = req.files.map((file) => ({
    filename: file.filename,
    path: file.path,
  }));

  formData.images = images;

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

app.get("/GetLocationOfOrganization", (req, res) => {
  db.collection("UserData")
    .find({})
    .toArray()
    .then(data => {
      let locationArray = [];
      data.forEach(element => {
        if (element['Location']) {
          locationArray.push(element['Location']);
        }
      });
      res.send(locationArray);
    })
    .catch(e => {
      res.send(e);
    });
});



app.post("/PaymentInfo",(req,res)=>{
  const formData = req.body;
  db.collection("Donations")
  .insertOne(formData)
  .then(data=>{
    res.send(data)
  })
  .catch(e=>{
    res.send(e)
  })
})
app.get("/GetDonators",(req,res)=>{
  db.collection("Donations")
  .find({})
  .toArray()
  .then(data=>{
    res.send(data)
  })
  .catch(e=>{
    res.send(e);
  })
})
app.get("/env",(req,res)=>{
  res.send(process.env.UPIID);
})
app.get("/ShowData",(req,res)=>{

  db.collection("AnimalInNeed")
  .find({}).toArray()
  .then((data)=>{
    res.send(data);
  })
  .catch(e=>{
    res.send(e);
  })

})
app.post("/AddLoginData",(req,res)=>{
  const formData = req.body;
  db.collection("UserData")
  .insertOne(formData)
  .then(data=>{
    res.send(data)
  })
  .catch(e=>{
    res.send(e)
  })
})
app.get("/GetOrganizations",(req,res)=>{
  db.collection("UserData")
  .find({})
  .toArray()
  .then(data=>{
    res.send(data);
  })
  .catch(e=>{
    res.send(e);
  })
})
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
