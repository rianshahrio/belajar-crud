
let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
let editIndex = null;

const form = document.getElementById("formMahasiswa");
const namaInput = document.getElementById("nama");
const jurusanInput = document.getElementById("jurusan");
const umurInput = document.getElementById("umur");
const alamatInput = document.getElementById("alamat");
const ijazahInput = document.getElementById("ijazah");
const ijazahInfo = document.getElementById("ijazahInfo");
const tabel = document.getElementById("dataMahasiswa");
const btnSimpan = document.getElementById("btnSimpan");
const cariInput = document.getElementById("cari");
document.getElementById("btnLogout").addEventListener("click", function () {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("user");
    window.location.replace("login.html");
});

function resetForm() {
    form.reset();
    editIndex = null;
    ijazahInput.required = true;
    ijazahInfo.textContent = "";
    btnSimpan.textContent = "+ Tambah Data";
    btnSimpan.className = "btn btn-primary";
}

function simpanData() {
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
}

// CREATE: Tambah data
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const nama = namaInput.value.trim();
    const jurusan = jurusanInput.value.trim();
    const umur = umurInput.value.trim();
    const alamat = alamatInput.value.trim();
    const file = ijazahInput.files[0];
    let ijazah;

    if (file) {
        ijazah = file.name;
    } else if (editIndex !== null) {
        ijazah = mahasiswa[editIndex].ijazah;
    }

    if (!nama || !jurusan || !umur || !alamat || !ijazah) return;

    if (editIndex === null) {

        mahasiswa.push({
            nama,
            jurusan,
            umur,
            alamat,
            ijazah
        });

    } else {

        mahasiswa[editIndex] = {
            nama,
            jurusan,
            umur,
            alamat,
            ijazah
        };

        editIndex = null;

        btnSimpan.textContent = "+ Tambah Data";
        btnSimpan.className = "btn btn-primary";

    }

    resetForm();
    simpanData();
    tampilkanData();

});

// READ: Tampilkan data
function tampilkanData() {

    const kata = cariInput.value.toLowerCase().trim();
    let nomor = 0;

    tabel.innerHTML = "";

    mahasiswa.forEach((item, index) => {

        const cocok =
            item.nama.toLowerCase().includes(kata) ||
            item.jurusan.toLowerCase().includes(kata) ||
            item.alamat.toLowerCase().includes(kata) ||
            item.umur.toLowerCase().includes(kata);

        if (!cocok) return;   // skip rows that don't match

        nomor++;

        tabel.innerHTML += `
            <tr>
                <td>${nomor}</td>
                <td>${escapeHTML(item.nama)}</td>
                <td>${escapeHTML(item.jurusan)}</td>
                <td>${escapeHTML(item.umur)} Tahun</td>
                <td>${escapeHTML(item.alamat)}</td>
                <td>${escapeHTML(item.ijazah)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editData(${index})">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="hapusData(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `;

    });

    if (nomor === 0) {
        tabel.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-secondary">Data tidak ditemukan</td>
            </tr>
        `;
    }

}
cariInput.addEventListener("input", tampilkanData);

// UPDATE: Edit data
function editData(index) {

    namaInput.value = mahasiswa[index].nama;
    jurusanInput.value = mahasiswa[index].jurusan;
    umurInput.value = mahasiswa[index].umur;
    alamatInput.value = mahasiswa[index].alamat;
    ijazahInput.value = "";
    ijazahInput.required = false;
    ijazahInfo.textContent = "File saat ini: " + mahasiswa[index].ijazah + " (pilih file baru untuk mengganti)";

    editIndex = index;

    btnSimpan.textContent = "Simpan Perubahan";
    btnSimpan.className = "btn btn-success";

    namaInput.focus();

}

// DELETE: Hapus data
function hapusData(index) {

    if (confirm("Yakin ingin menghapus data ini?")) {

        mahasiswa.splice(index, 1);
        simpanData();

        if (editIndex === index) {
            resetForm();
        } else if (editIndex !== null && editIndex > index) {
            editIndex--;
        }

        tampilkanData();

    }

}

// Escape HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (char) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];

    });

}
tampilkanData();