const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke database MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Ganti dengan user database kamu
    password: "", // Ganti dengan password database kamu
    database: "keuangan",
    timezone: "local"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected");
    }
});

// Endpoint untuk menyimpan transaksi
app.post("/add-transaction", (req, res) => {
    const { date, description, category, amount } = req.body;
    const query = "INSERT INTO transactions (date, description, category, amount) VALUES (?, ?, ?, ?)";
    db.query(query, [date, description, category, amount], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Transaksi berhasil disimpan", id: result.insertId });
    });
});

// Endpoint untuk mengambil semua transaksi
app.get("/transactions", (req, res) => {
    db.query("SELECT * FROM transactions", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
