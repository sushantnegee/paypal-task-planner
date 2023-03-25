const express = require('express');
const connectDataBase = require('./config/db');
const dotenv = require('dotenv')
const app = express();
const userRoutes = require('./routes/userRoutes')
const sprintRoutes = require('./routes/sprintRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(cors())

app.use('/user',userRoutes);
app.use('/sprints',sprintRoutes);
app.use('/tasks',taskRoutes);
const PORT = process.env.PORT || 5000;

connectDataBase();
app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`server is listning to  http//localhost:${PORT}`)
})