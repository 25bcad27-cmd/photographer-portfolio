const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "photography"
});

db.connect(err => {
    if(err) throw err;
    console.log("Database Connected");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if(err) throw err;
        res.send("Message Stored in Database");
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
