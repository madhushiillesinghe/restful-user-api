const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ijse@1234', // replace with your MySQL password
    database: 'user_database'
  });
  
  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to MySQL database.');
  });
// Sample data
let users = [];

// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.status(201).send({ id: result.insertId, name, email });
    });
  });
  

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.send(results);
    });
  });
  
// Get a user by ID
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      if (results.length > 0) {
        res.send(results[0]);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    });
  });
  

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      if (result.affectedRows > 0) {
        res.send({ id, name, email });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    });
  });
  

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      if (result.affectedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    });
  });
  
