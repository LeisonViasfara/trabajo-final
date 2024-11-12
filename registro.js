const formRegistro = document.getElementById("registroForm");

formRegistro.addEventListener("submit", function (e) { 
    e.preventDefault(); 

    const nameForm = document.getElementById("name").value;
    const emailForm = document.getElementById("email").value;
    const passwordForm = document.getElementById("password").value;
    const generoForm = document.querySelector('input[name="genero"]:checked')?.value;

    const newUser = {
        nombre: nameForm,
        correo: emailForm,
        password: passwordForm,
        genero: generoForm
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    window.location.href = "/index.html";
});
