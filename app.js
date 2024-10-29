let recetas = [];



function agregarReceta() {
    const nombre = document.getElementById("nombre-receta").value;
    const categoria = document.getElementById("categoria-receta").value;
    const descripcion = document.getElementById("descripcion-receta").value;

    const receta = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion
    };

    recetas.push(receta);
    localStorage.setItem("recetas", JSON.stringify(recetas));
    alert("Receta agregada con éxito.");
    document.getElementById("form-receta").reset();
}


function cargarRecetas() {
    const recetasAlmacenadas = localStorage.getItem("recetas");
    if (recetasAlmacenadas) {
        recetas = JSON.parse(recetasAlmacenadas);
        mostrarTodasRecetas();
    }
}


function crearSeccionReceta(receta) {
    const recetasContainer = document.getElementById("recetas-container");

    const recetaSection = document.createElement("section");
    recetaSection.classList.add("recipe-section");
    recetaSection.setAttribute("id", `receta-${receta.id}`);
    recetaSection.innerHTML = `
        <h3>${receta.nombre}</h3>
        <p><strong>Categoría:</strong> ${receta.categoria}</p>
        <p>${receta.descripcion}</p>
        <button class="delete-button" onclick="eliminarReceta(${receta.id})">Eliminar</button>
    `;
    recetasContainer.appendChild(recetaSection);
}


function mostrarTodasRecetas() {
    const recetasContainer = document.getElementById("recetas-container");
    recetasContainer.innerHTML = ""; 

    recetas.forEach(receta => {
        crearSeccionReceta(receta);
    });
}


function eliminarReceta(id) {
    recetas = recetas.filter(receta => receta.id !== id); 
    localStorage.setItem("recetas", JSON.stringify(recetas));
    document.getElementById(`receta-${id}`).remove();
}


function ocultarRecetas() {
    document.getElementById("recetas-container").innerHTML = ""; 
}

if (window.location.pathname.includes("menu.html")) {
    cargarRecetas();
}
