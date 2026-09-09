const detalleCompra = document.getElementById("detalleCompra");
const estadoCompraNoEncontrada = document.getElementById("estadoCompraNoEncontrada");

const detalleCompraId = document.getElementById("detalleCompraId");
const detalleCompraFecha = document.getElementById("detalleCompraFecha");
const detalleCompraEstado = document.getElementById("detalleCompraEstado");
const detalleCompraProductos = document.getElementById("detalleCompraProductos");
const detalleCompraTotal = document.getElementById("detalleCompraTotal");


const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");


function obtenerCompras() {
    return JSON.parse(localStorage.getItem("compras")) || [];
}


function mostrarError() {
    detalleCompra.classList.add("d-none");
    estadoCompraNoEncontrada.classList.remove("d-none");
}


function mostrarEstado(estado) {

    detalleCompraEstado.textContent = estado;
    detalleCompraEstado.className = "badge";

    switch (estado) {
        case "Pendiente":
            detalleCompraEstado.classList.add("text-bg-secondary");
            break;

        case "Confirmada":
            detalleCompraEstado.classList.add("text-bg-primary");
            break;

        case "En preparación":
            detalleCompraEstado.classList.add("text-bg-warning");
            break;

        case "En reparto":
            detalleCompraEstado.classList.add("text-bg-info");
            break;

        case "Entregada":
            detalleCompraEstado.classList.add("text-bg-success");
            break;

        case "Cancelada":
            detalleCompraEstado.classList.add("text-bg-danger");
            break;

        default:
            detalleCompraEstado.classList.add("text-bg-secondary");
    }
}


function mostrarProductos(productos) {

    detalleCompraProductos.replaceChildren();

    productos.forEach(producto => {

        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;

        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.cantidad;

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = `$${producto.precio.toLocaleString()}`;

        const tdSubtotal = document.createElement("td");
        const subtotal = producto.precio * producto.cantidad;
        tdSubtotal.textContent = `$${subtotal.toLocaleString()}`;

        tr.appendChild(tdNombre);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdSubtotal);

        detalleCompraProductos.appendChild(tr);
    });
}


function mostrarDetalleCompra() {

    const usuarioGuardado = localStorage.getItem("usuarioLogueado");

    if (!usuarioGuardado) {
        mostrarError();
        return;
    }

    if (!id) {
        mostrarError();
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    const compras = obtenerCompras();

    const compra = compras.find(compra =>
        compra.id === id && compra.usuarioId === usuario.id
    );

    if (!compra) {
        mostrarError();
        return;
    }

    detalleCompraId.textContent = `#${compra.id}`;
    detalleCompraFecha.textContent = `Realizada el ${compra.fecha}`;
    detalleCompraTotal.textContent = `$${compra.total.toLocaleString()}`;

    mostrarEstado(compra.estado);
    mostrarProductos(compra.productos);
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarDetalleCompra();
});