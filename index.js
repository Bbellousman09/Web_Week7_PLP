// Import packages  
const express = require('express');  
const session = require('express-session');  
const MySQLStore = require('connect-mysql2')(session);  
const path = require('path');  
require('dotenv').config();  

const db = require('./config/db');  
const authRoutes = require('./routes/auth');  

// Initialize server  
const app = express();  

// Setup middleware (something sitting between two interfaces)  
app.use(express.json());  

// Setup session  
app.use(  
    session({  
        key: 'user_sid',  
        secret: process.env.SESSION_SECRET,  
        resave: false,  
        saveUninitialized: false,  
        // store: new MySQLStore({}, db)  
    })  
);  

// Routes  
app.get('/', (req, res) => {  
    const filePath = path.join(__dirname, '/index.html'); // Replace with the actual file path  
    res.sendFile(filePath, (err) => {  
        if (err) {  
            console.error("Error sending file:", err);  
            res.status(err.status).end();  
        }  
    });  
});  

app.use('/auth', authRoutes);  

// Start server  
const port = process.env.PORT;  

app.listen(port, () => {  
    console.log(`Server is running on http://localhost:${port}`);  
});