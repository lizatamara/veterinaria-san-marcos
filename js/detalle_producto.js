const categoria = document.getElementById("detalleProductoCategoria")
const codigo = document.getElementById("detalleProductoCodigo")
const nombre = document.getElementById("detalleProductoNombre")
const stock = document.getElementById("detalleProductoStock")
const precio = document.getElementById("detalleProductoPrecio")
const imagen = document.getElementById("detalleProductoImagen")
const presentacion = document.getElementById("detalleProductoPresentacion")
const especie = document.getElementById("detalleProductoEspecie")
const pActivo = document.getElementById("detalleProductoPrincipioActivo")

const contenedor = document.getElementById("detalleProducto")

const mensajeError = document.getElementById("estadoProductoNoEncontrado")


const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

function mostrarDetalleProducto(){

    const productos = JSON.parse(localStorage.getItem("productos")) || []

    if(!id){
         mensajeError.classList.remove("d-none")
         contenedor.classList.add("d-none")
         return
    }
    
    const producto = productos.find(s => s.id === id);

    if(!producto){
        mensajeError.classList.remove("d-none")
        contenedor.classList.add("d-none")
        return
    }
    categoria.textContent = producto.categoria
    precio.textContent = `$${producto.precio.toLocaleString()}`
    codigo.textContent = producto.id
    nombre.textContent = producto.nombre
    presentacion.textContent = producto.presentacion
    imagen.src = `../img/productos/${producto.id.toLowerCase()}.svg`;
    stock.textContent = producto.stock
    especie.textContent = producto.especie
    pActivo.textContent = producto.principioActivo
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarDetalleProducto();
});