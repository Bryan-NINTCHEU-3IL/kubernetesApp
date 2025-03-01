require('dotenv').config(); 
const express = require('express'); 
const mysql = require('mysql2'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
 
const app = express(); 
app.use(bodyParser.json()); 
app.use(cors()); 
 
// Connexion à MySQL 
const db = mysql.createConnection({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME 
}); 
 
db.connect(err => { 
    if (err) throw err; 
    console.log("MySQL Connected..."); 
}); 
 
// Route d'inscription 
app.post('/register', (req, res) => { 
    const { name, email } = req.body; 
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)"; 
    db.query(sql, [name, email], (err, result) => { 
        if (err) return res.status(500).send(err); 
        res.status(201).send({ id: result.insertId, name, email }); 
    }); 
}); 
 
// Lancement du serveur 
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));