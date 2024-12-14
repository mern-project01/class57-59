
const express = require("express");
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = 4000;

// const users = [
//   {
//     id: 1,
//     name: "Sahadat",
//     email: "sahadat@gmail..com",
//     age: 21,
//     qualification: "hsc",
//   },
//   {
//     id: 2,
//     name: "Shohel",
//     email: "shohel@gmail.com",
//     age: 22,
//     qualification: "full stack devoloper",
//   },
//   {
//     id: 3,
//     name: "jubayer",
//     email: "juba@gmail.com",
//     age: 6,
//     qualification: "none",
//   },
//   {
//     id: 4,
//     name: "alamine",
//     email: "alamin@gmail.com",
//     age: 14,
//     qualification: "jsc",
//   },
// ];

app.use(cors());

app.use(express.json());



// app.get("/users", (req, res) => {
//     res.send(users);
// });
// app.get("/users/:id", (req, res) => {
//     const searchId = parseInt(req.params.id);
//     const foundUsers = users.find(user => user.id === searchId) || {};
//     res.send(foundUsers);
// });

//post methods
// app.post('/users', (req, res) => {
//     //console.log('hited')
//     //console.log(req.body)
//     const user = req.body;
//     user.id = users.length + 1;
//     const result = users.push(user);
//     res.send(result);
// })

//end post

//start mongodb

const uri =
  "mongodb+srv://dbconection:fsxErH5fPyPClZUF@cluster0.lxwdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
      const database = client.db('simplenode');
      const userCollection = database.collection('users');
      //   const user = {
    //       id: 11,
    //       name: "Sahadat hossen",
    //       email: "sahadathossen@gmail..com",
    //       age: 21,
    //       qualification: "hsc",
    //   };
    //   const result = await userCollection.insertOne(user);
    //   console.log(result);
      //   res.send(result);
      
      //get mathod
      app.get('/users', async (req, res) => {
          const cusors = userCollection.find({});
          const users = await cusors.toArray();
          //console.log(users);
          res.send(users);Al - amin;
      })
      //for post method
      app.post('/users', async (req, res) => {
          const user = req.body;
          const result = await userCollection.insertOne(user);
          res.send(result);
          
      })
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);



//end mongodb


app.get("/", (req, res) => {
  res.send("Data base colections");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});