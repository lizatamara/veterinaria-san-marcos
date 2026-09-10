console.log("¡El archivo login.js está conectado y funcionando!");

const formularioLogin = document.getElementById("formLogin");
const mensajeError = document.getElementById("mensajeErrorLogin");
const mensajeExito = document.getElementById("mensajeExitoLogin");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (mensajeError) mensajeError.classList.add("d-none");
        if (mensajeExito) mensajeExito.classList.add("d-none");

        const emailIngresado = document.getElementById("loginEmail").value.trim();
        const passwordIngresado = document.getElementById("loginPassword").value;

        if (!emailIngresado || !passwordIngresado) {
            const texto = "Por favor, completa todos los campos requeridos.";
            if (mensajeError) {
                mensajeError.textContent = texto;
                mensajeError.classList.remove("d-none");
            } else if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(texto, "warning");
            }
            return;
        }

        const usuarios = typeof obtenerUsuarios === "function" ? obtenerUsuarios() : (JSON.parse(localStorage.getItem("sanmarcos_usuarios")) || []);
        const usuarioEncontrado = usuarios.find(
            usuario => usuario.email === emailIngresado && usuario.password === passwordIngresado
        );

        if (usuarioEncontrado) {
            const textoExito = `¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`;
            if (mensajeExito) {
                mensajeExito.textContent = textoExito;
                mensajeExito.classList.remove("d-none");
            }
            if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(textoExito, "success");
            }

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1200);
        } else {
            const textoError = "Correo o contraseña incorrectos. Por favor, verifica tus datos.";
            if (mensajeError) {
                mensajeError.textContent = textoError;
                mensajeError.classList.remove("d-none");
            } else if (typeof mostrarNotificacion === "function") {
                mostrarNotificacion(textoError, "danger");
            }
        }
    });
}