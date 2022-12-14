const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT | 5000;


app.use(express.json());
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o5lz3b5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req,res)=>{
    res.send('Welcome To Old Friends Server')
})

async function run(){
    try{
        // Database
        const usersCollection = client.db('oldFriends').collection('users');
        const productsCollection = client.db('oldFriends').collection('products');
        const bookedCollection = client.db('oldFriends').collection('bookedProducts');

        // User Insert
        app.post('/users', async(req,res)=>{
            const body = req.body;
            const doc = body;
            const result = await usersCollection.insertOne(doc);
            res.send(result);
        })

        // find A User
        app.get('/users', async(req,res)=>{
            const email = req.query.email;
            const query = {email: email};
            const result = await usersCollection.findOne(query);
            res.send(result);
        })

        // find all sellers
        app.get('/sellers', async(req,res)=>{
            const query = {role : 'seller'};
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        // Delete Seller
        app.delete('/sellers/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Delete Buyer
        app.delete('/buyers/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await usersCollection.deleteOne(query);
            res.send(result);
        })

        // Update Seller Role
        app.put('/sellers/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    status: "Verified"
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

        // find all buyers
        app.get('/buyers', async(req,res)=>{
            const query = {role : 'buyer'};
            const result = await usersCollection.find(query).toArray();
            res.send(result);
        })

        // Add a Product.
        app.post('/products', async(req,res)=>{
            const body = req.body;
            const doc = body;
            const result = await productsCollection.insertOne(doc);
            // console.log(result)
            res.send(result);
        })

        // Get Products
        app.get('/products/:name', async(req,res)=>{
            const category = req.params.name;
            const query = {category: category};
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })


        // Get Products By email
        app.get('/products', async(req,res)=>{
            const email = req.query.email;
            const query = {sellerEmail:email};
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

        // Products Delte
        app.delete('/products/:id', async(req,res)=>{
            const id = req.params.id;
            // console.log(id)
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        // Update Product Sale Status for Advertising
        app.put('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    saleStatus: "advertising"
                }
            }
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


         // Get Advertised Products
         app.get('/advertisedProducts', async(req,res)=>{
            const query = {saleStatus:"advertising"};
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })


        // Insert Booked Product
        app.post('/bookedProducts', async(req,res)=>{
            const body = req.body;
            const doc = body;
            const result = await bookedCollection.insertOne(doc);
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