const express = require("express");
const app = express();
const PORT = 3000;

// Lets the server read JSON sent from the browser
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Data lives in memory for now (it resets when the server restarts)
let mahasiswa = [];
let nextId = 1;

// READ: get all students
app.get("/api/mahasiswa", (req, res) => {
    res.json(mahasiswa);
});

// CREATE: add a student
app.post("/api/mahasiswa", (req, res) => {
    const { nama, jurusan, umur, alamat, ijazah } = req.body;

    if (!nama || !jurusan || !umur || !alamat || !ijazah) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const baru = { id: nextId++, nama, jurusan, umur, alamat, ijazah };
    mahasiswa.push(baru);
    res.status(201).json(baru);
});

// UPDATE: change a student
app.put("/api/mahasiswa/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    const { nama, jurusan, umur, alamat, ijazah } = req.body;

    if (!nama || !jurusan || !umur || !alamat || !ijazah) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    mahasiswa[index] = { id, nama, jurusan, umur, alamat, ijazah };
    res.json(mahasiswa[index]);
});

// DELETE: remove a student
app.delete("/api/mahasiswa/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    mahasiswa.splice(index, 1);
    res.json({ pesan: "Data dihapus" });
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});