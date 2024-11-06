let recetas = [];

function cargarRecetas() {
    const recetasAlmacenadas = localStorage.getItem("recetas");
    if (recetasAlmacenadas) {
        recetas = JSON.parse(recetasAlmacenadas);
    }
    if (document.getElementById("recetas-container")) {
        mostrarTodasRecetas();
    }
}

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

function crearSeccionReceta(receta) {
    const categoriaContainer = document.getElementById(`categoria-${receta.categoria}`) || crearCategoriaContainer(receta.categoria);
    
    const recetaSection = document.createElement("section");
    recetaSection.classList.add("recipe-section");
    recetaSection.setAttribute("id", `receta-${receta.id}`);
    recetaSection.innerHTML = `
        <h3>${receta.nombre}</h3>
        <p><strong>Categoría:</strong> ${receta.categoria}</p>
        <p>${receta.descripcion}</p>
        <button class="delete-button" onclick="eliminarReceta(${receta.id})">Eliminar</button>
    `;

    categoriaContainer.appendChild(recetaSection);
}

function crearCategoriaContainer(categoria) {
    const recetasContainer = document.getElementById("recetas-container");
    const categoriaSection = document.createElement("div");
    categoriaSection.classList.add("categoria-section");
    categoriaSection.setAttribute("id", `categoria-${categoria}`);
    categoriaSection.innerHTML = `<h2>${categoria}</h2>`;
    recetasContainer.appendChild(categoriaSection);
    return categoriaSection;
}

function mostrarTodasRecetas() {
    const recetasContainer = document.getElementById("recetas-container");
    recetasContainer.innerHTML = "";
    const categoriasMap = {};

    recetas.forEach(receta => {
        if (!categoriasMap[receta.categoria]) {
            categoriasMap[receta.categoria] = crearCategoriaContainer(receta.categoria);
        }
        crearSeccionReceta(receta);
    });
}

function eliminarReceta(id) {
    recetas = recetas.filter(receta => receta.id !== id);
    localStorage.setItem("recetas", JSON.stringify(recetas));
    mostrarTodasRecetas();
}

function ocultarRecetas() {
    document.getElementById("recetas-container").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", cargarRecetas);
