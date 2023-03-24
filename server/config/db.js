const mongoose = require("mongoose")

const connectDataBase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log('CONNECTED TO ATLAS SUCCESSFULLY')
    } catch (error) {
        console.log(`Error while connecting ATLAS: ${error.message}`)
    }
}

module.exports = connectDataBase;