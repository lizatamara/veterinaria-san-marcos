console.log("¡El archivo login.js está conectado y funcionando!");

const usuarios = obtenerUsuarios();
console.log("Usuarios leídos del localStorage:", usuarios); // ¿Muestra la lista o sale vacío []?

const formularioLogin = document.getElementById("formLogin");

formularioLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const emailIngresado = document.getElementById("loginEmail").value.trim();
    const passwordIngresado = document.getElementById("loginPassword").value;

    if (!emailIngresado || !passwordIngresado) {
        console.log("Por favor, completa todos los campos.");
        return;
    }

    // 3. Obtener los usuarios guardados en el localStorage
    const usuarios = obtenerUsuarios();

    // 4. Buscar si existe un usuario que coincida en correo y contraseña
    const usuarioEncontrado = usuarios.find(
        usuario => usuario.email === emailIngresado && usuario.password === passwordIngresado
    );

    // 5. Validar el resultado
    if (usuarioEncontrado) {
        console.log(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre}!`);
        
        // Opcional: Guardar el usuario actual en una sesión activa si lo necesitas después
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

        // Redirigir a la página principal o de bienvenida de la veterinaria
        window.location.href = "../index.html";
    } else {
        console.log("Correo o contraseña incorrectos. Por favor, verifica tus datos.");
    }
});