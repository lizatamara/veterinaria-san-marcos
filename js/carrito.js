const CLAVE_CARRITO = "carritoSanMarcos";

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadoresUI();
}

function actualizarContadoresUI() {
    const carrito = obtenerCarrito();
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const badge = document.getElementById("badgeContadorCarrito");
    if (badge) {
        badge.textContent = totalCantidad;
        if (totalCantidad > 0) {
            badge.classList.remove("d-none");
        } else {
            badge.classList.add("d-none");
        }
    }

    renderizarOffcanvas(carrito);
    renderizarPaginaCarrito(carrito);
}

function dispararAnimacionCarrito() {
    const icono = document.getElementById("iconoCarritoNav");
    if (icono) {
        icono.classList.add("text-primary", "scale-up");
        setTimeout(() => {
            icono.classList.remove("text-primary", "scale-up");
        }, 400);
    }
}

// Renderizado seguro sin innerHTML para el Offcanvas (Panel lateral)
function renderizarOffcanvas(carrito) {
    const contenedor = document.getElementById("offcanvasListaItems");
    const divVacio = document.getElementById("offcanvasCarritoVacio");
    const totalElem = document.getElementById("offcanvasTotal");

    if (!contenedor) return;

    if (carrito.length === 0) {
        if (divVacio) divVacio.classList.remove("d-none");
        contenedor.replaceChildren();
        if (totalElem) totalElem.textContent = "$0";
        return;
    }

    if (divVacio) divVacio.classList.add("d-none");
    contenedor.replaceChildren();
    let totalGeneral = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const divCard = document.createElement("div");
        divCard.className = "card p-2 shadow-sm";

        const divFlex = document.createElement("div");
        divFlex.className = "d-flex justify-content-between align-items-center";

        const divInfo = document.createElement("div");
        const h6 = document.createElement("h6");
        h6.className = "mb-0 fw-bold";
        h6.textContent = item.nombre; // Seguro contra XSS

        const small = document.createElement("small");
        small.className = "text-muted";
        small.textContent = `$${item.precio.toLocaleString()} x ${item.cantidad}`;

        divInfo.appendChild(h6);
        divInfo.appendChild(small);

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group btn-group-sm";

        const btnRestar = document.createElement("button");
        btnRestar.className = "btn btn-outline-secondary btn-restar-off";
        btnRestar.setAttribute("data-id", item.id);
        btnRestar.textContent = "-";

        const btnCantidad = document.createElement("button");
        btnCantidad.className = "btn btn-outline-secondary disabled";
        btnCantidad.textContent = item.cantidad;

        const btnSumar = document.createElement("button");
        btnSumar.className = "btn btn-outline-secondary btn-sumar-off";
        btnSumar.setAttribute("data-id", item.id);
        btnSumar.textContent = "+";

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-outline-danger btn-eliminar-off";
        btnEliminar.setAttribute("data-id", item.id);
        
        const iconoTrash = document.createElement("i");
        iconoTrash.className = "bi bi-trash";
        btnEliminar.appendChild(iconoTrash);

        btnGroup.appendChild(btnRestar);
        btnGroup.appendChild(btnCantidad);
        btnGroup.appendChild(btnSumar);
        btnGroup.appendChild(btnEliminar);

        divFlex.appendChild(divInfo);
        divFlex.appendChild(btnGroup);
        divCard.appendChild(divFlex);
        contenedor.appendChild(divCard);
    });

    if (totalElem) totalElem.textContent = `$${totalGeneral.toLocaleString()}`;
    activarAccionesOffcanvas();
}

