// Import the Express library
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).json({ error: 'Something went wrong!' }); 
});

//array to store user data
const users = [];

// Route to handle GET requests
app.get('/users', (req, res) => {
    console.log('GET /users endpoint was accessed'); 
    res.status(200).json(users);
});


// Route to handle POST requests
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    users.push({ name, email, password });
    console.log(`POST /users endpoint was accessed ${JSON.stringify(users)}`);
    res.status(201).json({ message: 'User registered successfully' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    