const mongoose = require('mongoose');
const serverConfig = require('./serverConfig.js');

/**
 * The below function helps us to connect to a mongodb server and log the status of the connection.
 */
async function connectDB(){
    try{
        await mongoose.connect(serverConfig.DB_URL);
        console.log('Connected to MongoDB');
        console.log('Connected to the database');
    } catch (error){
        console.error('Error connecting to the database');
        console.error(error);
    }

}

module.exports = connectDB;