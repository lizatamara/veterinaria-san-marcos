// Sistema global de notificaciones tipo Toast (reemplazo moderno y elegante de alert)
function mostrarNotificacion(mensaje, tipo = "warning") {
    let contenedor = document.getElementById("toastContenedorApp");
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "toastContenedorApp";
        contenedor.className = "toast-container position-fixed top-0 end-0 p-3";
        contenedor.style.zIndex = "1095";
        document.body.appendChild(contenedor);
    }

    const iconos = {
        success: "bi-check-circle-fill text-success",
        danger: "bi-x-circle-fill text-danger",
        warning: "bi-exclamation-triangle-fill text-warning",
        info: "bi-info-circle-fill text-info"
    };

    const iconoClass = iconos[tipo] || iconos.info;

    const toastDiv = document.createElement("div");
    toastDiv.className = "toast align-items-center show shadow-sm border-0 mb-2";
    toastDiv.setAttribute("role", "alert");
    toastDiv.setAttribute("aria-live", "assertive");
    toastDiv.setAttribute("aria-atomic", "true");

    // sacar innerHTML por riesgo fde XSS
    toastDiv.innerHTML = `
        <div class="d-flex align-items-center p-2 bg-white rounded border border-${tipo}">
            <i class="bi ${iconoClass} fs-5 me-2 ms-1"></i>
            <div class="toast-body p-0 flex-grow-1 text-dark fw-medium" style="font-size: 0.95rem;">
                ${mensaje}
            </div>
            <button type="button" class="btn-close ms-2 me-1" aria-label="Cerrar"></button>
        </div>
    `;

    const btnCerrar = toastDiv.querySelector(".btn-close");
    btnCerrar.addEventListener("click", () => {
        toastDiv.classList.remove("show");
        setTimeout(() => toastDiv.remove(), 250);
    });

    contenedor.appendChild(toastDiv);

    setTimeout(() => {
        if (toastDiv.parentElement) {
            toastDiv.classList.remove("show");
            setTimeout(() => toastDiv.remove(), 250);
        }
    }, 4000);
}
window.mostrarNotificacion = mostrarNotificacion;

document.addEventListener("DOMContentLoaded", function () {

    // Buscamos si hay un usuario logueado en el localStorage
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const btnLoginNav = document.getElementById("btnLoginNav");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");


    // const menuUsuario = document.querySelector(".dropdown-menu");
    const menuUsuario = btnLoginNav
    ? btnLoginNav.parentElement.querySelector(".dropdown-menu")
    : null;


    if (usuarioGuardado && btnLoginNav) {

        const usuario = JSON.parse(usuarioGuardado);
        const nombreMostrar = usuario.nombre || "Usuario";

        // Cambiamos el contenido del botón sin usar innerHTML
        btnLoginNav.replaceChildren();

        const iconoUsuario = document.createElement("i");
        iconoUsuario.className = "bi bi-person-circle me-1";

        btnLoginNav.appendChild(iconoUsuario);
        btnLoginNav.appendChild(document.createTextNode(`Hola, ${nombreMostrar}`));

        // Quitamos el enlace al login
        btnLoginNav.removeAttribute("href");

        // Permitimos que Bootstrap abra el menú desplegable
        btnLoginNav.setAttribute("data-bs-toggle", "dropdown");
        btnLoginNav.classList.add("dropdown-toggle");
        btnLoginNav.style.cursor = "pointer";

        // Mostramos el menú del usuario
        if (menuUsuario) {
            menuUsuario.classList.remove("d-none");
        } else {
            if (menuUsuario) {
                menuUsuario.classList.add("d-none");
                menuUsuario.classList.remove("show");
            }
        }

    } else if (btnLoginNav) {

        // Si NO hay usuario, mantenemos el botón como "Iniciar sesión"
        btnLoginNav.replaceChildren();

        const iconoLogin = document.createElement("i");
        iconoLogin.className = "bi bi-person-circle me-1";

        btnLoginNav.appendChild(iconoLogin);
        btnLoginNav.appendChild(document.createTextNode("Iniciar sesión"));

        // El botón vuelve a llevar al login
        btnLoginNav.setAttribute("href", "login.html");

        // NUEVO: desactivamos el dropdown
        btnLoginNav.removeAttribute("data-bs-toggle"); 
        btnLoginNav.classList.remove("dropdown-toggle");

        // Ocultamos el menú del usuario
        if (menuUsuario) {
            menuUsuario.classList.add("d-none");
        }

    }

    // Cerramos la sesión cuando el usuario hace clic en "Cerrar sesión"
    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", function (evento) {

            evento.preventDefault();

            localStorage.removeItem("usuarioLogueado");

            window.location.reload();
        });
    }
});