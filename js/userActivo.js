document.addEventListener("DOMContentLoaded", function () {
    // 1. Buscamos si hay un usuario logueado en el localStorage
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");
    const btnLoginNav = document.getElementById("btnLoginNav");

    if (usuarioGuardado && btnLoginNav) {
        const usuario = JSON.parse(usuarioGuardado);

        const nombreMostrar = usuario.nombre || "Usuario";

        btnLoginNav.textContent = `Hola, ${nombreMostrar}`;

        // Como ya está logueado, le quitamos el enlace para que no redirija al login al hacerle clic
        btnLoginNav.removeAttribute("href");
    

        btnLoginNav.style.cursor = "default";
    
    }

        // 3. Opcional: Agregar funcionalidad para cerrar sesión
        /*  document.getElementById("btnCerrarSesion").addEventListener("click", function () {
            localStorage.removeItem("usuarioLogueado"); // Borramos la sesión
            window.location.reload(); // Recargamos para que vuelva a aparecer el botón de login
        }); */
    }
);