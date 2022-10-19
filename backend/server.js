// import is in module
const express = require("express")
const dotenv = require('dotenv').config();
const connectDb = require('./config/db')
const app = express()
const PORT = process.env.PORT || 5000;

connectDb()

app.use(express.json())

// app.get('/',(req,res)=>{
//     res.status(200).send({message: "Works like a charm"})
// })

let productRoutes = require('./routes/productRoutes')
app.use('/api/products', productRoutes)

let categoryRoutes = require('./routes/categoryRoutes')
app.use('/api/categories', categoryRoutes)

let batchRoutes = require('./routes/batchRoutes')
app.use('/api/batch', batchRoutes)

let inputRoutes = require('./routes/inputRoutes')
app.use('/api/inputs', inputRoutes)

let outputRoutes = require('./routes/outputRoutes')
app.use('/api/outputs', outputRoutes)

app.listen((PORT), () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});