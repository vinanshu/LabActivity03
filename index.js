const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [];  // Simulating a user database

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  console.log('Received registration request:', req.body);

  // Check for required fields
  const validations = [
    { condition: !name || typeof name !== 'string' || name.trim() === '', message: 'Name is required' },
    { condition: !email || typeof email !== 'string' || email.trim() === '', message: 'Email is required' },
    { condition: !password || typeof password !== 'string' || password.trim() === '', message: 'Password is required' },
    { condition: email && !/\S+@\S+\.\S+/.test(email), message: 'Invalid email format' },
    { condition: password && password.length < 6, message: 'Password must be at least 6 characters long' },
  ];

  for (const validation of validations) {
    if (validation.condition) {
      console.log('Validation Error:', validation.message);
      return res.status(400).json({ error: validation.message });
    }
  }

  // Check for unique email
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    console.log('Error: Email already exists');
    return res.status(409).json({ error: 'Email already exists' });
  }

  // Save the user if all validations pass
  users.push({ 
    name: name.trim(), 
    email: email.trim(), 
    password 
  }); // Trimming whitespace

  console.log('User registered successfully:', { name: name.trim(), email: email.trim() });
  res.status(201).json({ message: 'User registered successfully' });
});

// Example to get all users
app.get('/users', (req, res) => {
  console.log('GET /users request received');
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
