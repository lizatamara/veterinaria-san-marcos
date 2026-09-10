document.addEventListener("DOMContentLoaded", function () {

    // Buscamos si hay un usuario logueado en el localStorage
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const btnLoginNav = document.getElementById("btnLoginNav");
    const btnCerrarSesion = document.getElementById("btnCerrarSesion");

    if (usuarioGuardado && btnLoginNav) {

        const usuario = JSON.parse(usuarioGuardado);
        const nombreMostrar = usuario.nombre || "Usuario";

        // Cambiamos el texto del botón cuando hay una sesión iniciada
        btnLoginNav.innerHTML = `<i class="bi bi-person-circle me-1"></i> Hola, ${nombreMostrar}`;

        // Quitamos el enlace al login porque el usuario ya está logueado
        btnLoginNav.removeAttribute("href");

        // NUEVO: permitimos que Bootstrap abra el menú desplegable
        btnLoginNav.setAttribute("data-bs-toggle", "dropdown");
        btnLoginNav.style.cursor = "pointer";
    }

    // Cerramos la sesión cuando el usuario hace clic en "Cerrar sesión"
    if (btnCerrarSesion) {

        btnCerrarSesion.addEventListener("click", function (evento) {

            evento.preventDefault();

            localStorage.removeItem("usuarioLogueado");

            // Recargamos la página para mostrar nuevamente "Iniciar sesión"
            window.location.reload();
        });
    }
});