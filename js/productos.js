const contenedor = document.getElementById("catalogoProductos");
const resultadoFiltro = document.getElementById("resultadoFiltroProductos");

// Elementos del filtro
const filtroCategoria = document.getElementById("filtroCategoriaProducto");
const filtroPrecioMin = document.getElementById("filtroPrecioMinProducto");
const filtroPrecioMax = document.getElementById("filtroPrecioMaxProducto");
const btnLimpiar = document.getElementById("btnLimpiarFiltrosProductos");

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function cargarCategorias() {

    const productos = obtenerProductos();
    const categorias = [];

    productos.forEach(function (producto) {

        if (!categorias.includes(producto.categoria)) {
            categorias.push(producto.categoria);
        }

    });

    categorias.forEach(function (categoria) {

        const option = document.createElement("option");

        option.value = categoria;
        option.textContent = categoria;

        filtroCategoria.appendChild(option);

    });
}

function mostrarProductos(productosAMostrar) {
    
    contenedor.replaceChildren();
    
    // Actualizamos el texto dinámicamente con la cantidad de resultados
    if (resultadoFiltro) {
        resultadoFiltro.textContent = `${productosAMostrar.length} productos disponibles`;
    }

    if (productosAMostrar.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "text-muted";
        mensaje.textContent = "No se encontraron productos que coincidan con los filtros.";
        
        contenedor.appendChild(mensaje);
        return;
    }

    productosAMostrar.forEach(function (producto) {
        crearCardProducto(producto);
    });
}

function crearCardProducto(producto) {
    const article = document.createElement("article");
    article.className = "col";
    article.id = `producto-${producto.id.toLowerCase()}`;
    article.setAttribute("data-id", producto.id);
    article.setAttribute("data-category", producto.categoria);
    article.setAttribute("data-price", producto.precio);
    article.setAttribute("data-stock", producto.stock);

    const cardDiv = document.createElement("div");
    cardDiv.className = "card h-100 product-card"

    const img = document.createElement("img");
    img.src = `../img/productos/${producto.id.toLowerCase()}.svg`;
    img.className = "card-img-top catalog-image";
    img.alt = `Ilustración del producto ${producto.nombre}`;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    const topRow = document.createElement("div");
    topRow.className = "d-flex justify-content-between gap-2 mb-2";

    const badge = document.createElement("span");
    badge.className = "badge text-bg-light";
    badge.textContent = producto.categoria;

    const codeSpan = document.createElement("span");
    codeSpan.className = "small text-muted";
    codeSpan.textContent = producto.id;

    topRow.appendChild(badge);
    topRow.appendChild(codeSpan);

    const title = document.createElement("h2");
    title.className = "h5 card-title";
    title.id = `nombre-${producto.id.toLowerCase()}`;
    title.textContent = producto.nombre;

    const pActivo = document.createElement("p");
    pActivo.className = "small mb-1";
    pActivo.innerHTML = `<strong>Principio Activo:</strong> ${producto.principioActivo}`;

    const presentacion = document.createElement("p");
    presentacion.className = "small mb-1";
    presentacion.innerHTML = `<strong>Presentación:</strong> ${producto.presentacion}`;

    const especie = document.createElement("p");
    especie.className = "small mb-2";
    especie.innerHTML = `<strong>Especie:</strong> ${producto.especie}`;

    const stock = document.createElement("p");
    stock.className = "small mb-2";
    stock.id = `stock-${producto.id.toLowerCase()}`;
    stock.textContent = `Stock: ${producto.stock.toLocaleString()}`;

    const precio = document.createElement("p");
    precio.className = "h5 fw-bold price mb-3";
    precio.id = `precio-${producto.id.toLowerCase()}`;
    precio.textContent = `$${producto.precio.toLocaleString()}`;

    const btnContainer = document.createElement("div");
    btnContainer.className = "mt-auto d-flex gap-2";

    const btnDetalle = document.createElement("a");
    btnDetalle.className = "btn btn-outline-primary flex-grow-1";
    btnDetalle.href = `detalle-producto.html?id=${producto.id}`;
    btnDetalle.id = `btnDetalle-${producto.id.toLowerCase()}`;
    btnDetalle.textContent = "Ver detalles";

    // CAMBIO: ahora es un botón y no un enlace a reservar.html
    const btnAgregarCarrito = document.createElement("button");
    btnAgregarCarrito.className = "btn btn-primary";
    btnAgregarCarrito.type = "button";
    btnAgregarCarrito.id = `btnAgregarCarrito-${producto.id.toLowerCase()}`;
    btnAgregarCarrito.setAttribute("aria-label", `Agregar ${producto.nombre}`);

    const icon = document.createElement("i");
    icon.className = "bi bi-cart-plus";
    btnAgregarCarrito.appendChild(icon);

    // NUEVO: agregar el producto al carrito
    btnAgregarCarrito.addEventListener("click", () => {

        if (producto.stock <= 0) {
            alert("Este producto no tiene stock disponible.");
            return;
        }

        let carrito = obtenerCarrito();

        const index = carrito.findIndex(item => item.id === producto.id);

        if (index > -1) {

            if (carrito[index].cantidad + 1 <= producto.stock) {
                carrito[index].cantidad += 1;
            } else {
                alert("La cantidad total supera el stock disponible.");
                return;
            }

        } else {

            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                cantidad: 1
            });

        }

        guardarCarrito(carrito);
        dispararAnimacionCarrito();

        // NUEVO: abrir el offcanvas igual que en detalle-producto.html
        const offcanvasEl = document.getElementById("offcanvasCarrito");

        if (offcanvasEl && typeof bootstrap !== "undefined") {
            const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
            bsOffcanvas.show();
        }
    });

    btnContainer.appendChild(btnDetalle);
    btnContainer.appendChild(btnAgregarCarrito);

    cardBody.appendChild(topRow);
    cardBody.appendChild(title);
    cardBody.appendChild(pActivo);
    cardBody.appendChild(presentacion);
    cardBody.appendChild(especie);
    cardBody.appendChild(stock)
    cardBody.appendChild(precio)
    cardBody.appendChild(btnContainer);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    article.appendChild(cardDiv);
    contenedor.appendChild(article);
}

function aplicarFiltros() {
    const productos = obtenerProductos();
    
    const categoriaSeleccionada = filtroCategoria.value;
    const precioMin = Number(filtroPrecioMin.value) || 0;
    const precioMax = Number(filtroPrecioMax.value) || Infinity;

    const productosFiltrados = productos.filter(producto => {
        const coincideCategoria = categoriaSeleccionada === "" || producto.categoria === categoriaSeleccionada;
        const coincidePrecio = producto.precio >= precioMin && (filtroPrecioMax.value === "" || producto.precio <= precioMax);

        return coincideCategoria && coincidePrecio;
    });

    mostrarProductos(productosFiltrados);
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
    const productos = obtenerProductos();
    cargarCategorias()
    mostrarProductos(productos);
    inicializarFiltros();
});
