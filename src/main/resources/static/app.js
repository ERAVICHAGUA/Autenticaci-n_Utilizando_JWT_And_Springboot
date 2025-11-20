// =========================
// FUNCIÓN DE REGISTRO
// =========================
async function register() {

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const country = document.getElementById("country").value;
    const username = document.getElementById("username").value; // IMPORTANTE
    const password = document.getElementById("password").value;

    const body = {
        firstname: firstname,
        lastname: lastname,
        country: country,
        username: username,  // Match con RegisterRequest.java
        password: password
    };

    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        console.log("Respuesta register:", text);

        if (!response.ok) {
            document.getElementById("registerResult").innerText = "Error al registrar";
            return;
        }

        document.getElementById("registerResult").innerText = "Registro exitoso ✔";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

    } catch (error) {
        document.getElementById("registerResult").innerText = "Error en el servidor";
    }
}



// =========================
// FUNCIÓN DE LOGIN
// =========================
async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const body = {
        username: username,  // Tu backend espera esto
        password: password
    };

    try {
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const text = await response.text();
        console.log("Respuesta login:", text);

        if (!response.ok) {
            document.getElementById("result").innerText = "Credenciales incorrectas";
            return;
        }

        const data = JSON.parse(text);

        // Guarda token JWT
        localStorage.setItem("token", data.token);

        // Redirige al dashboard
        window.location.href = "home.html";

    } catch (error) {
        document.getElementById("result").innerText = "Error en el servidor";
    }
}



// =========================
// PROTEGER HOME
// =========================
function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    }
}



// =========================
// LOGOUT
// =========================
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
