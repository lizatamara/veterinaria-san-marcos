// --- FUNCIONES DE CARGA Y RESUMEN ---

function cargarServicios() {
    const selectServicio = document.getElementById("servicioReserva");
    if (!selectServicio) return;

    selectServicio.innerHTML = '<option value="">Selecciona un servicio</option>';
    const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];

    serviciosStorage.forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio.id; 
        option.textContent = `${servicio.nombre} (${servicio.duracion} min)`; 
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
            actualizarSelectHoras();
            return;
        }

        const servicioEncontrado = serviciosStorage.find(s => s.id === idSeleccionado);

        if (servicioEncontrado) {
            if (resumenServicio) resumenServicio.textContent = servicioEncontrado.nombre;
            if (resumenPrecio) resumenPrecio.textContent = `$${servicioEncontrado.precio.toLocaleString()}`;
        }
        
        actualizarSelectHoras();
    });
}

// --- GENERACIÓN Y BLOQUEO DE BLOQUES DE TIEMPO (30 MINUTOS) ---

function generarBloquesDelDia() {
    const bloques = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
    ];
    return bloques;
}

function horaAMinutos(horaStr) {
    const [h, m] = horaStr.split(':').map(Number);
    return h * 60 + m;
}

function minutosAHora(minutosTotales) {
    const h = Math.floor(minutosTotales / 60).toString().padStart(2, '0');
    const m = (minutosTotales % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
}

function actualizarSelectHoras() {
    const selectHora = document.getElementById("horaReserva");
    const inputFecha = document.getElementById("fechaReserva");
    const selectServicio = document.getElementById("servicioReserva");

    if (!selectHora) return;

    const fechaSeleccionada = inputFecha ? inputFecha.value : "";
    const servicioId = selectServicio ? selectServicio.value : "";

    selectHora.innerHTML = '<option value="">Selecciona una hora</option>';

    if (!fechaSeleccionada || !servicioId) {
        selectHora.disabled = true;
        return;
    }

    selectHora.disabled = false;
    const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];
    const servicio = serviciosStorage.find(s => s.id === servicioId);
    if (!servicio) return;

    const duracionServicio = Number(servicio.duracion) || 30;
    const bloquesNecesarios = Math.ceil(duracionServicio / 30);

    const todosLosBloques = generarBloquesDelDia();

    console.log("--- [DEBUG] ACTUALIZANDO HORAS ---");
    console.log("Fecha seleccionada:", fechaSeleccionada);
    console.log("Servicio:", servicio.nombre, "| Duración:", duracionServicio, "min | Bloques necesarios:", bloquesNecesarios);

    const reservas = JSON.parse(localStorage.getItem(CLAVE_RESERVAS)) || [];
    const reservasFecha = reservas.filter(r => r.fecha === fechaSeleccionada);
    console.log("Reservas para esta fecha:", reservasFecha);

    const minutosOcupadosSet = new Set();
    reservasFecha.forEach(res => {
        const hInicio = res.hora;
        const servicioAsociado = serviciosStorage.find(s => s.id === res.servicioId);
        const dur = servicioAsociado ? Number(servicioAsociado.duracion) : (Number(res.duracionServicio) || 30);
        const blocksCount = Math.ceil(dur / 30);
        
        console.log(`> Ocupado a las ${hInicio} por ${dur} min (${blocksCount} bloques)`);

        let minutosActuales = horaAMinutos(hInicio);
        for (let i = 0; i < blocksCount; i++) {
            minutosOcupadosSet.add(minutosActuales);
            console.log(`  - Minuto bloqueado: ${minutosActuales} (${minutosAHora(minutosActuales)})`);
            minutosActuales += 30;
        }
    });

    todosLosBloques.forEach(bloqueInicio => {
        let esValido = true;
        let minutosInicioBloque = horaAMinutos(bloqueInicio);

        for (let i = 0; i < bloquesNecesarios; i++) {
            const minutoATestar = minutosInicioBloque + (i * 30);
            const horaStr = minutosAHora(minutoATestar);

            if (!todosLosBloques.includes(horaStr) || minutosOcupadosSet.has(minutoATestar)) {
                esValido = false;
                break;
            }
        }

        const option = document.createElement("option");
        option.value = bloqueInicio;
        
        if (esValido) {
            option.textContent = `${bloqueInicio} (Duración: ${duracionServicio} min)`;
        } else {
            option.textContent = `${bloqueInicio} - No disponible / Ocupado`;
            option.disabled = true;
            option.classList.add("text-muted");
        }
        selectHora.appendChild(option);
    });
}

function inicializarResumenFecha() {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    const fechaMinima = manana.toISOString().split("T")[0];

    const inputFecha = document.getElementById("fechaReserva");
    const inputHora = document.getElementById("horaReserva");
    const inputMascota = document.getElementById("nombreMascota");

    const resumenFecha = document.getElementById("resumenFecha");
    const resumenHora = document.getElementById("resumenHora");
    const resumenMascota = document.getElementById("resumenMascota");

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
            actualizarSelectHoras();
        });
    }

    if (inputHora && resumenHora) {
        inputHora.addEventListener("change", (e) => {
            resumenHora.textContent = e.target.value || "No seleccionada";
        });
    }

    if (inputMascota && resumenMascota) {
        inputMascota.addEventListener("input", (e) => {
            resumenMascota.textContent = e.target.value.trim() || "No ingresada";
        });
    }
}

function guardarReserva(evento) {
    evento.preventDefault();

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
    const serviciosStorage = JSON.parse(localStorage.getItem("servicios")) || [];
    const servicioEncontrado = serviciosStorage.find(s => s.id === servicioId);

    const nombreServicio = servicioEncontrado ? servicioEncontrado.nombre : document.getElementById("resumenServicio").textContent;
    const precioServicio = document.getElementById("resumenPrecio").textContent;
    const duracionServicio = servicioEncontrado ? servicioEncontrado.duracion : 30;

    const nuevaReserva = {
        id: crypto.randomUUID(),
        usuarioId: usuario.id,
        servicioId: servicioId,
        nombreServicio: nombreServicio,
        duracionServicio: duracionServicio,
        fecha: fecha,
        hora: hora,
        mascota: mascota,
        precio: precioServicio,
        fechaCreacion: new Date().toLocaleDateString()
    };

    console.log("[DEBUG] Guardando nueva reserva:", nuevaReserva);
    agregarReserva(nuevaReserva);

    alert("¡Reserva registrada con éxito!");
    window.location.href = "mis-reservas.html"; 
}

// Inicialización general limpia
document.addEventListener("DOMContentLoaded", () => {
    cargarServicios();
    inicializarResumenServicio();
    inicializarResumenFecha();

    const formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", guardarReserva);
    }
});