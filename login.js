const formLogin = document.getElementById("loginForm");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailLogin = document.getElementById("email").value;
    const passwordLogin = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && emailLogin === user.correo && passwordLogin === user.password) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("logged", JSON.stringify(true));
        window.location.href = "index.html";
    } else {
        alert("Usuario o contraseña incorrectos. Regístrate si no tienes cuenta.");
    }
});




