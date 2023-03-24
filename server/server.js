const express = require('express');
const connectDataBase = require('./config/db');
const dotenv = require('dotenv')

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDataBase();
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`server is listning to  http//localhost:${PORT}`)
})