// Renderizado seguro sin innerHTML para carrito.html
function renderizarPaginaCarrito(carrito) {
    const listaCarrito = document.getElementById("listaCarrito");
    const carritoVacio = document.getElementById("carritoVacio");
    const contenedorCarrito = document.getElementById("contenedorCarrito");
    const subtotalCarrito = document.getElementById("subtotalCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!listaCarrito) return; 

    if (carrito.length === 0) {
        if (carritoVacio) carritoVacio.classList.remove("d-none");
        if (contenedorCarrito) contenedorCarrito.classList.add("d-none");
        return;
    }

    if (carritoVacio) carritoVacio.classList.add("d-none");
    if (contenedorCarrito) contenedorCarrito.classList.remove("d-none");

    listaCarrito.replaceChildren();
    let totalGeneral = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "card p-3 shadow-sm";

        const row = document.createElement("div");
        row.className = "row align-items-center";

        const colInfo = document.createElement("div");
        colInfo.className = "col-md-5";
        const h5 = document.createElement("h5");
        h5.className = "fw-bold mb-1";
        h5.textContent = item.nombre; // Seguro contra XSS
        const spanPrecio = document.createElement("span");
        spanPrecio.className = "text-muted small";
        spanPrecio.textContent = `Precio: $${item.precio.toLocaleString()}`;
        colInfo.appendChild(h5);
        colInfo.appendChild(spanPrecio);

        const colCant = document.createElement("div");
        colCant.className = "col-md-3";
        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group input-group-sm";

        const btnR = document.createElement("button");
        btnR.className = "btn btn-outline-secondary btn-restar";
        btnR.setAttribute("data-id", item.id);
        btnR.textContent = "-";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control text-center";
        input.value = item.cantidad;
        input.readOnly = true;

        const btnS = document.createElement("button");
        btnS.className = "btn btn-outline-secondary btn-sumar";
        btnS.setAttribute("data-id", item.id);
        btnS.textContent = "+";

        inputGroup.appendChild(btnR);
        inputGroup.appendChild(input);
        inputGroup.appendChild(btnS);
        colCant.appendChild(inputGroup);

        const colSubtotal = document.createElement("div");
        colSubtotal.className = "col-md-3 text-md-end";
        const strongSub = document.createElement("strong");
        strongSub.className = "text-primary";
        strongSub.textContent = `$${subtotal.toLocaleString()}`;
        colSubtotal.appendChild(strongSub);

        const colDel = document.createElement("div");
        colDel.className = "col-md-1 text-end";
        const btnDel = document.createElement("button");
        btnDel.className = "btn btn-outline-danger btn-sm btn-eliminar";
        btnDel.setAttribute("data-id", item.id);
        const iconoTrash2 = document.createElement("i");
        iconoTrash2.className = "bi bi-trash";
        btnDel.appendChild(iconoTrash2);
        colDel.appendChild(btnDel);

        row.appendChild(colInfo);
        row.appendChild(colCant);
        row.appendChild(colSubtotal);
        row.appendChild(colDel);
        itemDiv.appendChild(row);
        listaCarrito.appendChild(itemDiv);
    });

    if (subtotalCarrito) subtotalCarrito.textContent = `$${totalGeneral.toLocaleString()}`;
    if (totalCarrito) totalCarrito.textContent = `$${totalGeneral.toLocaleString()}`;

    activarAccionesPaginaCarrito();
}

// Configuración del botón de detalle de producto
function configurarBotonDetalle() {
    const btnAgregar = document.getElementById("btnAgregarProductoDetalle");
    if (!btnAgregar) return;

    btnAgregar.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const productoId = params.get("id");
        const inputCantidad = document.getElementById("cantidadProducto");
        const cantidadPedida = inputCantidad ? parseInt(inputCantidad.value) || 1 : 1;

        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const producto = productos.find(p => p.id === productoId);
        const mensajeStock = document.getElementById("mensajeStockProducto");

        if (!producto) return;

        if (producto.stock < cantidadPedida) {
            if (mensajeStock) {
                mensajeStock.textContent = `Stock insuficiente. Disponibles: ${producto.stock}`;
                mensajeStock.classList.remove("d-none");
            }
            return;
        }

        if (mensajeStock) mensajeStock.classList.add("d-none");

        let carrito = obtenerCarrito();
        const index = carrito.findIndex(item => item.id === productoId);

        if (index > -1) {
            if ((carrito[index].cantidad + cantidadPedida) <= producto.stock) {
                carrito[index].cantidad += cantidadPedida;
            } else {
                if (typeof mostrarNotificacion === "function") {
                    mostrarNotificacion("La cantidad total supera el stock disponible.", "warning");
                } else {
                    alert("La cantidad total supera el stock disponible.");
                }
                return;
            }
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                stock: producto.stock,
                cantidad: cantidadPedida
            });
        }

        guardarCarrito(carrito);
        dispararAnimacionCarrito();

        const offcanvasEl = document.getElementById('offcanvasCarrito');
        if (offcanvasEl && typeof bootstrap !== 'undefined') {
            const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
            bsOffcanvas.show();
        }
    });
}

