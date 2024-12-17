const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'MySqL321@', 
    // database: 'CHECKINGECOMMERCE'
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

db.query(
  `CREATE TABLE IF NOT EXISTS USERDATA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255),
    NUMBER VARCHAR(15),
    AGE INT
  )`,
  (err) => {
    if (err) throw err;
    console.log('USERDATA table ready');
  }
);

app.post('/api/add-user', (req, res) => {
  const { name, number, age } = req.body;
  const query = 'INSERT INTO USERDATA (NAME, NUMBER, AGE) VALUES (?, ?, ?)';
  db.query(query, [name, number, age], (err) => {
    if (err) throw err;
    res.status(201).json({ message: 'User added successfully' });
  });
});

app.get('/api/users', (req, res) => {
  console.log("inside the request");
  const query = 'SELECT * FROM USERDATA';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
