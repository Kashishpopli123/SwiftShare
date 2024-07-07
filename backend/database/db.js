const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const DBConnection = async () => {
    const USERNAME = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWORD;
      
    // console.log('MONGO_URI:', MONGO_URI);
    const MONGO_URI = process.env.MONGODB_URL;
      
    console.log('MONGO_URI:', MONGO_URI);
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}
module.exports = DBConnection;