function activarAccionesOffcanvas() {
    document.querySelectorAll(".btn-sumar-off").forEach(btn => {
        btn.addEventListener("click", (e) => modificarCantidad(e.target.getAttribute("data-id"), 1));
    });
    document.querySelectorAll(".btn-restar-off").forEach(btn => {
        btn.addEventListener("click", (e) => modificarCantidad(e.target.getAttribute("data-id"), -1));
    });
    document.querySelectorAll(".btn-eliminar-off").forEach(btn => {
        btn.addEventListener("click", (e) => eliminarItemCarrito(e.target.closest("button").getAttribute("data-id")));
    });
}

function activarAccionesPaginaCarrito() {
    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", (e) => modificarCantidad(e.target.getAttribute("data-id"), 1));
    });
    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", (e) => modificarCantidad(e.target.getAttribute("data-id"), -1));
    });
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => eliminarItemCarrito(e.target.closest("button").getAttribute("data-id")));
    });

    const btnVaciar = document.getElementById("btnVaciarCarrito");
    if (btnVaciar) {
        btnVaciar.onclick = () => {
            guardarCarrito([]);
        };
    }
}

function modificarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    let item = carrito.find(i => i.id === id);
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const prodOriginal = productos.find(p => p.id === id);

    if (item) {
        const nuevaCantidad = item.cantidad + cambio;
        if (nuevaCantidad > 0 && nuevaCantidad <= prodOriginal.stock) {
            item.cantidad = nuevaCantidad;
            guardarCarrito(carrito);
        } else if (nuevaCantidad > prodOriginal.stock) {
            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion("Has alcanzado el límite de stock disponible.", "warning");
            } else {
                alert("Has alcanzado el límite de stock disponible.");
            }
        }
    }
}

function eliminarItemCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(i => i.id !== id);
    guardarCarrito(carrito);
}

function finalizarCompra() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        if (typeof mostrarNotificacion === "function") {
            mostrarNotificacion("Debes iniciar sesión para finalizar tu compra.", "danger");
        } else {
            alert("Debes iniciar sesión para finalizar tu compra.");
        }
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
        return;
    }

    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        if (typeof mostrarNotificacion === "function") {
            mostrarNotificacion("Tu carrito está vacío.", "warning");
        } else {
            alert("Tu carrito está vacío.");
        }
        return;
    }

    let productosStorage = JSON.parse(localStorage.getItem("productos")) || [];
    carrito.forEach(item => {
        const prod = productosStorage.find(p => p.id === item.id);
        if (prod) {
            prod.stock -= item.cantidad;
        }
    });
    localStorage.setItem("productos", JSON.stringify(productosStorage));

    const nuevaCompra = {
        id: crypto.randomUUID(),
        usuarioId: usuarioLogueado.id,
        productos: carrito,
        total: carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0),
        fecha: new Date().toLocaleDateString(),
        estado: "Completado"
    };

    const misCompras = JSON.parse(localStorage.getItem("misCompras")) || [];
    misCompras.push(nuevaCompra);
    localStorage.setItem("misCompras", JSON.stringify(misCompras));

    localStorage.removeItem(CLAVE_CARRITO);
    
    const mensajeExito = document.getElementById("mensajeCompraExitosa");
    if (mensajeExito) {
        mensajeExito.textContent = "¡Compra realizada con éxito! Redirigiendo...";
        mensajeExito.classList.remove("d-none");
    }

    setTimeout(() => {
        window.location.href = "mis-compras.html";
    }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadoresUI();
    configurarBotonDetalle(); // Nombre corregido para evitar el error

    const btnFinalizar = document.getElementById("btnFinalizarCompra");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra);
    }
});