const mongoose = require('mongoose');

const connectDB = async (DB_URL) => {
    try {
        mongoose.connect(DB_URL || "mongodb://localhost:27017/Sarasvati-school")
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

module.exports = connectDB;