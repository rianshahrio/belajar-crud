
// DATA LOGIN CONTOH (hanya untuk belajar, lihat catatan keamanan)
const USERNAME_BENAR = "admin";
const PASSWORD_BENAR = "12345";

const formLogin = document.getElementById("formLogin");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const tampilPassword = document.getElementById("tampilPassword");
const pesanError = document.getElementById("pesanError");

// Kalau sudah login, tidak perlu lihat halaman ini lagi
if (sessionStorage.getItem("login") === "true") {
    window.location.replace("index.html");
}

// Tampilkan / sembunyikan password
tampilPassword.addEventListener("change", function () {
    passwordInput.type = tampilPassword.checked ? "text" : "password";
});

// Proses login
formLogin.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === USERNAME_BENAR && password === PASSWORD_BENAR) {

        sessionStorage.setItem("login", "true");
        sessionStorage.setItem("user", username);
        window.location.replace("index.html");

    } else {

        pesanError.textContent = "Username atau password salah.";
        pesanError.classList.remove("d-none");
        passwordInput.value = "";
        passwordInput.focus();

    }

});