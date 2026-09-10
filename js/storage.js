const CLAVE_USUARIOS = "sanmarcos_usuarios"

function obtenerUsuarios(){
    const datos = localStorage.getItem(CLAVE_USUARIOS)
    if (datos === null) return []
    return JSON.parse(datos)
}
function guardarUsuarios(usuarios){
    const usauriosJSON = JSON.stringify(usuarios);
    localStorage.setItem(CLAVE_USUARIOS, usauriosJSON);
}
function agregarUsuario(usuario){
    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
}

if (!localStorage.getItem("servicios")) {
    localStorage.setItem("servicios", JSON.stringify(serviciosIniciales));
}

if (!localStorage.getItem("productos")) {
    localStorage.setItem("productos", JSON.stringify(productosIniciales));
}

const CLAVE_RESERVAS = "misReservas";

function obtenerReservas() {
    const datos = localStorage.getItem(CLAVE_RESERVAS);
    if (datos === null) return [];
    return JSON.parse(datos);
}

function guardarReservas(reservas) {
    localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas));
}

function agregarReserva(reserva) {
    const reservas = obtenerReservas();
    reservas.push(reserva);
    guardarReservas(reservas);
}

if (!localStorage.getItem("configAgenda")) {
    localStorage.setItem("configAgenda", JSON.stringify(configuracionAgenda));
}