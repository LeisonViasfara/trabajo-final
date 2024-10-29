
const fs = require('fs'); 


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); 

    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    
    const user = {
        email: email,
        password: password,
        date: new Date().toLocaleString()
    };

    
    guardarUsuario(user);

    
    document.getElementById("loginMessage").textContent = "Inicio de sesión registrado con éxito";
});


function guardarUsuario(user) {
    const filePath = "usuarios.json";
    
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log("Error leyendo el archivo:", err);
            return;
        }

        let usuarios = [];

        
        if (data) {
            usuarios = JSON.parse(data);
        }

        
        usuarios.push(user);

        
        fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), (err) => {
            if (err) {
                console.log("Error escribiendo en el archivo:", err);
            } else {
                console.log("Usuario guardado con éxito en usuarios.json");
            }
        });
    });
}
