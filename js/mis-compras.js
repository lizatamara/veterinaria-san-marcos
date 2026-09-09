const estadoSinCompras = document.getElementById("estadoSinCompras");
const estadoIniciarSesion = document.getElementById("estadoIniciarSesion");
const listaCompras = document.getElementById("listaCompras");
const tablaComprasBody = document.getElementById("tablaComprasBody");


function obtenerCompras() {
    return JSON.parse(localStorage.getItem("compras")) || [];
}


function mostrarMisCompras() {

    const usuarioGuardado = localStorage.getItem("usuarioLogueado");

    if (!usuarioGuardado) {
        estadoSinCompras.classList.add("d-none");
        listaCompras.classList.add("d-none");
        estadoIniciarSesion.classList.remove("d-none");
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    const compras = obtenerCompras();

    const misCompras = compras.filter(compra => compra.usuarioId === usuario.id);

    tablaComprasBody.replaceChildren();

    if (misCompras.length === 0) {
        estadoSinCompras.classList.remove("d-none");
        listaCompras.classList.add("d-none");
        estadoIniciarSesion.classList.add("d-none");
        return;
    }

    estadoSinCompras.classList.add("d-none");
    estadoIniciarSesion.classList.add("d-none");
    listaCompras.classList.remove("d-none");

    misCompras.forEach(compra => {
        crearFilaCompra(compra);
    });
}


function crearFilaCompra(compra) {

    const tr = document.createElement("tr");

    const tdCompra = document.createElement("td");
    tdCompra.textContent = `#${compra.id}`;

    const tdProductos = document.createElement("td");

    const cantidadProductos = compra.productos.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    tdProductos.textContent = cantidadProductos === 1
        ? "1 producto"
        : `${cantidadProductos} productos`;

    const tdFecha = document.createElement("td");
    tdFecha.textContent = compra.fecha;

    const tdTotal = document.createElement("td");
    tdTotal.textContent = `$${compra.total.toLocaleString()}`;

    const tdEstado = document.createElement("td");

    const badgeEstado = document.createElement("span");
    badgeEstado.className = "badge";
    badgeEstado.textContent = compra.estado;

    switch (compra.estado) {
        case "Pendiente":
            badgeEstado.classList.add("text-bg-secondary");
            break;

        case "Confirmada":
            badgeEstado.classList.add("text-bg-primary");
            break;

        case "En preparación":
            badgeEstado.classList.add("text-bg-warning");
            break;

        case "En reparto":
            badgeEstado.classList.add("text-bg-info");
            break;

        case "Entregada":
            badgeEstado.classList.add("text-bg-success");
            break;

        case "Cancelada":
            badgeEstado.classList.add("text-bg-danger");
            break;

        default:
            badgeEstado.classList.add("text-bg-secondary");
    }

    tdEstado.appendChild(badgeEstado);

    const tdAcciones = document.createElement("td");

    const btnDetalle = document.createElement("a");
    btnDetalle.className = "btn btn-outline-primary btn-sm";
    btnDetalle.href = `detalle-compra.html?id=${compra.id}`;
    btnDetalle.id = `btnDetalleCompra-${compra.id}`;
    btnDetalle.textContent = "Ver detalle";

    tdAcciones.appendChild(btnDetalle);

    tr.appendChild(tdCompra);
    tr.appendChild(tdProductos);
    tr.appendChild(tdFecha);
    tr.appendChild(tdTotal);
    tr.appendChild(tdEstado);
    tr.appendChild(tdAcciones);

    tablaComprasBody.appendChild(tr);
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarMisCompras();
});