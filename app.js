let recetas = [];

// Cargar recetas del almacenamiento local al cargar la página
function cargarRecetas() {
    const recetasAlmacenadas = localStorage.getItem("recetas");
    if (recetasAlmacenadas) {
        recetas = JSON.parse(recetasAlmacenadas);
    }
    if (document.getElementById("recetas-container")) {
        mostrarTodasRecetas();
    }
}

// Agregar una nueva receta y almacenarla
function agregarReceta() {
    const nombre = document.getElementById("nombre-receta").value.trim();
    const categoria = document.getElementById("categoria-receta").value.trim();
    const descripcion = document.getElementById("descripcion-receta").value.trim();

    if (!nombre || !categoria || !descripcion) {
        alert("Por favor, completa todos los campos antes de agregar una receta.");
        return;
    }

    const receta = {
        id: Date.now(),
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion
    };

    recetas.push(receta);
    localStorage.setItem("recetas", JSON.stringify(recetas));
    alert("Receta agregada con éxito.");
    mostrarTodasRecetas(); 
    document.getElementById("form-receta").reset(); 
}

// Crear y agregar una sección para una receta específica
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

// Crear un contenedor para una nueva categoría si no existe
function crearCategoriaContainer(categoria) {
    const recetasContainer = document.getElementById("recetas-container");
    const categoriaSection = document.createElement("div");
    categoriaSection.classList.add("categoria-section");
    categoriaSection.setAttribute("id", `categoria-${categoria}`);
    categoriaSection.innerHTML = `<h2>${categoria}</h2>`;
    recetasContainer.appendChild(categoriaSection);
    return categoriaSection;
}

// Mostrar todas las recetas en el contenedor principal
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

// Eliminar una receta por su ID
function eliminarReceta(id) {
    recetas = recetas.filter(receta => receta.id !== id);
    localStorage.setItem("recetas", JSON.stringify(recetas)); 
    mostrarTodasRecetas(); 
}

// Ocultar todas las recetas (opcional)
function ocultarRecetas() {
    document.getElementById("recetas-container").innerHTML = "";
}

// Cargar las recetas cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarRecetas);
