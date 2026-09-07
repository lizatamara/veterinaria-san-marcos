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