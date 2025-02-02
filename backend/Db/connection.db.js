const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://Prashant:Prashant@cluster0.cubgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("HURRAY DB is Connected");
    } catch (error) {
        console.log("error", error);
    }
};

module.exports = connectDB;
