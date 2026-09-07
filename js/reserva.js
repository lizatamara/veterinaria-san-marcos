function cargarServicios() {
    const selectServicio = document.getElementById("servicioReserva");

    // Obtenemos los servicios del localStorage
    const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];

    serviciosStorage.forEach(servicio => {
        const option = document.createElement("option");
        // Guardamos el ID como valor
        option.value = servicio.id; 
        option.textContent = `${servicio.nombre}`; 
        selectServicio.appendChild(option);
    });
}

function inicializarResumenServicio() {
    const selectServicio = document.getElementById("servicioReserva");
    const resumenServicio = document.getElementById("resumenServicio");
    const resumenPrecio = document.getElementById("resumenPrecio");


    // Escuchamos cuando el usuario cambia la selección del servicio
    selectServicio.addEventListener("change", function () {
        const idSeleccionado = this.value;
        const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];

        if (idSeleccionado === "") {
            // Si el usuario vuelve a la opción por defecto ("Selecciona un servicio")
            resumenServicio.textContent = "No seleccionado";
            resumenPrecio.textContent = "$0";
            return;
        }

        // Buscamos el servicio exacto que coincide con el ID seleccionado
        const servicioEncontrado = serviciosStorage.find(s => s.id === idSeleccionado);

        if (servicioEncontrado) {
            // Actualizamos el nombre en el resumen de la derecha
            resumenServicio.textContent = servicioEncontrado.nombre;
            
            // Actualizamos el precio formateado con puntos de miles (ej: $15.000)
            resumenPrecio.textContent = `$${servicioEncontrado.precio.toLocaleString()}`;
        }
    });
}

// Ejecutamos ambas funciones apenas carga la página
document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    inicializarResumenServicio();
});