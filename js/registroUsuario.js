// 1. Función para rellenar el <select> con las regiones de datos.js
function cargarRegiones() {
    const selectRegion = document.getElementById("regionRegistro");

    // Recorremos el arreglo regionesChile que viene de datos.js
    regionesChile.forEach(regionTexto => {
        const option = document.createElement("option");
        option.value = regionTexto;     // El valor que se guardará en el objeto
        option.textContent = regionTexto; // El texto que ve el usuario
        selectRegion.appendChild(option);
    });
}

// 2. Ejecutamos la carga de regiones apenas se abre la página
document.addEventListener("DOMContentLoaded", () => {
    cargarRegiones();
});

const formulario = document.getElementById("formRegistro");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombreRegistro").value;
    const apellido = document.getElementById("apellidoRegistro").value;
    const fechaNacimiento = document.getElementById("fechaNacimientoRegistro").value
    const email = document.getElementById("emailRegistro").value
    const password = document.getElementById("passwordRegistro").value
    const confirmarPassword = document.getElementById("confirmPasswordRegistro").value
    const direccion = document.getElementById("direccionRegistro").value
    const region = document.getElementById("regionRegistro").value
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
    const genero = generoSeleccionado ? generoSeleccionado.value : "";

    // VALIDACIÓN NOMBRE
    if (nombre.trim() === "") {
        console.log("El nombre es obligatorio");   
        return;
    }
    if (apellido.trim() === "") {
        console.log("El apellido es obligatorio");   
        return;
    }
    // VALIDACIÓN FECHA

    const fechaIngresada = new Date(fechaNacimiento);
    const fechaActual = new Date();
    if (fechaIngresada > fechaActual) {
        console.log("La fecha de nacimiento no puede ser posterior a la fecha actual.");
        return;
    }
    
    let edad = fechaActual.getFullYear() - fechaIngresada.getFullYear();

    const mesActual = fechaActual.getMonth();
    const mesIngresado = fechaIngresada.getMonth();

    if (mesActual < mesIngresado || (mesActual === mesIngresado && fechaActual.getDate() < fechaIngresada.getDate())) {
        edad--;
    }

    if (edad < 14) {
        console.log("Debe tener 14 años o más");
        return;
    }

    if (fechaNacimiento === "") {
        console.log("Debe ingresar la fecha de nacimiento.");
        return;
    }

    // VALIIDACIÓN CORREO
    if (email.trim() === "") {
        console.log("El email es obligatorio");   
        return;
    }

    if (!email.toLowerCase().endsWith("@duoc.cl")) {
        console.log("El correo electrónico debe pertenecer al dominio @duoc.cl");
        return;
    }

    const usuariosRegistrados = obtenerUsuarios();
    const correoDuplicado = usuariosRegistrados.some(usuario => usuario.email === email);
    
    if (correoDuplicado) {
        console.log("Este correo ya se encuentra registrado. Utiliza otro o inicia sesión.");
        return;
    }
    
    
    // 5. VALIDAR QUE LAS CONTRASEÑAS SEAN IGUALES
    if (password !== confirmarPassword) {
        console.log("Las contraseñas no coinciden. Por favor, revísalas.");
        return;
    }

    // 6. VALIDAR SEGURIDAD DE LA CONTRASEÑA (Entre 8 y 20 caracteres, 1 mayúscula, 1 número y 1 especial)
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    if (!regexPassword.test(password)) {
        console.log("La contraseña no cumple con los requisitos: debe tener entre 8 y 20 caracteres, una letra mayúscula, un número y un carácter especial.");
        return;
    }
    
    // VALIDO DIRECCION

    if (direccion.trim() === "") {
        console.log("La direccion es obligatoria");   
        return;
    }

    // VALIDACIÓN REGIÓN
    if (region === "") {
        console.log("Debe seleccionar una región.");
        return;
    }

    // VALIDACIÓN GÉNERO
    if (genero === "") {
        console.log("Debe seleccionar un género.");
        return;
    }

    const nuevoUsuario = {
        id: crypto.randomUUID(),
        nombre: nombre,
        apellido : apellido,
        fechaNacimiento: fechaNacimiento,
        email : email,
        password : password,
        direccion : direccion,
        region : region,
        genero : genero
    };

agregarUsuario(nuevoUsuario);
formulario.reset();});
