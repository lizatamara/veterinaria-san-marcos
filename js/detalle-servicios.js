const categoria = document.getElementById("detalleServicioCategoria")
const codigo = document.getElementById("detalleServicioCodigo")
const nombre = document.getElementById("detalleServicioNombre")
const descripcion = document.getElementById("detalleServicioDescripcion")
const precio = document.getElementById("detalleServicioPrecio")
const imagen = document.getElementById("detalleServicioImagen")
const duracion = document.getElementById("detalleServicioDuracion")
const especie = document.getElementById("detalleServicioEspecie")
const observaciones = document.getElementById("detalleServicioObservaciones")

const contenedor = document.getElementById("detalleServicio")

const mensajeError = document.getElementById("estadoServicioNoEncontrado")


const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

function mostrarDetalleServicio(){

    const servicios = JSON.parse(localStorage.getItem("servicios")) || []

    if(!id){
         mensajeError.classList.remove("d-none")
         contenedor.classList.add("d-none")
         return
    }
    
    const servicio = servicios.find(s => s.id === id);

    if(!servicio){
        mensajeError.classList.remove("d-none")
        contenedor.classList.add("d-none")
        return
    }
    categoria.textContent = servicio.categoria
    precio.textContent = `$${servicio.precio.toLocaleString()}`
    codigo.textContent = servicio.id
    nombre.textContent = servicio.nombre
    descripcion.textContent = servicio.descripcion
    imagen.src = `../img/servicios/${servicio.id.toLowerCase()}.svg`;
    duracion.textContent = servicio.duracion
    especie.textContent = servicio.especie
    observaciones.textContent = servicio.observaciones
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarDetalleServicio();
});