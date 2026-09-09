function cargarServicios() {
    const selectServicio = document.getElementById("servicioReserva");
    if (!selectServicio) return;

    // Obtenemos los servicios usando la función centralizada o localStorage
    const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];

    serviciosStorage.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id; 
        option.textContent = servicio.nombre; 
        selectServicio.appendChild(option);
    });
}

function inicializarResumenServicio() {
    const selectServicio = document.getElementById("servicioReserva");
    const resumenServicio = document.getElementById("resumenServicio");
    const resumenPrecio = document.getElementById("resumenPrecio");

    if (!selectServicio) return;

    selectServicio.addEventListener("change", function () {
        const idSeleccionado = this.value;
        const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];

        if (idSeleccionado === "") {
            if (resumenServicio) resumenServicio.textContent = "No seleccionado";
            if (resumenPrecio) resumenPrecio.textContent = "$0";
            return;
        }

        const servicioEncontrado = serviciosStorage.find(s => s.id === idSeleccionado);

        if (servicioEncontrado) {
            if (resumenServicio) resumenServicio.textContent = servicioEncontrado.nombre;
            if (resumenPrecio) resumenPrecio.textContent = `$${servicioEncontrado.precio.toLocaleString()}`;
        }
    });
}


function inicializarResumenFecha() {
    // 1. Calcular la fecha de mañana en formato YYYY-MM-DD
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    const fechaMinima = manana.toISOString().split("T")[0];

    // 2. Capturar elementos del formulario
    const inputFecha = document.getElementById("fechaReserva");
    const inputHora = document.getElementById("horaReserva");
    const inputMascota = document.getElementById("nombreMascota");

    // 3. Capturar elementos individuales del resumen
    const resumenFecha = document.getElementById("resumenFecha");
    const resumenHora = document.getElementById("resumenHora");
    const resumenMascota = document.getElementById("resumenMascota");

    // 4. Configurar fecha mínima y validación
    if (inputFecha) {
        inputFecha.min = fechaMinima;

        inputFecha.addEventListener("change", (e) => {
            const fechaSeleccionada = e.target.value;

            if (fechaSeleccionada < fechaMinima) {
                alert("Las reservas deben hacerse a partir del día de mañana.");
                e.target.value = "";
                if (resumenFecha) resumenFecha.textContent = "No seleccionada";
            } else {
                if (resumenFecha) resumenFecha.textContent = fechaSeleccionada;
            }
        });
    }

    // 5. Actualización en tiempo real de la hora
    if (inputHora && resumenHora) {
        inputHora.addEventListener("change", (e) => {
            resumenHora.textContent = e.target.value || "No seleccionada";
        });
    }

    // 6. Actualización en tiempo real del nombre de la mascota
    if (inputMascota && resumenMascota) {
        inputMascota.addEventListener("input", (e) => {
            resumenMascota.textContent = e.target.value.trim() || "No ingresada";
        });
    }
}

function guardarReserva(evento) {
    evento.preventDefault();

    const usuarioId = localStorage.getItem("usuarioLogueado")
    const servicioId = document.getElementById("servicioReserva").value;
    const fecha = document.getElementById("fechaReserva").value;
    const hora = document.getElementById("horaReserva").value;
    const mascota = document.getElementById("nombreMascota").value.trim();

    if (!servicioId || !fecha || !hora || !mascota) {
        alert("Por favor completa todos los campos de la reserva.");
        return;
    }

    const usuarioGuardado = localStorage.getItem("usuarioLogueado");

    if (!usuarioGuardado) {
        alert("Debes iniciar sesión para realizar una reserva.");
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    const nombreServicio = document.getElementById("resumenServicio").textContent;
    const precioServicio = document.getElementById("resumenPrecio").textContent;

    const nuevaReserva = {
        id: crypto.randomUUID(),
        usuarioId: usuario.id,
        servicioId: servicioId,
        nombreServicio: nombreServicio,
        fecha: fecha,
        hora: hora,
        mascota: mascota,
        precio: precioServicio,
        fechaCreacion: new Date().toLocaleDateString()
    };

    // Usando la función centralizada de tu archivo storage
    agregarReserva(nuevaReserva);

    alert("¡Reserva registrada con éxito!");
    window.location.href = "mis-reservas.html"; 
}

// Ejecutamos todo al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    inicializarResumenServicio();
    inicializarResumenFecha();

    const formReserva = document.getElementById("formReserva"); // Asegúrate que tu <form> tenga este ID
    if (formReserva) {
        formReserva.addEventListener("submit", guardarReserva);
    }
});