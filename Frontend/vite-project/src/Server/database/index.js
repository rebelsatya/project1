
import sqlite3 from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
// const port = 3010;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// SQLite Database Connection
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Users Table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

// API: Register User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(query, [username, password], (err) => {
    if (err) {
      res.status(400).send({ message: 'Error registering user', error: err.message });
    } else {
      res.status(200).send({ message: 'User registered successfully' });
    }
  });
});

// API: Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, row) => {
    if (err) {
      res.status(500).send({ message: 'Database error', error: err.message });
    } else if (row) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

// Start Server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

app.get("/",(req,res)=>{
  res.json("hello")
})

export default app;