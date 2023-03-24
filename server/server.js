const express = require('express');
const connectDataBase = require('./config/db');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const app = express();
dotenv.config();

app.use('/user')
const PORT = process.env.PORT || 5000;

connectDataBase();
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`server is listning to  http//localhost:${PORT}`)
})