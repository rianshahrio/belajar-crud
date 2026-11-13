const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Halo dari server!");
});

app.get("/api/hello", (req, res) => {
    res.json({ pesan: "Halo dari API", waktu: new Date() });
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});