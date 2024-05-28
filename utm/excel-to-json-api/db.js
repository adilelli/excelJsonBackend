const mongoose = require('mongoose');
require('dotenv').config();

// Replace the following with your MongoDB connection string.
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Define a schema for storing Excel data
const excelSchema = new mongoose.Schema({
    data: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
});

const ExcelData = mongoose.model('ExcelData', excelSchema);

// Function to save JSON data to MongoDB
async function saveJsonData(jsonData) {
    const excelData = new ExcelData({ data: jsonData });
    await excelData.save();
    return excelData;
}

// Function to retrieve JSON data from MongoDB
async function getJsonData(id) {
    return await ExcelData.findById(id);
}

module.exports = {
    saveJsonData,
    getJsonData
};
