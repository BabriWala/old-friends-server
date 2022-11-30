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




app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})