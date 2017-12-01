// funcion para verificar sesion en LocalStrage
var usuario =JSON.parse(localStorage.getItem("usuario"));
if (JSON.stringify(usuario).length>=1){
document.getElementById("sesion").textContent=usuario.firstname;
}