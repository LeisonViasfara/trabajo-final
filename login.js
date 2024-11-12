let formLogin = document.getElementById("loginForm");

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();

    const emailLogin = document.getElementById("email").value;
    const passwordLogin = document.getElementById("password").value;

    const userStoraje = JSON.parse(localStorage.getItem("user"));

    if (userStoraje && emailLogin === userStoraje.correo && passwordLogin === userStoraje.password) {
        alert("Usuario y contraseña CORRECTOS");
        localStorage.setItem("logged", JSON.stringify(true));
        window.location.href = "/index.html";
    } else {
        alert("Usuario y contraseña INCORRECTOS");
    }
});



