const express = require('express');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./auth');
const excelToJson = require('./conversion');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Set up Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to upload Excel file and get JSON response
app.post('/upload', verifyToken, upload.single('file'), (req, res) => {
    const file = req.file;
    const sheetName = req.body.sheetName;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    if (!sheetName) {
        return res.status(400).send('Sheet name not provided.');
    }

    try {
        // Convert the uploaded Excel file to JSON
        const jsonData = excelToJson(file.path, sheetName);

        // Delete the uploaded file after conversion
        fs.unlinkSync(file.path);

        // Send the JSON response
        res.json(jsonData);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send(`Error processing file: ${error.message}`);
    }
});


app.put('/login', (req, res) => {
    // For demonstration, we will use a hardcoded user id. In a real application, you would validate user credentials.
    const userId = req.body.username; // This should be the authenticated user's ID
    const password = req.body.password;
    if(userId != 'adil' || password != 'adil'){
        return res.status(400).send(`either username of password is wrong ${userId}, ${password}`);
    }
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ auth: true, token });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
