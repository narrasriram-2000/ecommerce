const mongoose = require('mongoose');

const connectDB = async()=>{

    await mongoose.connect("mongodb://localhost:27017/project-8")
}

module.exports = connectDB;
