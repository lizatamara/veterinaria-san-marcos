function mostrarMisReservas() {
    const divSinReservas = document.getElementById("estadoSinReservas");
    const divListaReservas = document.getElementById("listaReservas");
    const tablaReservasBody = document.getElementById("tablaReservasBody");

    if (!tablaReservasBody) return;

    // Obtenemos las reservas del localStorage
    const reservas = JSON.parse(localStorage.getItem("misReservas")) || [];

    // Validamos si hay o no reservas para mostrar el bloque correspondiente
    if (reservas.length === 0) {
        divSinReservas.classList.remove("d-none");
        divListaReservas.classList.add("d-none");
        return;
    }

    // Si hay reservas, ocultamos el estado vacío y mostramos la tabla
    divSinReservas.classList.add("d-none");
    divListaReservas.classList.remove("d-none");

    // Limpiamos la tabla de forma segura antes de renderizar
    tablaReservasBody.replaceChildren();

    // Recorremos cada reserva para crear las filas de la tabla
    reservas.forEach(reserva => {
        const tr = document.createElement("tr");

        // Columna: Servicio
        const tdServicio = document.createElement("td");
        tdServicio.textContent = reserva.nombreServicio;

        // Columna: Mascota
        const tdMascota = document.createElement("td");
        tdMascota.textContent = reserva.mascota;

        // Columna: Fecha
        const tdFecha = document.createElement("td");
        tdFecha.textContent = reserva.fecha;

        // Columna: Hora
        const tdHora = document.createElement("td");
        tdHora.textContent = reserva.hora;

        // Columna: Estado (Por defecto Pendiente o Registrada)
        const tdEstado = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "badge bg-warning text-dark";
        badge.textContent = "Pendiente";
        tdEstado.appendChild(badge);

        // Columna: Acciones (Botón eliminar/cancelar)
        const tdAcciones = document.createElement("td");
        const btnCancelar = document.createElement("button");
        btnCancelar.className = "btn btn-outline-danger btn-sm";
        btnCancelar.textContent = "Cancelar";
        
        btnCancelar.addEventListener("click", () => {
            if (confirm(`¿Estás segura de cancelar la reserva para ${reserva.mascota}?`)) {
                eliminarReserva(reserva.id);
            }
        });
        tdAcciones.appendChild(btnCancelar);

        // Agregamos todas las celdas a la fila
        tr.appendChild(tdServicio);
        tr.appendChild(tdMascota);
        tr.appendChild(tdFecha);
        tr.appendChild(tdHora);
        tr.appendChild(tdEstado);
        tr.appendChild(tdAcciones);

        // Agregamos la fila al cuerpo de la tabla
        tablaReservasBody.appendChild(tr);
    });
}

function eliminarReserva(idReserva) {
    let reservas = JSON.parse(localStorage.getItem("misReservas")) || [];
    reservas = reservas.filter(r => r.id !== idReserva);
    localStorage.setItem("misReservas", JSON.stringify(reservas));
    mostrarMisReservas(); // Refresca la tabla y el estado vacío si ya no quedan
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarMisReservas();
});