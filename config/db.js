const mongoose = require('mongoose');

const connecToDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const database = mongoose.connection;
        database.on('connected', () => {
            console.log("MongoDB connection successfull");
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = { connecToDB };