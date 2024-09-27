// POST endpoint

curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john.doe@example.com", "password": "123456"}'

// GET endpoint 

curl http://localhost:3000/users
