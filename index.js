const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const port = process.env.PORT || 5000;


// middleWare
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.zyvach0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const cardCollection = client.db("ScicCoffee").collection("coffee");

    app.get("/coffee", async(req, res) => {
        const result = await cardCollection.find().toArray()
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Coffee Shop Scic")
})

app.listen(port, () => {
    console.log(`Coffee shop is setting port ${port}`)
})