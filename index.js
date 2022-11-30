const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT | 5000;

app.get('/', (req,res)=>{
    res.send('Welcome To Old Friends Server')
})

app.use(express.json());
app.use(cors())


const uri = "mongodb+srv://oldFriends:9iBA3rHgC0ISOhMF@cluster0.o5lz3b5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        // Database
        const userCollection = client.db('oldFriends').collection('users');

        // User Insert
        app.post('/users', async(req,res)=>{
            const body = req.body;
            const doc = body;
            const result = await userCollection.insertOne(doc);
            res.send(result);
        })

        // find A User
        app.get('/users', async(req,res)=>{
            const email = req.query.email;
            const query = {email: email};
            const result = await userCollection.findOne(query);
            res.send(result);
        })

    }
    catch{

    }
}
run();


app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})