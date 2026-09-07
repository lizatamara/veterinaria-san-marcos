const contenedor = document.getElementById("catalogoServicios");
const resultadoFiltro = document.getElementById("resultadoFiltroServicios");

// Elementos del filtro
const filtroCategoria = document.getElementById("filtroCategoriaServicio");
const filtroPrecioMin = document.getElementById("filtroPrecioMinServicio");
const filtroPrecioMax = document.getElementById("filtroPrecioMaxServicio");
const btnLimpiar = document.getElementById("btnLimpiarFiltrosServicios");

function obtenerServicios() {
    return JSON.parse(localStorage.getItem("servicios")) || [];
}

function cargarCategorias() {

    const servicios = obtenerServicios();
    const categorias = [];

    servicios.forEach(function (servicio) {

        if (!categorias.includes(servicio.categoria)) {
            categorias.push(servicio.categoria);
        }

    });

    categorias.forEach(function (categoria) {

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        filtroCategoria.appendChild(option);

    });
}

function mostrarServicios(serviciosAMostrar) {

    contenedor.replaceChildren();
    
    // Actualizamos el texto dinámicamente con la cantidad de resultados
    if (resultadoFiltro) {
        resultadoFiltro.textContent = `${serviciosAMostrar.length} servicios disponibles`;
    }

    if (serviciosAMostrar.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "text-muted";
        mensaje.textContent = "No se encontraron servicios que coincidan con los filtros.";
        
        contenedor.appendChild(mensaje);
        return;
    }

    serviciosAMostrar.forEach(function (servicio) {
        crearCardServicio(servicio);
    });
}

function crearCardServicio(servicio) {
    const article = document.createElement("article");
    article.className = "col";
    article.id = `servicio-${servicio.id.toLowerCase()}`;
    article.setAttribute("data-id", servicio.id);
    article.setAttribute("data-category", servicio.categoria);
    article.setAttribute("data-price", servicio.precio);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card h-100 service-card";

    const img = document.createElement("img");
    img.src = `../img/servicios/${servicio.id.toLowerCase()}.svg`;
    img.className = "card-img-top catalog-image";
    img.alt = `Ilustración del servicio ${servicio.nombre}`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const topRow = document.createElement("div");
    topRow.className = "d-flex justify-content-between gap-2 mb-2";

    const badge = document.createElement("span");
    badge.className = "badge text-bg-light";
    badge.textContent = servicio.categoria;

    const codeSpan = document.createElement("span");
    codeSpan.className = "small text-muted";
    codeSpan.textContent = servicio.id;

    topRow.appendChild(badge);
    topRow.appendChild(codeSpan);

    const title = document.createElement("h2");
    title.className = "h5 card-title";
    title.id = `nombre-${servicio.id.toLowerCase()}`;
    title.textContent = servicio.nombre;

    // =================_______    PENDIENTE SACAR innerHTML    ________=============

    /*

    // --- Párrafo de Especie sin innerHTML ---
    const pEspecie = document.createElement("p");
    pEspecie.className = "card-text small mb-2";

    const strongEspecie = document.createElement("strong");
    strongEspecie.textContent = "Especie: ";
    
    pEspecie.appendChild(strongEspecie);
    pEspecie.appendChild(document.createTextNode(servicio.especie));


    // --- Párrafo de Duración sin innerHTML ---
    const pDuracion = document.createElement("p");
    pDuracion.className = "card-text small mb-1";

    const strongDuracion = document.createElement("strong");
    strongDuracion.textContent = "Duración: ";

    */

    const pEspecie = document.createElement("p");
    pEspecie.className = "card-text small mb-2";
    pEspecie.innerHTML = `<strong>Especie:</strong> ${servicio.especie}`;

    const pDuracion = document.createElement("p");
    pDuracion.className = "card-text small mb-1";
    pDuracion.innerHTML = `<strong>Duración:</strong> ${servicio.duracion}`;

    const pPrecio = document.createElement("p");
    pPrecio.className = "h5 fw-bold price mb-1";
    pPrecio.id = `precio-${servicio.id.toLowerCase()}`;
    pPrecio.textContent = `$${servicio.precio.toLocaleString()}`;

    const pObs = document.createElement("p");
    pObs.className = "small text-muted mb-3";
    if (servicio.observaciones && servicio.observaciones.trim() !== "") {
        pObs.textContent = servicio.observaciones;
    } else {
        pObs.innerHTML = "&nbsp;";
    }

    const btnContainer = document.createElement("div");
    btnContainer.className = "mt-auto d-flex gap-2";

    const btnDetalle = document.createElement("a");
    btnDetalle.className = "btn btn-outline-primary flex-grow-1";
    btnDetalle.href = `detalle-servicio.html?id=${servicio.id}`;
    btnDetalle.id = `btnDetalle-${servicio.id.toLowerCase()}`;
    btnDetalle.textContent = "Ver detalles";

    const btnReservar = document.createElement("a");
    btnReservar.className = "btn btn-primary";
    btnReservar.href = `reservar.html?servicio=${servicio.id}`;
    btnReservar.id = `btnReservar-${servicio.id.toLowerCase()}`;
    btnReservar.setAttribute("aria-label", `Reservar ${servicio.nombre}`);

    const icon = document.createElement("i");
    icon.className = "bi bi-calendar-plus";
    btnReservar.appendChild(icon);

    btnContainer.appendChild(btnDetalle);
    btnContainer.appendChild(btnReservar);

    cardBody.appendChild(topRow);
    cardBody.appendChild(title);
    cardBody.appendChild(pEspecie);
    cardBody.appendChild(pDuracion);
    cardBody.appendChild(pPrecio);
    cardBody.appendChild(pObs);
    cardBody.appendChild(btnContainer);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    article.appendChild(cardDiv);
    contenedor.appendChild(article);
}

function aplicarFiltros() {
    const servicios = obtenerServicios();
    
    const categoriaSeleccionada = filtroCategoria.value;
    const precioMin = Number(filtroPrecioMin.value) || 0;
    const precioMax = Number(filtroPrecioMax.value) || Infinity;

    const serviciosFiltrados = servicios.filter(servicio => {
        const coincideCategoria = categoriaSeleccionada === "" || servicio.categoria === categoriaSeleccionada;
        const coincidePrecio = servicio.precio >= precioMin && (filtroPrecioMax.value === "" || servicio.precio <= precioMax);

        return coincideCategoria && coincidePrecio;
    });

    mostrarServicios(serviciosFiltrados);
}

function inicializarFiltros() {
    if (filtroCategoria) filtroCategoria.addEventListener("change", aplicarFiltros);
    if (filtroPrecioMin) filtroPrecioMin.addEventListener("input", aplicarFiltros);
    if (filtroPrecioMax) filtroPrecioMax.addEventListener("input", aplicarFiltros);

    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            filtroCategoria.value = "";
            filtroPrecioMin.value = "";
            filtroPrecioMax.value = "";
            aplicarFiltros();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const servicios = obtenerServicios();
    cargarCategorias()
    mostrarServicios(servicios);
    inicializarFiltros();
});